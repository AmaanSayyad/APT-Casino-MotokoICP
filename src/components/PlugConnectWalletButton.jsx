"use client";
import React from 'react';
import usePlugWallet from '@/hooks/usePlugWallet';

export default function PlugConnectWalletButton({ whitelist = [], host = 'https://icp0.io' }) {
  const { connected, principalId, isLocked, connect, disconnect, available } = usePlugWallet({ whitelist, host });

  const handleClick = async () => {
    if (connected) {
      await disconnect();
      return;
    }
    try {
      await connect();
      try {
        window.dispatchEvent(new Event('plug-connected'));
      } catch {}
    } catch {}
  };

  if (!available) {
    return (
      <a
        href="https://plugwallet.ooo/"
        target="_blank"
        rel="noreferrer"
        className="px-3 py-2 text-sm rounded bg-yellow-600/30 text-yellow-200 hover:bg-yellow-600/40"
      >
        Install Plug
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-2 rounded font-medium transition-colors ${connected ? 'bg-green-700/40 text-green-200 hover:bg-green-700/60' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
    >
      {connected ? (isLocked ? 'Plug Locked' : `${principalId?.slice(0, 8)}...`) : 'Connect Plug'}
    </button>
  );
}


