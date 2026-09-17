import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'cyan' | 'amber' | 'green' | 'red' | 'neutral';
}

const toneMap: Record<string, string> = {
  cyan: 'bg-signal-cyan/10 text-signal-cyan border border-signal-cyan/30',
  amber: 'bg-signal-amber/10 text-signal-amber border border-signal-amber/30',
  green: 'bg-signal-green/10 text-signal-green border border-signal-green/30',
  red: 'bg-signal-red/10 text-signal-red border border-signal-red/30',
  neutral: 'bg-base-700 text-ink-300 border border-base-600',
};

export default function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return <span className={`badge ${toneMap[tone]}`}>{children}</span>;
}

export function riskTone(risk: string): 'green' | 'amber' | 'red' | 'neutral' {
  switch (risk) {
    case 'Low':
      return 'green';
    case 'Medium':
      return 'amber';
    case 'High':
      return 'red';
    case 'Critical':
      return 'red';
    default:
      return 'neutral';
  }
}
