import { useState } from 'react';
import { Award, Download, ShieldCheck, Search, CheckCircle2, XCircle, Eye, BadgeCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import { Certificate } from '../types';
import QRStyleCode from '../components/QRStyleCode';

function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function CertificatePage() {
  const { user } = useAuth();
  const { certificates, issueCertificate, latestResult } = useAppData();
  const [verifyId, setVerifyId] = useState('');
  const [verifyResult, setVerifyResult] = useState<'idle' | 'found' | 'notfound'>('idle');
  const [foundCert, setFoundCert] = useState<Certificate | null>(null);

  const displayCert: Certificate = certificates[0] ?? {
    id: 'NTR-FIRE-2026-00124',
    workerName: user?.name ?? 'Rahul Kumar',
    training: 'Fire & Explosion Safety',
    score: 92,
    competency: 'PASSED',
    completedDate: formatDate(new Date()),
  };

  function handleGenerate() {
    if (!latestResult) return;
    const id = `NTR-${latestResult.competencyLevel.slice(0, 3).toUpperCase()}-2026-${String(
      Math.floor(1000 + Math.random() * 9000)
    )}`;
    issueCertificate({
      id,
      workerName: user?.name ?? 'Worker',
      training: 'Fire & Explosion Safety',
      score: latestResult.score,
      competency: latestResult.score >= 60 ? 'PASSED' : 'FAILED',
      completedDate: formatDate(new Date()),
    });
  }

  function handleDownload() {
    const content = `NETRAKSH DIGITAL SAFETY COMPETENCY RECORD
------------------------------------------
Worker: ${displayCert.workerName}
Training: ${displayCert.training}
Score: ${displayCert.score}%
Competency: ${displayCert.competency}
Completed: ${displayCert.completedDate}
Certificate ID: ${displayCert.id}

This is a prototype digital competency record generated for
demonstration purposes (SIH 2026, Team Pioneers). It is not an
official government-issued certificate.
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${displayCert.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleVerify() {
    const match = [...certificates, displayCert].find((c) => c.id.toLowerCase() === verifyId.trim().toLowerCase());
    if (match) {
      setFoundCert(match);
      setVerifyResult('found');
    } else {
      setFoundCert(null);
      setVerifyResult('notfound');
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-100">Certificates</h1>
        <p className="text-ink-500 text-sm mt-1">Digital safety competency records for completed training.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          {/* Certificate visual */}
          <div className="relative rounded-2xl border border-signal-cyan/30 bg-gradient-to-br from-base-900 via-base-850 to-base-900 p-8 overflow-hidden">
            <div className="absolute inset-0 bg-grid bg-[size:36px_36px] opacity-20" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-signal-cyan/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-signal-cyan to-signal-blue flex items-center justify-center">
                    <ShieldCheck size={18} className="text-base-950" />
                  </div>
                  <span className="font-display font-bold text-lg text-ink-100 tracking-wide">NETRAKSH</span>
                </div>
                <span className="badge bg-signal-green/10 text-signal-green border border-signal-green/30">
                  {displayCert.competency}
                </span>
              </div>

              <div className="text-center mb-8">
                <div className="text-xs uppercase tracking-[0.2em] text-ink-500 mb-2">Digital Safety Competency Record</div>
                <div className="font-display text-2xl font-semibold text-ink-100">{displayCert.workerName}</div>
                <div className="text-sm text-ink-500 mt-1">has demonstrated competency in</div>
                <div className="font-display text-xl font-semibold text-signal-cyan mt-1">{displayCert.training}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center mb-8">
                <div>
                  <div className="text-xs text-ink-500 mb-1">Score</div>
                  <div className="font-display font-semibold text-ink-100">{displayCert.score}%</div>
                </div>
                <div>
                  <div className="text-xs text-ink-500 mb-1">Completed</div>
                  <div className="font-display font-semibold text-ink-100 text-sm">{displayCert.completedDate}</div>
                </div>
                <div>
                  <div className="text-xs text-ink-500 mb-1">Certificate ID</div>
                  <div className="font-mono font-medium text-ink-100 text-xs">{displayCert.id}</div>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-ink-500 max-w-[220px] leading-relaxed">
                  <BadgeCheck size={22} className="text-signal-cyan shrink-0" />
                  This is a prototype digital competency record for SIH 2026 evaluation, not an official government
                  certificate.
                </div>
                <QRStyleCode value={displayCert.id} size={92} />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button onClick={handleDownload} className="btn-primary">
              <Download size={15} /> Download Certificate
            </button>
            {latestResult && (
              <button onClick={handleGenerate} className="btn-secondary">
                <Award size={15} /> Generate From Latest Assessment
              </button>
            )}
          </div>

          {certificates.length > 1 && (
            <div className="card p-4 mt-4">
              <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-3">Certificate History</div>
              <div className="space-y-2">
                {certificates.map((c) => (
                  <div key={c.id} className="flex items-center justify-between text-sm py-1.5">
                    <span className="text-ink-100">{c.training}</span>
                    <span className="font-mono text-xs text-ink-500">{c.id}</span>
                    <span className={c.competency === 'PASSED' ? 'text-signal-green text-xs' : 'text-signal-red text-xs'}>
                      {c.competency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Search size={16} className="text-signal-cyan" />
              <h3 className="font-display font-semibold text-ink-100">Verify Certificate</h3>
            </div>
            <p className="text-xs text-ink-500 mb-4">Enter a certificate ID to check its prototype validity record.</p>

            <div className="flex gap-2 mb-4">
              <input
                value={verifyId}
                onChange={(e) => setVerifyId(e.target.value)}
                placeholder={`e.g. ${displayCert.id}`}
                className="flex-1 bg-base-800 border border-base-700 rounded-xl px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-500 outline-none focus:border-signal-cyan transition-colors"
              />
              <button onClick={handleVerify} className="btn-primary shrink-0">
                Verify
              </button>
            </div>

            {verifyResult === 'found' && foundCert && (
              <div className="rounded-xl border border-signal-green/30 bg-signal-green/5 p-4 space-y-2">
                <div className="flex items-center gap-2 text-signal-green font-semibold text-sm">
                  <CheckCircle2 size={16} /> Certificate Found
                </div>
                <div className="text-xs text-ink-300 flex items-center gap-1.5">
                  <Eye size={12} /> Status: Valid in Prototype
                </div>
                <div className="text-sm text-ink-100 pt-2 space-y-1">
                  <div><span className="text-ink-500">Worker: </span>{foundCert.workerName}</div>
                  <div><span className="text-ink-500">Module: </span>{foundCert.training}</div>
                  <div><span className="text-ink-500">Score: </span>{foundCert.score}%</div>
                  <div><span className="text-ink-500">Completion Date: </span>{foundCert.completedDate}</div>
                  <div><span className="text-ink-500">Certificate ID: </span><span className="font-mono">{foundCert.id}</span></div>
                </div>
              </div>
            )}

            {verifyResult === 'notfound' && (
              <div className="rounded-xl border border-signal-red/30 bg-signal-red/5 p-4 flex items-center gap-2 text-signal-red text-sm font-medium">
                <XCircle size={16} /> No certificate found for that ID.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
