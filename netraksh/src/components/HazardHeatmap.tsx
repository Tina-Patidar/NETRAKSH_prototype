import { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { hazardZones } from '../data/facility';
import Badge, { riskTone } from './Badge';

const riskBg: Record<string, string> = {
  Low: 'bg-signal-green/20 border-signal-green/50',
  Medium: 'bg-signal-amber/20 border-signal-amber/50',
  High: 'bg-orange-500/20 border-orange-500/50',
  Critical: 'bg-signal-red/25 border-signal-red/60',
};

export default function HazardHeatmap() {
  const [selected, setSelected] = useState(hazardZones[0]);

  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-1">
        <MapPin size={16} className="text-signal-cyan" />
        <h3 className="font-display font-semibold text-ink-100">Hazard Heatmap</h3>
      </div>
      <p className="text-sm text-ink-500 mb-4">Click a zone to view hazard details and recommended action.</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {hazardZones.map((z) => (
          <button
            key={z.id}
            onClick={() => setSelected(z)}
            className={`relative rounded-xl border-2 p-4 text-left transition-all focus-ring ${riskBg[z.risk]} ${
              selected.id === z.id ? 'ring-2 ring-signal-cyan' : ''
            }`}
          >
            <div className="text-xs font-semibold text-ink-100">{z.name.split('—')[0].trim()}</div>
            <div className="text-[11px] text-ink-300 mt-0.5">{z.name.split('—')[1]?.trim()}</div>
            <div className="mt-2">
              <Badge tone={riskTone(z.risk)}>{z.risk}</Badge>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-base-800 border border-base-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-ink-100">{selected.name}</span>
          <button onClick={() => setSelected(hazardZones[0])} className="text-ink-500 hover:text-ink-100 lg:hidden">
            <X size={14} />
          </button>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div>
            <div className="text-xs text-ink-500 mb-0.5">Hazard Type</div>
            <div className="text-ink-300">{selected.hazardType}</div>
          </div>
          <div>
            <div className="text-xs text-ink-500 mb-0.5">Last Incident</div>
            <div className="text-ink-300">{selected.lastIncident}</div>
          </div>
          <div>
            <div className="text-xs text-ink-500 mb-0.5">Recommended Action</div>
            <div className="text-ink-300">{selected.recommendedAction}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
