import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { AppDataProvider } from './context/AppDataContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TrainingModules from './pages/TrainingModules';
import ARSimulation from './pages/ARSimulation';
import Assessment from './pages/Assessment';
import CertificatePage from './pages/CertificatePage';
import Progress from './pages/Progress';
import SafetyKnowledge from './pages/SafetyKnowledge';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';
import EmergencyDrill from './pages/EmergencyDrill';
import { ReactNode } from 'react';

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="training" element={<TrainingModules />} />
        <Route path="ar-simulation" element={<ARSimulation />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="certificates" element={<CertificatePage />} />
        <Route path="progress" element={<Progress />} />
        <Route path="safety-knowledge" element={<SafetyKnowledge />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="emergency-drill" element={<EmergencyDrill />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppDataProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </AppDataProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
