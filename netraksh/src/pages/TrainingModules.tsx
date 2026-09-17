import { Flame, Wind, Cog, HardHat, DoorOpen, Zap, Clock, PlayCircle, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trainingModules } from '../data/modules';
import { useAppData } from '../context/AppDataContext';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';

const iconMap: Record<string, LucideIcon> = { Flame, Wind, Cog, HardHat, DoorOpen, Zap };
const difficultyTone: Record<string, 'green' | 'amber' | 'red'> = {
  Beginner: 'green',
  Intermediate: 'amber',
  Advanced: 'red',
};

export default function TrainingModules() {
  const { moduleProgress, updateModuleProgress } = useAppData();
  const navigate = useNavigate();

  function handleStart(moduleId: string) {
    const current = moduleProgress[moduleId] ?? 0;
    const bumped = Math.min(100, current + 15);
    updateModuleProgress(moduleId, bumped === current ? current : bumped);
    navigate('/ar-simulation');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-100">Training Modules</h1>
        <p className="text-ink-500 text-sm mt-1">Structured vocational safety training for mining &amp; manufacturing roles.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {trainingModules.map((m) => {
          const Icon = iconMap[m.icon];
          const progress = moduleProgress[m.id] ?? m.completion;
          return (
            <div key={m.id} className="card p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-signal-cyan/10 flex items-center justify-center text-signal-cyan">
                  <Icon size={22} />
                </div>
                <Badge tone={difficultyTone[m.difficulty]}>{m.difficulty}</Badge>
              </div>
              <div>
                <h3 className="font-display font-semibold text-ink-100 text-base">{m.title}</h3>
                <p className="text-sm text-ink-500 mt-1.5 leading-relaxed">{m.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-ink-500">
                <Clock size={13} /> {m.estimatedMinutes} min estimated
              </div>
              <ProgressBar value={progress} label="Completion" />
              <button onClick={() => handleStart(m.id)} className="btn-primary mt-1">
                <PlayCircle size={16} />
                {progress > 0 && progress < 100 ? 'Continue Training' : progress >= 100 ? 'Review Training' : 'Start Training'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
