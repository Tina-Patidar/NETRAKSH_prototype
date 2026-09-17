import { useMemo, useState } from 'react';
import { Search, Flame, HardHat, Wind, Cog, Siren, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';
import { knowledgeBase } from '../data/facility';
import { KnowledgeEntry } from '../types';

const categoryIcon: Record<KnowledgeEntry['category'], typeof Flame> = {
  'Fire Safety': Flame,
  PPE: HardHat,
  'Gas Safety': Wind,
  Machinery: Cog,
  'Emergency Response': Siren,
  'Electrical Safety': Zap,
};

const categories: (KnowledgeEntry['category'] | 'All')[] = [
  'All',
  'Fire Safety',
  'PPE',
  'Gas Safety',
  'Machinery',
  'Emergency Response',
  'Electrical Safety',
];

export default function SafetyKnowledge() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>('All');

  const filtered = useMemo(() => {
    return knowledgeBase.filter((k) => {
      const matchesCategory = category === 'All' || k.category === category;
      const q = query.toLowerCase();
      const matchesQuery =
        q === '' ||
        k.hazard.toLowerCase().includes(q) ||
        k.risk.toLowerCase().includes(q) ||
        k.preventiveAction.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-100">Safety Knowledge</h1>
        <p className="text-ink-500 text-sm mt-1">Searchable reference library of hazards, risks, and response actions.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-base-800 border border-base-700 rounded-xl px-3.5 py-2.5 flex-1">
          <Search size={16} className="text-ink-500 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hazards, risks, actions…"
            className="bg-transparent outline-none text-sm text-ink-100 placeholder:text-ink-500 w-full"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as typeof category)}
          className="bg-base-800 border border-base-700 rounded-xl px-3.5 py-2.5 text-sm text-ink-100 outline-none focus:border-signal-cyan"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-ink-500 text-sm">No entries match your search.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((k) => {
            const Icon = categoryIcon[k.category];
            return (
              <div key={k.id} className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-signal-cyan/10 flex items-center justify-center text-signal-cyan shrink-0">
                    <Icon size={17} />
                  </div>
                  <span className="text-xs font-semibold text-ink-500 uppercase tracking-wide">{k.category}</span>
                </div>
                <h3 className="font-display font-semibold text-ink-100 mb-3">{k.hazard}</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex gap-2">
                    <AlertTriangle size={14} className="text-signal-amber shrink-0 mt-0.5" />
                    <div>
                      <span className="text-ink-500">Risk: </span>
                      <span className="text-ink-300">{k.risk}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <ShieldCheck size={14} className="text-signal-green shrink-0 mt-0.5" />
                    <div>
                      <span className="text-ink-500">Preventive Action: </span>
                      <span className="text-ink-300">{k.preventiveAction}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Siren size={14} className="text-signal-red shrink-0 mt-0.5" />
                    <div>
                      <span className="text-ink-500">Emergency Action: </span>
                      <span className="text-ink-300">{k.emergencyAction}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
