import { CASINO_CANISTER_ID, IC_HOST } from '@/config/ic';
import { ensurePersistentConnection, createActor } from '@/lib/ic/plug';
import { idlFactory as casinoIdl } from '@/ic/casino_backend/casino_backend.idl';

export const getCasinoActor = async () => {
  if (!CASINO_CANISTER_ID) throw new Error('CASINO_CANISTER_ID is not set');
  await ensurePersistentConnection({ whitelist: [CASINO_CANISTER_ID], host: IC_HOST });
  return createActor({ canisterId: CASINO_CANISTER_ID, idlFactory: casinoIdl });
};


