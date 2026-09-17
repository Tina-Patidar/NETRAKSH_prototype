import { useState, useRef, useEffect } from 'react';
import { Menu, Search, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import NotificationsBell from '../components/NotificationsBell';
import OfflineIndicator from '../components/OfflineIndicator';

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className="h-16 shrink-0 border-b border-base-700 bg-base-900/80 backdrop-blur-sm flex items-center gap-3 px-4 lg:px-6 sticky top-0 z-30">
      <button onClick={onMenuClick} className="lg:hidden text-ink-300 hover:text-ink-100 focus-ring rounded-lg p-1">
        <Menu size={22} />
      </button>

      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md bg-base-800 border border-base-700 rounded-xl px-3 py-2">
        <Search size={16} className="text-ink-500 shrink-0" />
        <input
          type="text"
          placeholder="Search modules, workers, certificates…"
          className="bg-transparent outline-none text-sm text-ink-100 placeholder:text-ink-500 w-full"
        />
      </div>

      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden md:block">
          <OfflineIndicator />
        </div>
        <LanguageSelector />
        <NotificationsBell />

        <div className="relative" ref={ref}>
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-full bg-base-800 border border-base-700 hover:border-base-600 transition-colors focus-ring"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-signal-cyan to-signal-blue flex items-center justify-center text-[10px] font-bold text-base-950">
              {user?.name?.charAt(0) ?? 'U'}
            </div>
            <span className="hidden md:inline text-xs font-medium text-ink-100">{user?.name}</span>
            <ChevronDown size={14} className="text-ink-500" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 card p-1.5 shadow-xl z-50">
              <div className="px-3 py-2 border-b border-base-700 mb-1">
                <div className="text-sm font-medium text-ink-100">{user?.name}</div>
                <div className="text-xs text-ink-500 capitalize">{user?.role} · {user?.department}</div>
              </div>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/settings');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-300 hover:bg-base-800 hover:text-ink-100 transition-colors"
              >
                <UserIcon size={14} /> Profile Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-signal-red hover:bg-signal-red/10 transition-colors"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
