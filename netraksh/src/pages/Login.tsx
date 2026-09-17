import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, WifiOff, Scan, BadgeCheck, HardHat, Users, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

const roles: { id: Role; label: string; icon: typeof HardHat }[] = [
  { id: 'worker', label: 'Worker', icon: HardHat },
  { id: 'supervisor', label: 'Supervisor', icon: Users },
  { id: 'admin', label: 'Administrator', icon: ShieldAlert },
];

export default function Login() {
  const [role, setRole] = useState<Role>('worker');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, loginDemo } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = login(employeeId, password, role);
    if (result.ok) {
      navigate('/dashboard');
    } else {
      setError(result.message ?? 'Invalid credentials');
    }
  }

  function handleDemo() {
    loginDemo(role);
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-base-950 bg-grid bg-[size:40px_40px] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-signal-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:flex flex-col gap-8 px-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-signal-cyan to-signal-blue flex items-center justify-center">
              <Eye size={26} className="text-base-950" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-ink-100 tracking-wide">NETRAKSH</div>
              <div className="text-sm text-ink-500">Industrial Safety Training Platform</div>
            </div>
          </div>

          <h1 className="font-display text-4xl font-semibold text-ink-100 leading-tight">
            Vision-driven safety training for Jharkhand's mining &amp; manufacturing workforce.
          </h1>
          <p className="text-ink-300 leading-relaxed max-w-md">
            Netraksh pairs AR-based hazard simulation with structured competency tracking — built for
            offline-first deployment across industrial sites.
          </p>

          <div className="space-y-3">
            {[
              { icon: WifiOff, text: 'Offline-ready training' },
              { icon: Scan, text: 'AR-powered safety simulation' },
              { icon: BadgeCheck, text: 'Digital competency certification' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-ink-300">
                <div className="w-9 h-9 rounded-lg bg-base-800 border border-base-700 flex items-center justify-center text-signal-cyan">
                  <Icon size={16} />
                </div>
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>

          <div className="text-xs text-ink-500 pt-4 border-t border-base-700">
            SIH 2026 · Problem Statement SIH26041 · Government of Jharkhand · Team Pioneers
          </div>
        </div>

        <div className="card-glow p-8">
          <div className="lg:hidden flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-signal-cyan to-signal-blue flex items-center justify-center">
              <Eye size={18} className="text-base-950" strokeWidth={2.5} />
            </div>
            <div className="font-display font-bold text-lg text-ink-100">NETRAKSH</div>
          </div>

          <h2 className="font-display text-xl font-semibold text-ink-100 mb-1">Sign in to your account</h2>
          <p className="text-sm text-ink-500 mb-6">Select your role and enter your credentials.</p>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-medium transition-all focus-ring ${
                  role === id
                    ? 'border-signal-cyan bg-signal-cyan/10 text-signal-cyan'
                    : 'border-base-700 text-ink-500 hover:border-base-600 hover:text-ink-300'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-ink-500 mb-1.5 block">Employee ID</label>
              <input
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder={`e.g. ${role}`}
                className="w-full bg-base-800 border border-base-700 rounded-xl px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-500 outline-none focus:border-signal-cyan transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-500 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-base-800 border border-base-700 rounded-xl px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-500 outline-none focus:border-signal-cyan transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs text-signal-amber bg-signal-amber/10 border border-signal-amber/30 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full py-3">
              <ShieldCheck size={16} />
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-base-700 flex-1" />
            <span className="text-xs text-ink-500">or</span>
            <div className="h-px bg-base-700 flex-1" />
          </div>

          <button onClick={handleDemo} className="btn-secondary w-full py-3">
            Enter Demo Mode ({roles.find((r) => r.id === role)?.label})
          </button>
          <p className="text-[11px] text-ink-500 text-center mt-3">
            Demo mode skips authentication and loads sample data for evaluation purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
