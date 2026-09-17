import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: 'cyan' | 'amber' | 'green' | 'red';
  sublabel?: string;
}

const accentMap = {
  cyan: 'text-signal-cyan bg-signal-cyan/10',
  amber: 'text-signal-amber bg-signal-amber/10',
  green: 'text-signal-green bg-signal-green/10',
  red: 'text-signal-red bg-signal-red/10',
};

export default function StatCard({ label, value, icon: Icon, accent = 'cyan', sublabel }: StatCardProps) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-ink-500 text-sm font-medium">{label}</span>
        <div className={`p-2 rounded-lg ${accentMap[accent]}`}>
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>
      <div>
        <div className="text-3xl font-display font-semibold text-ink-100">{value}</div>
        {sublabel && <div className="text-xs text-ink-500 mt-1">{sublabel}</div>}
      </div>
    </div>
  );
}
