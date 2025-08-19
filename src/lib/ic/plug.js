export const isPlugAvailable = () => typeof window !== 'undefined' && !!window.ic?.plug;

export const requestConnect = async ({ whitelist = [], host = 'https://icp0.io', timeout = 60000 } = {}) => {
  if (!isPlugAvailable()) throw new Error('Plug is not available');
  return window.ic.plug.requestConnect({ whitelist, host, timeout });
};

export const isConnected = async () => {
  if (!isPlugAvailable()) return false;
  try {
    return await window.ic.plug.isConnected();
  } catch {
    return false;
  }
};

export const disconnect = async () => {
  if (!isPlugAvailable()) return;
  try {
    await window.ic.plug.disconnect();
  } catch {}
};

export const getSessionData = () => {
  if (!isPlugAvailable()) return { principalId: null, accountId: null, isWalletLocked: null, agent: null };
  return {
    agent: window.ic.plug.agent,
    isWalletLocked: window.ic.plug.isWalletLocked,
    principalId: window.ic.plug.principalId,
    accountId: window.ic.plug.accountId,
  };
};

export const onExternalDisconnect = (cb) => {
  if (!isPlugAvailable() || typeof cb !== 'function') return () => {};
  try {
    return window.ic.plug.onExternalDisconnect(cb);
  } catch {
    return () => {};
  }
};

export const onLockStateChange = (cb) => {
  if (!isPlugAvailable() || typeof cb !== 'function') return () => {};
  try {
    return window.ic.plug.onLockStateChange(cb);
  } catch {
    return () => {};
  }
};

// Helper to persist connection across navigations
export const ensurePersistentConnection = async ({ whitelist = [], host = 'https://icp0.io' } = {}) => {
  if (!isPlugAvailable()) return false;
  const normalizedHost = host.replace('localhost', '127.0.0.1');
  const connected = await isConnected();
  if (!connected) {
    try {
      await requestConnect({ whitelist, host: normalizedHost });
      return true;
    } catch {
      return false;
    }
  }
  return true;
};

export const createActor = async ({ canisterId, idlFactory, host }) => {
  if (!isPlugAvailable()) throw new Error('Plug is not available');
  if (!canisterId) throw new Error('Missing canisterId');
  if (!idlFactory) throw new Error('Missing idlFactory');
  try {
    return await window.ic.plug.createActor({ canisterId, interfaceFactory: idlFactory, host: host ? host.replace('localhost', '127.0.0.1') : undefined });
  } catch (e) {
    return await window.ic.plug.createActor({ canisterId, interfaceFactory: idlFactory });
  }
};


