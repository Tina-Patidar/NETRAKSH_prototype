import { useState } from 'react';
import { User, Languages, Trash2, Check, Building2, IdCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { languageLabels } from '../translations';
import { Language } from '../types';

export default function Settings() {
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [cleared, setCleared] = useState(false);

  function handleReset() {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith('netraksh:') && k !== 'netraksh:user');
    keys.forEach((k) => localStorage.removeItem(k));
    setCleared(true);
    setTimeout(() => window.location.reload(), 900);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-100">Settings</h1>
        <p className="text-ink-500 text-sm mt-1">Manage your profile, language, and local demo data.</p>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <User size={16} className="text-signal-cyan" />
          <h3 className="font-display font-semibold text-ink-100 text-sm">Profile</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <IdCard size={16} className="text-ink-500" />
            <div>
              <div className="text-xs text-ink-500">Employee ID</div>
              <div className="text-sm text-ink-100 font-medium">{user?.employeeId}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building2 size={16} className="text-ink-500" />
            <div>
              <div className="text-xs text-ink-500">Department</div>
              <div className="text-sm text-ink-100 font-medium">{user?.department}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User size={16} className="text-ink-500" />
            <div>
              <div className="text-xs text-ink-500">Name</div>
              <div className="text-sm text-ink-100 font-medium">{user?.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User size={16} className="text-ink-500" />
            <div>
              <div className="text-xs text-ink-500">Role</div>
              <div className="text-sm text-ink-100 font-medium capitalize">{user?.role}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Languages size={16} className="text-signal-cyan" />
          <h3 className="font-display font-semibold text-ink-100 text-sm">Language</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(languageLabels) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-colors focus-ring ${
                language === lang
                  ? 'border-signal-cyan bg-signal-cyan/10 text-signal-cyan'
                  : 'border-base-700 text-ink-300 hover:border-base-600'
              }`}
            >
              {language === lang && <Check size={14} />}
              {languageLabels[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="card p-5 border-signal-red/30">
        <div className="flex items-center gap-2 mb-2">
          <Trash2 size={16} className="text-signal-red" />
          <h3 className="font-display font-semibold text-ink-100 text-sm">Reset Demo Data</h3>
        </div>
        <p className="text-xs text-ink-500 mb-4">
          Clears locally stored training progress, assessment history, certificates, and sync state. Your login
          session is preserved.
        </p>
        <button onClick={handleReset} className="btn-secondary border-signal-red/40 text-signal-red hover:bg-signal-red/10">
          {cleared ? 'Reloading…' : 'Reset Local Demo Data'}
        </button>
      </div>
    </div>
  );
}
