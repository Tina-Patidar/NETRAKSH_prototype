import { HazardZone, KnowledgeEntry, DepartmentStat, SupervisorAlert, EmergencyScenarioType, ActivityItem } from '../types';

export const hazardZones: HazardZone[] = [
  {
    id: 'zone-a',
    name: 'Zone A — Conveyor Bay',
    risk: 'Low',
    hazardType: 'Moving machinery',
    lastIncident: '48 days ago',
    recommendedAction: 'Maintain standard exclusion zone. Routine inspection scheduled.',
    x: 18,
    y: 25,
  },
  {
    id: 'zone-b',
    name: 'Zone B — Smelting Floor',
    risk: 'Medium',
    hazardType: 'Heat exposure, molten material',
    lastIncident: '12 days ago',
    recommendedAction: 'Heat-resistant PPE mandatory. Limit continuous exposure to 20 minutes.',
    x: 55,
    y: 20,
  },
  {
    id: 'zone-c',
    name: 'Zone C — Underground Shaft 3',
    risk: 'High',
    hazardType: 'Gas accumulation, low visibility',
    lastIncident: '3 days ago',
    recommendedAction: 'Gas detectors mandatory. Two-person entry rule enforced.',
    x: 30,
    y: 62,
  },
  {
    id: 'zone-d',
    name: 'Zone D — Blasting Perimeter',
    risk: 'Critical',
    hazardType: 'Explosive materials handling',
    lastIncident: 'Active exclusion today',
    recommendedAction: 'Full evacuation of perimeter during blast windows. Supervisor authorization required for entry.',
    x: 75,
    y: 68,
  },
];

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: 'k1',
    category: 'Fire Safety',
    hazard: 'Electrical fire near energized panels',
    risk: 'Shock, arc flash, rapid fire spread',
    preventiveAction: 'Keep panels clear, inspect wiring regularly, no water-based extinguishers nearby',
    emergencyAction: 'Isolate power if safe, use CO₂ extinguisher, evacuate if fire spreads',
  },
  {
    id: 'k2',
    category: 'Gas Safety',
    hazard: 'Methane accumulation in shafts',
    risk: 'Asphyxiation, explosion risk',
    preventiveAction: 'Continuous gas monitoring, forced ventilation, restricted entry permits',
    emergencyAction: 'Evacuate immediately, ventilate area, do not use open flame or spark-producing tools',
  },
  {
    id: 'k3',
    category: 'Machinery',
    hazard: 'Unguarded rotating shafts',
    risk: 'Entanglement, crushing injuries',
    preventiveAction: 'Lockout/Tagout before servicing, maintain machine guards, exclusion zone markings',
    emergencyAction: 'Hit emergency stop, do not attempt manual extraction, alert first aid team',
  },
  {
    id: 'k4',
    category: 'PPE',
    hazard: 'Airborne particulate in crushing zones',
    risk: 'Respiratory damage, eye irritation',
    preventiveAction: 'Mandatory respirators and goggles, dust suppression systems active',
    emergencyAction: 'Move to fresh air, flush eyes with saline, report to site medic',
  },
  {
    id: 'k5',
    category: 'Emergency Response',
    hazard: 'Site-wide evacuation alarm',
    risk: 'Crowd crush, disorientation',
    preventiveAction: 'Familiarize with evacuation routes and muster points during induction',
    emergencyAction: 'Use marked stairwells, proceed calmly to muster point, report headcount to supervisor',
  },
  {
    id: 'k6',
    category: 'Electrical Safety',
    hazard: 'Frayed cables on live panels',
    risk: 'Electric shock, arc flash burns',
    preventiveAction: 'Routine cable inspection, insulated tools only, restricted panel access',
    emergencyAction: 'Do not touch, isolate power at source, report to electrical supervisor',
  },
];

export const departmentStats: DepartmentStat[] = [
  { department: 'Mining', workers: 412, completion: 78, avgScore: 82, highRisk: 11, status: 'Attention' },
  { department: 'Steel', workers: 356, completion: 88, avgScore: 87, highRisk: 4, status: 'Good' },
  { department: 'Manufacturing', workers: 298, completion: 91, avgScore: 89, highRisk: 3, status: 'Good' },
  { department: 'Maintenance', workers: 218, completion: 64, avgScore: 76, highRisk: 9, status: 'Critical' },
];

export const supervisorAlerts: SupervisorAlert[] = [
  { id: 'a1', message: 'High-risk trainee detected in Maintenance dept.', severity: 'Critical', timestamp: '10 min ago', worker: 'Sanjay Das' },
  { id: 'a2', message: 'Assessment score below threshold (54%)', severity: 'Warning', timestamp: '32 min ago', worker: 'Amit Singh' },
  { id: 'a3', message: 'Certification expiring in 5 days', severity: 'Warning', timestamp: '1 hr ago', worker: 'Priya Kumari' },
  { id: 'a4', message: 'Gas Safety module incomplete after deadline', severity: 'Info', timestamp: '3 hrs ago', worker: 'Rahul Kumar' },
  { id: 'a5', message: 'Machinery Safety module incomplete', severity: 'Info', timestamp: '5 hrs ago', worker: 'Deepak Oraon' },
];

export const emergencyScenarios: EmergencyScenarioType[] = [
  {
    id: 'fire',
    name: 'Fire',
    icon: 'Flame',
    steps: [
      { id: 's1', prompt: 'Fire detected near workstation. What is your first action?', options: ['Raise the alarm', 'Take a photo', 'Continue working'], correctIndex: 0 },
      { id: 's2', prompt: 'Select appropriate response equipment.', options: ['Water hose on electrical fire', 'CO₂ extinguisher', 'Bare hands'], correctIndex: 1 },
      { id: 's3', prompt: 'Next step after containment attempt fails?', options: ['Evacuate via marked route', 'Stay and keep fighting fire', 'Use elevator'], correctIndex: 0 },
      { id: 's4', prompt: 'At the muster point, what do you do?', options: ['Leave immediately', 'Report headcount to supervisor', 'Go back inside'], correctIndex: 1 },
      { id: 's5', prompt: 'Final step of the response?', options: ['File an incident report', 'Do nothing further', 'Delete the alarm log'], correctIndex: 0 },
    ],
  },
  {
    id: 'gas',
    name: 'Gas Leak',
    icon: 'Wind',
    steps: [
      { id: 's1', prompt: 'Gas leak detected. What do you put on first?', options: ['Sunglasses', 'Respiratory PPE', 'Nothing needed'], correctIndex: 1 },
      { id: 's2', prompt: 'Next action?', options: ['Raise the alarm', 'Ignore and continue', 'Light a torch to see better'], correctIndex: 0 },
      { id: 's3', prompt: 'How do you handle the source?', options: ['Isolate the source if safe', 'Leave it running', 'Try to repair it yourself'], correctIndex: 0 },
      { id: 's4', prompt: 'What area action is required?', options: ['Evacuate affected area', 'Keep everyone working', 'Open more valves'], correctIndex: 0 },
      { id: 's5', prompt: 'Final step?', options: ['Report incident to supervisor', 'Say nothing', 'Re-enter immediately'], correctIndex: 0 },
    ],
  },
  {
    id: 'machine',
    name: 'Machine Failure',
    icon: 'Cog',
    steps: [
      { id: 's1', prompt: 'Machine malfunctions violently. First action?', options: ['Hit emergency stop', 'Try to fix it while running', 'Walk away silently'], correctIndex: 0 },
      { id: 's2', prompt: 'Next step for the area?', options: ['Cordon off the area', 'Let others walk through', 'Ignore the risk'], correctIndex: 0 },
      { id: 's3', prompt: 'Who should be alerted?', options: ['Maintenance supervisor', 'No one', 'Only your friend'], correctIndex: 0 },
      { id: 's4', prompt: 'Before restart, what is required?', options: ['Full inspection and lockout clearance', 'Just turn it back on', 'Ask a passerby'], correctIndex: 0 },
      { id: 's5', prompt: 'Final documentation step?', options: ['Log the incident report', 'Skip reporting', 'Discard the details'], correctIndex: 0 },
    ],
  },
  {
    id: 'chemical',
    name: 'Chemical Spill',
    icon: 'FlaskConical',
    steps: [
      { id: 's1', prompt: 'Chemical spill observed. First action?', options: ['Alert nearby workers', 'Step in the spill to inspect', 'Take a break'], correctIndex: 0 },
      { id: 's2', prompt: 'What PPE is required before response?', options: ['Chemical-resistant gloves and goggles', 'None required', 'Just gloves'], correctIndex: 0 },
      { id: 's3', prompt: 'How is the area managed?', options: ['Cordon and ventilate', 'Leave open to foot traffic', 'Cover with cardboard only'], correctIndex: 0 },
      { id: 's4', prompt: 'Who handles containment?', options: ['Trained spill-response team', 'Any nearby worker without training', 'No one'], correctIndex: 0 },
      { id: 's5', prompt: 'Final step?', options: ['Report and log incident', 'Ignore once cleaned', 'Dispose in regular waste'], correctIndex: 0 },
    ],
  },
];

export const recentActivity: ActivityItem[] = [
  { id: 'r1', text: 'Fire safety module completed', timestamp: 'Today, 9:12 AM', type: 'success' },
  { id: 'r2', text: 'Assessment score: 92%', timestamp: 'Today, 9:20 AM', type: 'success' },
  { id: 'r3', text: 'Certificate renewed', timestamp: 'Yesterday, 4:45 PM', type: 'info' },
  { id: 'r4', text: 'Gas Safety module started', timestamp: '2 days ago', type: 'info' },
];

export const workerNames = ['Rahul Kumar', 'Amit Singh', 'Priya Kumari', 'Sanjay Das', 'Deepak Oraon', 'Meena Devi', 'Vikram Mahato', 'Sunita Kumari'];
export const departments = ['Mining', 'Steel', 'Manufacturing', 'Maintenance'];
