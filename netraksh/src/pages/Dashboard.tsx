import { GraduationCap, ShieldCheck, CheckCircle2, BadgeCheck, ArrowRight, Flame, Wind, Cog, CheckCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import { useLanguage } from '../context/LanguageContext';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import { trainingModules } from '../data/modules';
import { recentActivity } from '../data/facility';
import CircularProgress from '../components/CircularProgress';

const activityIcon = { success: CheckCircle, info: Info, warning: Info };

export default function Dashboard() {
  const { user } = useAuth();
  const { moduleProgress, latestResult } = useAppData();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const overallCompletion = Math.round(
    Object.values(moduleProgress).reduce((a, b) => a + b, 0) / Object.values(moduleProgress).length
  );
  const modulesCompleted = Object.values(moduleProgress).filter((v) => v >= 100).length;
  const safetyScore = latestResult ? latestResult.score : 91;

  const currentModule = trainingModules
    .filter((m) => (moduleProgress[m.id] ?? 0) < 100)
    .sort((a, b) => (moduleProgress[b.id] ?? 0) - (moduleProgress[a.id] ?? 0))[0];

  const recommended = trainingModules
    .filter((m) => m.id !== currentModule?.id)
    .slice(0, 3);

  const readinessBreakdown = [
    { label: 'Fire Safety', value: moduleProgress['fire'] ?? 0, icon: Flame, color: '#E5484D' },
    { label: 'Gas Safety', value: moduleProgress['gas'] ?? 0, icon: Wind, color: '#F5A623' },
    { label: 'Machinery Safety', value: moduleProgress['machinery'] ?? 0, icon: Cog, color: '#3B82F6' },
    { label: 'PPE Compliance', value: moduleProgress['ppe'] ?? 0, icon: ShieldCheck, color: '#2FBF71' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-100">
          {t('goodMorning')}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-ink-500 text-sm mt-1">{t('safetyReadiness')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Training Completion" value={`${overallCompletion}%`} icon={GraduationCap} accent="cyan" />
        <StatCard label={t('safetyScore')} value={`${safetyScore}/100`} icon={ShieldCheck} accent="green" />
        <StatCard label="Modules Completed" value={`${modulesCompleted}/${trainingModules.length}`} icon={CheckCircle2} accent="amber" />
        <StatCard label="Certification Status" value="ACTIVE" icon={BadgeCheck} accent="cyan" sublabel="Renews annually" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {currentModule && (
            <div className="card p-5">
              <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-3">Current Training</div>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-100">{currentModule.title}</h3>
                  <p className="text-sm text-ink-500 mt-1 max-w-md">{currentModule.description}</p>
                </div>
                <button onClick={() => navigate('/training')} className="btn-primary shrink-0">
                  {t('continue')} <ArrowRight size={15} />
                </button>
              </div>
              <div className="mt-4">
                <ProgressBar value={moduleProgress[currentModule.id] ?? 0} label="Progress" />
              </div>
            </div>
          )}

          <div className="card p-5">
            <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-3">Recommended Training</div>
            <div className="space-y-2">
              {recommended.map((m) => (
                <button
                  key={m.id}
                  onClick={() => navigate('/training')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-base-800 transition-colors text-left"
                >
                  <div>
                    <div className="text-sm font-medium text-ink-100">{m.title}</div>
                    <div className="text-xs text-ink-500">{m.difficulty} · {m.estimatedMinutes} min</div>
                  </div>
                  <ArrowRight size={15} className="text-ink-500" />
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-3">Recent Activity</div>
            <div className="space-y-3">
              {recentActivity.map((item) => {
                const Icon = activityIcon[item.type];
                return (
                  <div key={item.id} className="flex items-start gap-3">
                    <Icon size={15} className={item.type === 'success' ? 'text-signal-green mt-0.5' : 'text-signal-cyan mt-0.5'} />
                    <div>
                      <div className="text-sm text-ink-100">{item.text}</div>
                      <div className="text-xs text-ink-500">{item.timestamp}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5 flex flex-col items-center text-center">
            <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-4 self-start">
              Safety Readiness
            </div>
            <CircularProgress value={overallCompletion} color="#22D3EE" label="Overall" />
            <div className="mt-3 badge bg-signal-green/10 text-signal-green border border-signal-green/30">
              READY
            </div>

            <div className="w-full mt-6 space-y-4">
              {readinessBreakdown.map((r) => (
                <ProgressBar key={r.label} value={r.value} color={r.color} label={r.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
