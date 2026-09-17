import { useState } from 'react';
import { Flame, Wind, Cog, HardHat, X, ShieldAlert } from 'lucide-react';

interface Hotspot {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: typeof Flame;
  severity: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  actions: string[];
  isHazard: boolean;
}

const hotspots: Hotspot[] = [
  { id: 'worker', label: 'Worker Position', x: 16, y: 62, icon: HardHat, severity: 'MEDIUM', isHazard: false, actions: ['Maintain awareness of surrounding hazard markers', 'Keep PPE fastened at all times'] },
  { id: 'machine', label: 'Active Machine', x: 40, y: 45, icon: Cog, severity: 'MEDIUM', isHazard: true, actions: ['Maintain safe exclusion distance', 'Do not bypass machine guards', 'Report unusual vibration or noise'] },
  { id: 'fire', label: 'Fire Hazard', x: 68, y: 30, icon: Flame, severity: 'CRITICAL', isHazard: true, actions: ['Evacuate the immediate area', 'Use CO₂ extinguisher if trained and safe', 'Alert supervisor immediately'] },
  { id: 'gas', label: 'Gas Leak Marker', x: 82, y: 65, icon: Wind, severity: 'HIGH', isHazard: true, actions: ['Wear respiratory protection', 'Isolate source', 'Alert supervisor', 'Evacuate affected area'] },
];

const severityTone: Record<string, string> = {
  CRITICAL: 'text-signal-red border-signal-red/40 bg-signal-red/10',
  HIGH: 'text-signal-amber border-signal-amber/40 bg-signal-amber/10',
  MEDIUM: 'text-signal-cyan border-signal-cyan/40 bg-signal-cyan/10',
};

export default function HazardHotspotScene() {
  const [active, setActive] = useState<Hotspot | null>(null);

  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-1">
        <ShieldAlert size={16} className="text-signal-cyan" />
        <h3 className="font-display font-semibold text-ink-100">Hazard Detection Demo</h3>
      </div>
      <p className="text-sm text-ink-500 mb-4">Tap any marker on the simulated site scene to view hazard details.</p>

      <div className="relative w-full aspect-[16/8] rounded-xl overflow-hidden border border-base-700 bg-gradient-to-br from-base-900 to-base-850">
        <div className="absolute inset-0 bg-grid bg-[size:28px_28px] opacity-30" />
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-base-950/60 to-transparent" />

        {hotspots.map((h) => {
          const Icon = h.icon;
          return (
            <button
              key={h.id}
              onClick={() => setActive(h)}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus-ring rounded-full"
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 backdrop-blur-sm transition-transform group-hover:scale-110 ${
                  h.isHazard ? 'border-signal-red bg-signal-red/20 animate-pulse' : 'border-signal-cyan bg-signal-cyan/20'
                }`}
              >
                <Icon size={18} className={h.isHazard ? 'text-signal-red' : 'text-signal-cyan'} />
              </span>
              <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap text-ink-300 bg-base-950/80 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {h.label}
              </span>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setActive(null)}>
          <div className="card-glow max-w-sm w-full p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <active.icon size={18} className={active.isHazard ? 'text-signal-red' : 'text-signal-cyan'} />
                <span className="font-display font-semibold text-ink-100">
                  {active.isHazard ? 'Hazard Detected' : active.label}
                </span>
              </div>
              <button onClick={() => setActive(null)} className="text-ink-500 hover:text-ink-100">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="text-xs text-ink-500 mb-0.5">Hazard</div>
                <div className="text-sm font-medium text-ink-100">{active.label}</div>
              </div>
              <div>
                <div className="text-xs text-ink-500 mb-0.5">Severity</div>
                <span className={`badge border ${severityTone[active.severity]}`}>{active.severity}</span>
              </div>
              <div>
                <div className="text-xs text-ink-500 mb-1.5">Recommended Action</div>
                <ul className="space-y-1.5">
                  {active.actions.map((a) => (
                    <li key={a} className="text-sm text-ink-300 flex gap-2">
                      <span className="text-signal-cyan">•</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button onClick={() => setActive(null)} className="btn-secondary w-full">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
