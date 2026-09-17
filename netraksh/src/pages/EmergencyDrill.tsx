import { useEffect, useState } from 'react';
import { Flame, Wind, Cog, FlaskConical, CheckCircle2, XCircle, RotateCcw, Timer, LucideIcon } from 'lucide-react';
import { emergencyScenarios } from '../data/facility';
import { EmergencyScenarioType } from '../types';

const iconMap: Record<string, LucideIcon> = { Flame, Wind, Cog, FlaskConical };

export default function EmergencyDrill() {
  const [scenario, setScenario] = useState<EmergencyScenarioType | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!scenario || finished) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [scenario, finished]);

  function startScenario(s: EmergencyScenarioType) {
    setScenario(s);
    setStepIdx(0);
    setMistakes(0);
    setSeconds(0);
    setSelected(null);
    setFinished(false);
  }

  function handleAnswer(idx: number) {
    if (selected !== null || !scenario) return;
    setSelected(idx);
    const step = scenario.steps[stepIdx];
    if (idx !== step.correctIndex) setMistakes((m) => m + 1);

    setTimeout(() => {
      if (stepIdx + 1 >= scenario.steps.length) {
        setFinished(true);
      } else {
        setStepIdx((i) => i + 1);
        setSelected(null);
      }
    }, 700);
  }

  function reset() {
    setScenario(null);
    setFinished(false);
  }

  if (!scenario) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-100">Emergency Drill</h1>
          <p className="text-ink-500 text-sm mt-1">
            Select an emergency type to run a timed decision-making simulation.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyScenarios.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <button
                key={s.id}
                onClick={() => startScenario(s)}
                className="card p-6 flex flex-col items-center gap-3 hover:border-signal-cyan/40 transition-colors focus-ring"
              >
                <div className="w-12 h-12 rounded-xl bg-signal-red/10 flex items-center justify-center text-signal-red">
                  <Icon size={24} />
                </div>
                <span className="font-display font-semibold text-ink-100">{s.name}</span>
                <span className="text-xs text-ink-500">{s.steps.length}-step response drill</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (finished) {
    const total = scenario.steps.length;
    const scorePct = Math.round(((total - mistakes) / total) * 100);
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    const recommendation =
      mistakes === 0
        ? 'Excellent response. Maintain readiness with periodic refresher drills.'
        : `Practice ${scenario.name.toLowerCase()} response again to reduce decision errors.`;

    return (
      <div className="max-w-lg mx-auto py-10 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-signal-cyan/10 border border-signal-cyan/30 flex items-center justify-center mx-auto">
          <CheckCircle2 size={26} className="text-signal-cyan" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink-100">Drill Complete — {scenario.name}</h1>

        <div className="grid grid-cols-3 gap-3">
          <div className="card p-4">
            <div className="text-xs text-ink-500">Response Score</div>
            <div className="font-display text-2xl font-bold text-ink-100">{scorePct}%</div>
          </div>
          <div className="card p-4">
            <div className="text-xs text-ink-500">Mistakes</div>
            <div className="font-display text-2xl font-bold text-ink-100">{mistakes}</div>
          </div>
          <div className="card p-4">
            <div className="text-xs text-ink-500">Response Time</div>
            <div className="font-display text-2xl font-bold text-ink-100">{mm}:{ss}</div>
          </div>
        </div>

        <div className="card-glow p-5 text-left">
          <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Recommendation</div>
          <p className="text-sm text-ink-300">{recommendation}</p>
        </div>

        <div className="flex justify-center gap-3">
          <button onClick={() => startScenario(scenario)} className="btn-secondary">
            <RotateCcw size={15} /> Retry Drill
          </button>
          <button onClick={reset} className="btn-primary">
            Choose Another Scenario
          </button>
        </div>
      </div>
    );
  }

  const step = scenario.steps[stepIdx];
  const Icon = iconMap[scenario.icon];
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={20} className="text-signal-red" />
          <h1 className="font-display text-xl font-semibold text-ink-100">{scenario.name} — Step {stepIdx + 1}/{scenario.steps.length}</h1>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-ink-300 bg-base-800 border border-base-700 rounded-full px-3 py-1.5">
          <Timer size={14} /> {mm}:{ss}
        </div>
      </div>

      <div className="progress-track">
        <div className="progress-fill bg-signal-red" style={{ width: `${((stepIdx + 1) / scenario.steps.length) * 100}%` }} />
      </div>

      <div className="card p-6">
        <p className="text-ink-100 font-medium mb-5">{step.prompt}</p>
        <div className="grid gap-2.5">
          {step.options.map((opt, idx) => {
            let cls = 'border-base-700 hover:border-signal-cyan/50 hover:bg-base-800';
            if (selected !== null) {
              if (idx === step.correctIndex) cls = 'border-signal-green bg-signal-green/10';
              else if (idx === selected) cls = 'border-signal-red bg-signal-red/10';
              else cls = 'border-base-700 opacity-50';
            }
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium text-ink-100 transition-all focus-ring ${cls}`}
              >
                {opt}
                {selected !== null && idx === step.correctIndex && <CheckCircle2 size={16} className="text-signal-green" />}
                {selected === idx && idx !== step.correctIndex && <XCircle size={16} className="text-signal-red" />}
              </button>
            );
          })}
        </div>
      </div>

      <button onClick={reset} className="btn-ghost text-sm">
        Exit Drill
      </button>
    </div>
  );
}
