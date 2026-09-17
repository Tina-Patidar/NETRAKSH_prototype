import { createContext, useContext, useState, ReactNode } from 'react';
import { AssessmentResult, Certificate } from '../types';
import { trainingModules } from '../data/modules';
import { loadJSON, saveJSON } from '../utils/storage';

interface ModuleProgressMap {
  [moduleId: string]: number;
}

interface SyncState {
  pendingRecords: number;
  lastSync: string;
}

interface AppDataContextValue {
  moduleProgress: ModuleProgressMap;
  updateModuleProgress: (moduleId: string, value: number) => void;
  assessmentHistory: AssessmentResult[];
  addAssessmentResult: (result: AssessmentResult) => void;
  latestResult: AssessmentResult | null;
  certificates: Certificate[];
  issueCertificate: (cert: Certificate) => void;
  syncState: SyncState;
  syncNow: () => void;
  isOffline: boolean;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

function defaultProgress(): ModuleProgressMap {
  const map: ModuleProgressMap = {};
  trainingModules.forEach((m) => {
    map[m.id] = m.completion;
  });
  return map;
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [moduleProgress, setModuleProgress] = useState<ModuleProgressMap>(() =>
    loadJSON('moduleProgress', defaultProgress())
  );
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentResult[]>(() =>
    loadJSON<AssessmentResult[]>('assessmentHistory', [])
  );
  const [certificates, setCertificates] = useState<Certificate[]>(() =>
    loadJSON<Certificate[]>('certificates', [])
  );
  const [syncState, setSyncState] = useState<SyncState>(() =>
    loadJSON<SyncState>('syncState', { pendingRecords: 3, lastSync: '10:42 AM' })
  );
  const [isOffline] = useState(true);

  function updateModuleProgress(moduleId: string, value: number) {
    setModuleProgress((prev) => {
      const next = { ...prev, [moduleId]: Math.max(prev[moduleId] ?? 0, value) };
      saveJSON('moduleProgress', next);
      return next;
    });
    setSyncState((prev) => {
      const next = { ...prev, pendingRecords: prev.pendingRecords + 1 };
      saveJSON('syncState', next);
      return next;
    });
  }

  function addAssessmentResult(result: AssessmentResult) {
    setAssessmentHistory((prev) => {
      const next = [result, ...prev].slice(0, 20);
      saveJSON('assessmentHistory', next);
      return next;
    });
    setSyncState((prev) => {
      const next = { ...prev, pendingRecords: prev.pendingRecords + 1 };
      saveJSON('syncState', next);
      return next;
    });
  }

  function issueCertificate(cert: Certificate) {
    setCertificates((prev) => {
      const next = [cert, ...prev];
      saveJSON('certificates', next);
      return next;
    });
  }

  function syncNow() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const next = { pendingRecords: 0, lastSync: time };
    setSyncState(next);
    saveJSON('syncState', next);
  }

  const latestResult = assessmentHistory[0] ?? null;

  return (
    <AppDataContext.Provider
      value={{
        moduleProgress,
        updateModuleProgress,
        assessmentHistory,
        addAssessmentResult,
        latestResult,
        certificates,
        issueCertificate,
        syncState,
        syncNow,
        isOffline,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
