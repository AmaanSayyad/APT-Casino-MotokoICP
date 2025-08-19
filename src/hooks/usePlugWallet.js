'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  isPlugAvailable,
  requestConnect,
  isConnected as plugIsConnected,
  disconnect as plugDisconnect,
  getSessionData,
  onExternalDisconnect,
  onLockStateChange,
  ensurePersistentConnection,
} from '@/lib/ic/plug';

export default function usePlugWallet({ whitelist = [], host = 'https://icp0.io' } = {}) {
  const [connected, setConnected] = useState(false);
  const [principalId, setPrincipalId] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [isLocked, setIsLocked] = useState(null);
  const [error, setError] = useState(null);

  const available = isPlugAvailable();

  const refreshSession = useCallback(() => {
    const data = getSessionData();
    setPrincipalId(data.principalId || null);
    setAccountId(data.accountId || null);
    setIsLocked(Boolean(data.isWalletLocked));
  }, []);

  const connect = useCallback(async () => {
    try {
      await requestConnect({ whitelist, host });
      const ok = await plugIsConnected();
      setConnected(ok);
      refreshSession();
      setError(null);
    } catch (e) {
      setError(e?.message || 'Failed to connect to Plug');
      setConnected(false);
    }
  }, [host, refreshSession, whitelist]);

  const disconnect = useCallback(async () => {
    try {
      await plugDisconnect();
    } catch {}
    setConnected(false);
    setPrincipalId(null);
    setAccountId(null);
  }, []);

  useEffect(() => {
    let off1 = () => {};
    let off2 = () => {};
    if (available) {
      off1 = onExternalDisconnect(() => {
        setConnected(false);
        setPrincipalId(null);
        setAccountId(null);
      });
      off2 = onLockStateChange((locked) => setIsLocked(Boolean(locked)));
      (async () => {
        const ok = await ensurePersistentConnection({ whitelist, host });
        setConnected(ok);
        refreshSession();
      })();
    }
    return () => {
      try { off1 && off1(); } catch {}
      try { off2 && off2(); } catch {}
    };
  }, [available, host, refreshSession, whitelist]);

  const data = useMemo(() => ({
    connected,
    principalId,
    accountId,
    isLocked,
    available,
    error,
  }), [accountId, available, connected, error, isLocked, principalId]);

  return {
    ...data,
    connect,
    disconnect,
  };
}


