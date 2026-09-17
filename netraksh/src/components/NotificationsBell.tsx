import { useState, useRef, useEffect } from 'react';
import { Bell, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { supervisorAlerts } from '../data/facility';

const severityIcon = { Critical: AlertCircle, Warning: AlertTriangle, Info: Info };
const severityColor = { Critical: 'text-signal-red', Warning: 'text-signal-amber', Info: 'text-signal-cyan' };

export default function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-9 h-9 flex items-center justify-center rounded-full bg-base-800 border border-base-700 text-ink-300 hover:text-ink-100 transition-colors focus-ring"
      >
        <Bell size={16} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-signal-red" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 card p-2 shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="px-3 py-2 text-xs font-semibold text-ink-500 uppercase tracking-wide">Supervisor Alerts</div>
          {supervisorAlerts.map((a) => {
            const Icon = severityIcon[a.severity];
            return (
              <div key={a.id} className="flex gap-3 px-3 py-2.5 rounded-xl hover:bg-base-800 transition-colors">
                <Icon size={16} className={`shrink-0 mt-0.5 ${severityColor[a.severity]}`} />
                <div className="min-w-0">
                  <div className="text-sm text-ink-100 leading-snug">{a.message}</div>
                  <div className="text-xs text-ink-500 mt-0.5">
                    {a.worker ? `${a.worker} · ` : ''}
                    {a.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
