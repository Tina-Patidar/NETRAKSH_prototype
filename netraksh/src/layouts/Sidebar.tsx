import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Glasses, ClipboardCheck, Award, LineChart,
  Library, ShieldAlert, Settings as SettingsIcon, Eye, Siren,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', key: 'dashboard', icon: LayoutDashboard },
  { to: '/training', key: 'training', icon: BookOpen },
  { to: '/ar-simulation', key: 'arSimulation', icon: Glasses },
  { to: '/assessment', key: 'assessment', icon: ClipboardCheck },
  { to: '/certificates', key: 'certificate', icon: Award },
  { to: '/progress', key: 'progress', icon: LineChart },
  { to: '/safety-knowledge', key: 'safetyKnowledge', icon: Library },
  { to: '/emergency-drill', key: 'emergencyDrill', icon: Siren },
];

const adminItem = { to: '/admin', key: 'admin', icon: ShieldAlert };
const settingsItem = { to: '/settings', key: 'settings', icon: SettingsIcon };

export default function Sidebar({ open, onNavigate }: { open: boolean; onNavigate?: () => void }) {
  const { t } = useLanguage();
  const { user } = useAuth();

  const items = user?.role === 'admin' || user?.role === 'supervisor' ? [...navItems, adminItem] : navItems;

  return (
    <aside
      className={`fixed lg:static z-40 inset-y-0 left-0 w-64 bg-base-900 border-r border-base-700 flex flex-col transition-transform duration-200 ${
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-base-700 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-signal-cyan to-signal-blue flex items-center justify-center">
          <Eye size={17} className="text-base-950" strokeWidth={2.5} />
        </div>
        <div>
          <div className="font-display font-bold text-ink-100 tracking-wide text-sm leading-none">NETRAKSH</div>
          <div className="text-[10px] text-ink-500 mt-0.5">Industrial Safety Platform</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {items.map(({ to, key, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors focus-ring ${
                isActive
                  ? 'bg-signal-cyan/10 text-signal-cyan border border-signal-cyan/20'
                  : 'text-ink-300 hover:bg-base-800 hover:text-ink-100 border border-transparent'
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {t(key)}
          </NavLink>
        ))}
        <NavLink
          to={settingsItem.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors focus-ring mt-4 pt-4 border-t border-base-700 ${
              isActive ? 'text-signal-cyan' : 'text-ink-300 hover:bg-base-800 hover:text-ink-100'
            }`
          }
        >
          <SettingsIcon size={18} strokeWidth={2} />
          {t('settings')}
        </NavLink>
      </nav>

      <div className="p-4 border-t border-base-700 shrink-0">
        <div className="text-[11px] text-ink-500 leading-relaxed">
          SIH 2026 · SIH26041
          <br />
          Team Pioneers · Govt. of Jharkhand
        </div>
      </div>
    </aside>
  );
}
