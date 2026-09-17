export type Role = 'worker' | 'supervisor' | 'admin';

export type Language = 'en' | 'hi' | 'sat';

export interface User {
  employeeId: string;
  name: string;
  role: Role;
  department: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  completion: number;
  category: 'fire' | 'gas' | 'machinery' | 'ppe' | 'evacuation' | 'electrical';
}

export interface AssessmentQuestion {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AssessmentResult {
  score: number;
  accuracy: number;
  totalQuestions: number;
  correct: number;
  responseTimeSeconds: number;
  competencyLevel: string;
  timestamp: string;
}

export interface HazardZone {
  id: string;
  name: string;
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  hazardType: string;
  lastIncident: string;
  recommendedAction: string;
  x: number;
  y: number;
}

export interface KnowledgeEntry {
  id: string;
  category: 'Fire Safety' | 'PPE' | 'Gas Safety' | 'Machinery' | 'Emergency Response' | 'Electrical Safety';
  hazard: string;
  risk: string;
  preventiveAction: string;
  emergencyAction: string;
}

export interface Certificate {
  id: string;
  workerName: string;
  training: string;
  score: number;
  competency: 'PASSED' | 'FAILED';
  completedDate: string;
}

export interface SupervisorAlert {
  id: string;
  message: string;
  severity: 'Critical' | 'Warning' | 'Info';
  timestamp: string;
  worker?: string;
}

export interface DepartmentStat {
  department: string;
  workers: number;
  completion: number;
  avgScore: number;
  highRisk: number;
  status: 'Good' | 'Attention' | 'Critical';
}

export interface EmergencyScenarioType {
  id: string;
  name: string;
  icon: string;
  steps: EmergencyStep[];
}

export interface EmergencyStep {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface ActivityItem {
  id: string;
  text: string;
  timestamp: string;
  type: 'success' | 'info' | 'warning';
}
