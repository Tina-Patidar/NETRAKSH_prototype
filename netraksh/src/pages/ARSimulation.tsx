import { useEffect, useState } from 'react';
import {
  Flame, ScanEye, AlertTriangle, Timer, Target, Award, RotateCcw, LogOut, Lightbulb,
  CheckCircle2, XCircle, HardHat, Wind, ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import HazardHotspotScene from '../components/HazardHotspotScene';

type StepId = 'detect' | 'identify' | 'ppe' | 'extinguisher' | 'evacuate' | 'report';

interface StepDef {
  id: StepId;
  title: string;
  instruction: string;
  options: string[];
  correctIndex: number;
  hint: string;
}

const steps: StepDef[] = [
  {
    id: 'detect',
    title: 'Detect Hazard',
    instruction: 'Your AR headset flags an anomaly near Panel B7. What should you do first?',
    options: ['Ignore and continue task', 'Scan the flagged zone', 'Remove your headset'],
    correctIndex: 1,
    hint: 'Always scan a flagged zone before proceeding — this confirms the hazard type.',
  },
  {
    id: 'identify',
    title: 'Identify Hazard',
    instruction: 'Scan complete. Smoke and heat signature detected near energized wiring. What is this hazard?',
    options: ['Gas leak', 'Electrical fire', 'Structural collapse'],
    correctIndex: 1,
    hint: 'Heat signature plus smoke near energized wiring indicates an electrical fire.',
  },
  {
    id: 'ppe',
    title: 'Select PPE',
    instruction: 'Before responding, which PPE combination is required for an electrical fire response?',
    options: ['Sunglasses and sandals', 'Insulated gloves, face shield, fire-resistant suit', 'No PPE — respond immediately'],
    correctIndex: 1,
    hint: 'Electrical fires require insulated, non-conductive PPE and eye/face protection.',
  },
  {
    id: 'extinguisher',
    title: 'Select Extinguisher',
    instruction: 'Hazard Detected: FIRE · Distance: 3.2m · Risk Level: CRITICAL. Select the correct extinguisher.',
    options: ['WATER', 'FOAM', 'CO₂'],
    correctIndex: 2,
    hint: 'CO₂ is non-conductive and safe on energized electrical fires. Water and foam conduct electricity.',
  },
  {
    id: 'evacuate',
    title: 'Evacuate',
    instruction: 'The fire is not fully contained. What is the correct evacuation action?',
    options: ['Use the nearest elevator', 'Use marked stairwell to muster point', 'Wait near the fire for instructions'],
    correctIndex: 1,
    hint: 'Always use marked stairwells and proceed to the designated muster point.',
  },
  {
    id: 'report',
    title: 'Report Incident',
    instruction: 'You are at the muster point. What is the final required action?',
    options: ['Say nothing and return to work', 'Report incident details to supervisor', 'Post about it on social media'],
    correctIndex: 1,
    hint: 'A full incident report to your supervisor ensures the hazard is logged and addressed.',
  },
];

export default function ARSimulation() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [safetyPoints, setSafetyPoints] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const { updateModuleProgress } = useAppData();
  const navigate = useNavigate();

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [finished]);

  const step = steps[stepIndex];
  const progressPct = Math.round((stepIndex / steps.length) * 100);

  function handleSelect(idx: number) {
    if (feedback) return;
    setSelected(idx);
    const isCorrect = idx === step.correctIndex;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setScore((s) => s + 15);
      setSafetyPoints((p) => p + 10);
    }
  }

  function handleNext() {
    setShowHint(false);
    if (stepIndex + 1 >= steps.length) {
      setFinished(true);
      updateModuleProgress('fire', 100);
      return;
    }
    setStepIndex((i) => i + 1);
    setSelected(null);
    setFeedback(null);
  }

  function handleRestart() {
    setStepIndex(0);
    setSelected(null);
    setFeedback(null);
    setScore(0);
    setSafetyPoints(0);
    setSeconds(0);
    setShowHint(false);
    setFinished(false);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-100">AR Safety Simulation</h1>
          <p className="text-ink-500 text-sm mt-1">
            Simulated preview of the Netraksh Unity + ARCore mobile experience. The production app runs native AR on Android.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm text-ink-300 bg-base-800 border border-base-700 rounded-full px-3 py-1.5">
            <Timer size={14} /> {mm}:{ss}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-ink-300 bg-base-800 border border-base-700 rounded-full px-3 py-1.5">
            <Target size={14} /> {score} pts
          </div>
          <div className="flex items-center gap-1.5 text-sm text-ink-300 bg-base-800 border border-base-700 rounded-full px-3 py-1.5">
            <Award size={14} /> {safetyPoints} safety pts
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-1.5">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < stepIndex || finished ? 'bg-signal-cyan' : i === stepIndex ? 'bg-signal-amber' : 'bg-base-700'
            }`}
          />
        ))}
      </div>

      {/* AR Viewport */}
      <div className="relative rounded-2xl overflow-hidden border border-base-700 bg-gradient-to-br from-base-900 via-base-850 to-base-900 min-h-[420px]">
        {/* simulated camera environment */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.08),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(229,72,77,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-grid bg-[size:32px_32px] opacity-40" />

        <div className="absolute top-4 left-4 flex items-center gap-2 bg-base-950/70 border border-base-700 rounded-full px-3 py-1.5 text-xs font-mono text-signal-cyan backdrop-blur-sm">
          <ScanEye size={13} /> AR SAFETY SIMULATION
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-base-950/70 border border-signal-red/40 rounded-full px-3 py-1.5 text-xs font-mono text-signal-red backdrop-blur-sm animate-pulse">
          ● REC
        </div>

        {!finished ? (
          <div className="relative flex flex-col items-center justify-center min-h-[420px] px-6 py-10">
            {/* Hazard overlay card, shown for detect/identify/extinguisher framing */}
            <div className="w-full max-w-md bg-base-950/85 border border-signal-red/30 rounded-2xl p-5 backdrop-blur-md shadow-glow mb-6">
              <div className="flex items-center gap-2 text-signal-red font-display font-semibold text-sm mb-2">
                <AlertTriangle size={16} />
                Hazard Detected · FIRE
              </div>
              <div className="flex items-center gap-4 text-xs text-ink-300 font-mono mb-3">
                <span>Distance: 3.2m</span>
                <span className="text-signal-red font-semibold">Risk Level: CRITICAL</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-500 uppercase tracking-wide mb-1">
                <Flame size={12} className="text-signal-amber" /> Step {stepIndex + 1} of {steps.length} · {step.title}
              </div>
            </div>

            <div className="w-full max-w-md">
              <p className="text-ink-100 text-center font-medium mb-5 leading-relaxed">{step.instruction}</p>

              <div className="grid gap-2.5">
                {step.options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  const isCorrectOpt = idx === step.correctIndex;
                  let stateClasses = 'border-base-700 hover:border-signal-cyan/50 hover:bg-base-800';
                  if (feedback && isSelected && feedback === 'correct') {
                    stateClasses = 'border-signal-green bg-signal-green/10';
                  } else if (feedback && isSelected && feedback === 'incorrect') {
                    stateClasses = 'border-signal-red bg-signal-red/10';
                  } else if (feedback && isCorrectOpt) {
                    stateClasses = 'border-signal-green bg-signal-green/10';
                  } else if (feedback) {
                    stateClasses = 'border-base-700 opacity-50';
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(idx)}
                      disabled={!!feedback}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border bg-base-900/60 text-sm font-medium text-ink-100 transition-all focus-ring ${stateClasses}`}
                    >
                      {opt}
                      {feedback && isCorrectOpt && <CheckCircle2 size={16} className="text-signal-green" />}
                      {feedback && isSelected && !isCorrectOpt && <XCircle size={16} className="text-signal-red" />}
                    </button>
                  );
                })}
              </div>

              {showHint && !feedback && (
                <div className="mt-4 text-xs text-signal-amber bg-signal-amber/10 border border-signal-amber/30 rounded-xl px-3.5 py-2.5 flex items-start gap-2">
                  <Lightbulb size={14} className="shrink-0 mt-0.5" /> {step.hint}
                </div>
              )}

              {feedback && (
                <div
                  className={`mt-4 rounded-xl px-3.5 py-3 text-sm font-medium flex items-center gap-2 ${
                    feedback === 'correct'
                      ? 'bg-signal-green/10 border border-signal-green/30 text-signal-green'
                      : 'bg-signal-red/10 border border-signal-red/30 text-signal-red'
                  }`}
                >
                  {feedback === 'correct' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  {feedback === 'correct' ? 'Correct — +15 points, +10 safety points' : `Incorrect. Correct action: ${step.options[step.correctIndex]}`}
                </div>
              )}

              <div className="flex items-center justify-between mt-5">
                <button onClick={() => setShowHint((h) => !h)} className="btn-ghost text-xs" disabled={!!feedback}>
                  <Lightbulb size={14} /> Hint
                </button>
                {feedback && (
                  <button onClick={handleNext} className="btn-primary">
                    {stepIndex + 1 >= steps.length ? 'Finish Simulation' : 'Next Scenario'} <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col items-center justify-center min-h-[420px] px-6 py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-signal-green/10 border border-signal-green/30 flex items-center justify-center mb-4">
              <CheckCircle2 size={30} className="text-signal-green" />
            </div>
            <h2 className="font-display text-xl font-semibold text-ink-100 mb-1">Simulation Complete</h2>
            <p className="text-ink-500 text-sm mb-6 max-w-sm">
              Fire &amp; Explosion Safety scenario finished. Progress has been recorded to your training module.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6 w-full max-w-sm">
              <div className="card p-3">
                <div className="text-xs text-ink-500">Score</div>
                <div className="font-display text-lg font-semibold text-ink-100">{score}</div>
              </div>
              <div className="card p-3">
                <div className="text-xs text-ink-500">Time</div>
                <div className="font-display text-lg font-semibold text-ink-100">{mm}:{ss}</div>
              </div>
              <div className="card p-3">
                <div className="text-xs text-ink-500">Safety Pts</div>
                <div className="font-display text-lg font-semibold text-ink-100">{safetyPoints}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleRestart} className="btn-secondary">
                <RotateCcw size={15} /> Restart
              </button>
              <button onClick={() => navigate('/assessment')} className="btn-primary">
                Take Assessment <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2">
          <button onClick={handleRestart} className="btn-secondary text-sm">
            <RotateCcw size={14} /> Restart
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn-ghost text-sm">
            <LogOut size={14} /> Exit Simulation
          </button>
        </div>
        <div className="flex items-center gap-4 text-xs text-ink-500">
          <span className="flex items-center gap-1"><HardHat size={12} /> PPE-aware scenario</span>
          <span className="flex items-center gap-1"><Wind size={12} /> Hazard-reactive engine</span>
        </div>
      </div>

      <HazardHotspotScene />
    </div>
  );
}
