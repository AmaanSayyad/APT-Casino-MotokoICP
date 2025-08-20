import { HttpAgent } from '@dfinity/agent';
import { Actor, ActorSubclass } from '@dfinity/agent';
import { CASINO_CANISTER_ID, IC_HOST } from '@/config/ic';

// Cache for actors to avoid repeated creation
const actorCache = new Map(); // key: `${canisterId}@${host||''}` -> actor

/**
 * Create an ICP actor using Internet Identity
 * @param {Object} params - Parameters for actor creation
 * @param {string} params.canisterId - The canister ID
 * @param {Object} params.idlFactory - The IDL factory
 * @param {string} params.host - The IC host URL
 * @param {Object} params.identity - The user identity
 * @returns {Promise<ActorSubclass>} The created actor
 */
export const createICPActor = async ({ 
  canisterId, 
  idlFactory, 
  host = IC_HOST, 
  identity 
}) => {
  if (!canisterId) throw new Error('Missing canisterId');
  if (!idlFactory) throw new Error('Missing idlFactory');
  if (!identity) throw new Error('Missing identity - user must be connected');

  const normalizedHost = host ? host.replace('localhost', '127.0.0.1') : undefined;
  const key = `${canisterId}@${normalizedHost || ''}`;
  
  // Check cache first
  if (actorCache.has(key)) {
    return actorCache.get(key);
  }

  try {
    // Create HTTP agent with the user's identity
    const agent = new HttpAgent({ identity, host: normalizedHost });
    // Fetch root key only when using local replica
    if (normalizedHost && (normalizedHost.includes('127.0.0.1') || normalizedHost.includes('localhost'))) {
      await agent.fetchRootKey();
    }

    // Create the actor
    const actor = Actor.createActor(idlFactory, {
      agent,
      canisterId,
    });

    // Cache the actor
    actorCache.set(key, actor);
    
    return actor;
  } catch (error) {
    console.error('Failed to create ICP actor:', error);
    throw new Error(`Failed to create actor: ${error.message}`);
  }
};

/**
 * Get the casino actor using the current user's identity
 * @param {Object} identity - The user's identity from ICP wallet
 * @returns {Promise<ActorSubclass>} The casino actor
 */
export const getCasinoActor = async (identity) => {
  if (!CASINO_CANISTER_ID) throw new Error('CASINO_CANISTER_ID is not set');
  if (!identity) throw new Error('User must be connected to access casino');
  
  const { idlFactory } = await import('@/ic/casino_backend/casino_backend.idl');
  
  return createICPActor({ 
    canisterId: CASINO_CANISTER_ID, 
    idlFactory, 
    host: IC_HOST,
    identity 
  });
};

/**
 * Clear the actor cache (useful for logout/disconnect)
 */
export const clearActorCache = () => {
  actorCache.clear();
};

/**
 * Get cached actor if available
 * @param {string} canisterId - The canister ID
 * @param {string} host - The IC host URL
 * @returns {ActorSubclass|null} The cached actor or null
 */
export const getCachedActor = (canisterId, host = IC_HOST) => {
  const normalizedHost = host ? host.replace('localhost', '127.0.0.1') : undefined;
  const key = `${canisterId}@${normalizedHost || ''}`;
  return actorCache.get(key) || null;
};
