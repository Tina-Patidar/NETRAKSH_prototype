import { useEffect, useState } from 'react';
import { ClipboardCheck, Timer, CheckCircle2, XCircle, ArrowLeft, ArrowRight, Sparkles, RotateCcw } from 'lucide-react';
import { assessmentQuestions } from '../data/questions';
import { useAppData } from '../context/AppDataContext';
import { AssessmentResult } from '../types';

function getRecommendation(score: number): { title: string; detail: string } {
  if (score < 60) {
    return {
      title: 'Repeat Fundamentals',
      detail: 'Your recent assessment shows difficulty with core hazard identification. Revisit foundational modules before re-attempting.',
    };
  }
  if (score < 80) {
    return {
      title: 'Targeted Practice',
      detail: 'Your recent assessment shows difficulty with specific hazard scenarios. Focus practice on the categories you missed.',
    };
  }
  if (score < 90) {
    return {
      title: 'Advanced Scenario',
      detail: 'Solid competency shown. You are ready for advanced, multi-hazard AR scenarios to sharpen response speed.',
    };
  }
  return {
    title: 'Expert Challenge',
    detail: 'Excellent competency across scenarios. Attempt Expert Challenge simulations to maintain peak readiness.',
  };
}

export default function Assessment() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(assessmentQuestions.length).fill(null));
  const [seconds, setSeconds] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const { addAssessmentResult } = useAppData();

  useEffect(() => {
    if (!started || submitted) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [started, submitted]);

  const question = assessmentQuestions[index];
  const answeredCount = answers.filter((a) => a !== null).length;

  function selectAnswer(optionIdx: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIdx;
      return next;
    });
  }

  function handleSubmit() {
    const correct = answers.filter((a, i) => a === assessmentQuestions[i].correctIndex).length;
    const total = assessmentQuestions.length;
    const score = Math.round((correct / total) * 100);
    const accuracy = score;
    const competencyLevel =
      score >= 90 ? 'Expert' : score >= 80 ? 'Advanced' : score >= 60 ? 'Competent' : 'Needs Improvement';

    const finalResult: AssessmentResult = {
      score,
      accuracy,
      totalQuestions: total,
      correct,
      responseTimeSeconds: seconds,
      competencyLevel,
      timestamp: new Date().toISOString(),
    };
    setResult(finalResult);
    addAssessmentResult(finalResult);
    setSubmitted(true);
  }

  function handleRestart() {
    setStarted(false);
    setIndex(0);
    setAnswers(Array(assessmentQuestions.length).fill(null));
    setSeconds(0);
    setSubmitted(false);
    setResult(null);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  if (!started) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="w-14 h-14 rounded-2xl bg-signal-cyan/10 border border-signal-cyan/30 flex items-center justify-center mx-auto mb-5">
          <ClipboardCheck size={26} className="text-signal-cyan" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink-100 mb-2">Safety Competency Assessment</h1>
        <p className="text-ink-500 text-sm mb-6 leading-relaxed">
          {assessmentQuestions.length} scenario-based questions covering fire, gas, machinery, PPE, evacuation and electrical
          safety. This is a prototype competency assessment and does not constitute a legally valid government
          certification.
        </p>
        <button onClick={() => setStarted(true)} className="btn-primary px-8 py-3">
          Start Assessment
        </button>
      </div>
    );
  }

  if (submitted && result) {
    const rec = getRecommendation(result.score);
    return (
      <div className="max-w-xl mx-auto py-10 space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-signal-green/10 border border-signal-green/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={26} className="text-signal-green" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink-100">Assessment Complete</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="card p-5 text-center">
            <div className="text-xs text-ink-500 mb-1">Score</div>
            <div className="font-display text-3xl font-bold text-ink-100">{result.score}%</div>
          </div>
          <div className="card p-5 text-center">
            <div className="text-xs text-ink-500 mb-1">Accuracy</div>
            <div className="font-display text-3xl font-bold text-ink-100">{result.accuracy}%</div>
          </div>
          <div className="card p-5 text-center">
            <div className="text-xs text-ink-500 mb-1">Response Time</div>
            <div className="font-display text-3xl font-bold text-ink-100">{mm}:{ss}</div>
          </div>
          <div className="card p-5 text-center">
            <div className="text-xs text-ink-500 mb-1">Competency Level</div>
            <div className="font-display text-xl font-bold text-signal-cyan">{result.competencyLevel}</div>
          </div>
        </div>

        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-signal-amber" />
            <span className="text-xs font-semibold text-ink-500 uppercase tracking-wide">Personalized Training Recommendation</span>
          </div>
          <h3 className="font-display font-semibold text-lg text-ink-100 mb-1.5">{rec.title}</h3>
          <p className="text-sm text-ink-300 leading-relaxed">{rec.detail}</p>
        </div>

        <div className="text-xs text-ink-500 bg-base-800 border border-base-700 rounded-xl px-4 py-3 leading-relaxed">
          This is a prototype competency assessment for demonstration purposes and does not automatically issue a
          legally valid government safety certification.
        </div>

        <button onClick={handleRestart} className="btn-secondary w-full">
          <RotateCcw size={15} /> Retake Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink-100">
            Question {index + 1}/{assessmentQuestions.length}
          </h1>
          <p className="text-xs text-ink-500 mt-0.5">{answeredCount} answered</p>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-ink-300 bg-base-800 border border-base-700 rounded-full px-3 py-1.5">
          <Timer size={14} /> {mm}:{ss}
        </div>
      </div>

      <div className="progress-track">
        <div className="progress-fill bg-signal-cyan" style={{ width: `${((index + 1) / assessmentQuestions.length) * 100}%` }} />
      </div>

      <div className="card p-6">
        <p className="text-ink-100 font-medium leading-relaxed mb-5">{question.question}</p>
        <div className="grid gap-2.5">
          {question.options.map((opt, idx) => (
            <button
              key={opt}
              onClick={() => selectAnswer(idx)}
              className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all focus-ring ${
                answers[index] === idx
                  ? 'border-signal-cyan bg-signal-cyan/10 text-ink-100'
                  : 'border-base-700 text-ink-300 hover:border-base-600 hover:bg-base-800'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="btn-secondary disabled:opacity-40"
        >
          <ArrowLeft size={15} /> Previous
        </button>

        <div className="flex gap-1.5">
          {assessmentQuestions.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? 'bg-signal-cyan' : answers[i] !== null ? 'bg-signal-green' : 'bg-base-700'
              }`}
            />
          ))}
        </div>

        {index === assessmentQuestions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < assessmentQuestions.length}
            className="btn-primary disabled:opacity-40"
          >
            Submit Assessment
          </button>
        ) : (
          <button onClick={() => setIndex((i) => Math.min(assessmentQuestions.length - 1, i + 1))} className="btn-secondary">
            Next <ArrowRight size={15} />
          </button>
        )}
      </div>
      {answeredCount < assessmentQuestions.length && index === assessmentQuestions.length - 1 && (
        <p className="text-xs text-signal-amber text-center flex items-center justify-center gap-1.5">
          <XCircle size={13} /> Answer all questions before submitting.
        </p>
      )}
    </div>
  );
}
