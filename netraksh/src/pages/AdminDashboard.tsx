import { useState } from 'react';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { Users, GraduationCap, Award, ShieldCheck, AlertTriangle, Filter } from 'lucide-react';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import HazardHeatmap from '../components/HazardHeatmap';
import { departmentStats } from '../data/facility';
import { orgTrainingTrend, departmentPerformance, hazardFrequency, assessmentPerformanceOrg } from '../data/charts';

const tooltipStyle = {
  backgroundColor: '#0D1628',
  border: '1px solid #233252',
  borderRadius: 10,
  fontSize: 12,
  color: '#EAF0FB',
};

const statusTone: Record<string, 'green' | 'amber' | 'red'> = {
  Good: 'green',
  Attention: 'amber',
  Critical: 'red',
};

export default function AdminDashboard() {
  const [deptFilter, setDeptFilter] = useState<string>('All');

  const filteredDepts =
    deptFilter === 'All' ? departmentStats : departmentStats.filter((d) => d.department === deptFilter);

  const totalWorkers = 1284;
  const activeTrainees = 342;
  const certsIssued = 967;
  const avgScore = 84;
  const highRiskWorkers = 27;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-100">Safety Operations Dashboard</h1>
        <p className="text-ink-500 text-sm mt-1">Institutional overview across mining and manufacturing departments.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Workers" value={totalWorkers.toLocaleString()} icon={Users} accent="cyan" />
        <StatCard label="Active Trainees" value={activeTrainees.toString()} icon={GraduationCap} accent="cyan" />
        <StatCard label="Certificates Issued" value={certsIssued.toString()} icon={Award} accent="green" />
        <StatCard label="Average Safety Score" value={`${avgScore}%`} icon={ShieldCheck} accent="amber" />
        <StatCard label="High Risk Workers" value={highRiskWorkers.toString()} icon={AlertTriangle} accent="red" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-display font-semibold text-ink-100 mb-4 text-sm">Training Completion Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={orgTrainingTrend}>
              <CartesianGrid stroke="#182640" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="completion" stroke="#22D3EE" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-display font-semibold text-ink-100 mb-4 text-sm">Department Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={departmentPerformance}>
              <CartesianGrid stroke="#182640" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="department" stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-display font-semibold text-ink-100 mb-4 text-sm">Hazard Frequency</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hazardFrequency}>
              <CartesianGrid stroke="#182640" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="type" stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#F5A623" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-display font-semibold text-ink-100 mb-4 text-sm">Assessment Performance by Department</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={assessmentPerformanceOrg}>
              <CartesianGrid stroke="#182640" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="department" stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="avgScore" fill="#2FBF71" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <HazardHeatmap />

      <div className="card p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="font-display font-semibold text-ink-100 text-sm">Department Breakdown</h3>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-ink-500" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-base-800 border border-base-700 rounded-lg px-3 py-1.5 text-xs text-ink-100 outline-none focus:border-signal-cyan"
            >
              <option value="All">All Departments</option>
              {departmentStats.map((d) => (
                <option key={d.department} value={d.department}>
                  {d.department}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-500 text-xs uppercase tracking-wide border-b border-base-700">
                <th className="pb-3 font-medium">Department</th>
                <th className="pb-3 font-medium">Workers</th>
                <th className="pb-3 font-medium">Completion</th>
                <th className="pb-3 font-medium">Avg Score</th>
                <th className="pb-3 font-medium">High Risk</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepts.map((d) => (
                <tr key={d.department} className="border-b border-base-800 last:border-0">
                  <td className="py-3 text-ink-100 font-medium">{d.department}</td>
                  <td className="py-3 text-ink-300">{d.workers}</td>
                  <td className="py-3 text-ink-300">{d.completion}%</td>
                  <td className="py-3 text-ink-300">{d.avgScore}%</td>
                  <td className="py-3 text-ink-300">{d.highRisk}</td>
                  <td className="py-3">
                    <Badge tone={statusTone[d.status]}>{d.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
