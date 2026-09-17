import { useState, useRef, useEffect } from 'react';
import { CloudOff, RefreshCw } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

export default function OfflineIndicator() {
  const { syncState, syncNow, isOffline } = useAppData();
  const [open, setOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function handleSync() {
    setSyncing(true);
    setTimeout(() => {
      syncNow();
      setSyncing(false);
    }, 900);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-base-800 border border-base-700 text-xs font-medium text-ink-300 hover:text-ink-100 transition-colors focus-ring"
      >
        <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-signal-amber animate-pulse' : 'bg-signal-green'}`} />
        {isOffline ? 'Offline Mode Active' : 'Online'}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 card p-4 shadow-xl z-50">
          <div className="flex items-center gap-2 text-ink-100 font-semibold text-sm mb-3">
            <CloudOff size={16} className="text-signal-amber" />
            Training data stored locally
          </div>
          <p className="text-xs text-ink-500 mb-1">
            {syncState.pendingRecords} record{syncState.pendingRecords === 1 ? '' : 's'} waiting for synchronization
          </p>
          <p className="text-xs text-ink-500 mb-4">Last sync: {syncState.lastSync}</p>
          <button onClick={handleSync} disabled={syncing} className="btn-primary w-full text-sm py-2">
            <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Syncing…' : 'Sync Now'}
          </button>
        </div>
      )}
    </div>
  );
}
