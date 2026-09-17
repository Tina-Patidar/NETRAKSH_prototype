interface ProgressBarProps {
  value: number;
  color?: string;
  label?: string;
  showValue?: boolean;
}

export default function ProgressBar({ value, color = '#22D3EE', label, showValue = true }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1.5 text-sm">
          <span className="text-ink-300">{label}</span>
          {showValue && <span className="text-ink-100 font-medium">{clamped}%</span>}
        </div>
      )}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${clamped}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
