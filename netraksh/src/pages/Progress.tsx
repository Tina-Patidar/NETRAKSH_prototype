import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import { weeklyCompletionTrend, weeklySafetyScore, modulePerformance, assessmentAccuracy, skillRadar } from '../data/charts';

const tooltipStyle = {
  backgroundColor: '#0D1628',
  border: '1px solid #233252',
  borderRadius: 10,
  fontSize: 12,
  color: '#EAF0FB',
};

export default function Progress() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-100">Progress</h1>
        <p className="text-ink-500 text-sm mt-1">Training trajectory and skill competency over time.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-display font-semibold text-ink-100 mb-4 text-sm">Training Completion Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={weeklyCompletionTrend}>
              <CartesianGrid stroke="#182640" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="completion" stroke="#22D3EE" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-display font-semibold text-ink-100 mb-4 text-sm">Weekly Safety Score</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={weeklySafetyScore}>
              <CartesianGrid stroke="#182640" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="score" stroke="#2FBF71" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-display font-semibold text-ink-100 mb-4 text-sm">Module Performance</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={modulePerformance}>
              <CartesianGrid stroke="#182640" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="module" stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" fill="#F5A623" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-display font-semibold text-ink-100 mb-4 text-sm">Assessment Accuracy Over Attempts</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={assessmentAccuracy}>
              <CartesianGrid stroke="#182640" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="attempt" stroke="#7C8BAA" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#7C8BAA" fontSize={12} tickLine={false} axisLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="accuracy" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 lg:col-span-2">
          <h3 className="font-display font-semibold text-ink-100 mb-4 text-sm">Skill Competency Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillRadar}>
              <PolarGrid stroke="#233252" />
              <PolarAngleAxis dataKey="skill" stroke="#B7C4DE" fontSize={12} />
              <PolarRadiusAxis stroke="#354a72" fontSize={10} domain={[0, 100]} />
              <Radar dataKey="value" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
