import { createContext, useContext, useState, ReactNode } from 'react';
import { Role, User } from '../types';
import { loadJSON, saveJSON, removeKey } from '../utils/storage';

interface AuthContextValue {
  user: User | null;
  login: (employeeId: string, password: string, role: Role) => { ok: boolean; message?: string };
  loginDemo: (role: Role) => void;
  logout: () => void;
}

const demoAccounts: Record<Role, User> = {
  worker: { employeeId: 'worker', name: 'Rahul Kumar', role: 'worker', department: 'Mining' },
  supervisor: { employeeId: 'supervisor', name: 'Anjali Verma', role: 'supervisor', department: 'Steel' },
  admin: { employeeId: 'admin', name: 'Ramesh Tiwari', role: 'admin', department: 'HQ' },
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadJSON<User | null>('user', null));

  function login(employeeId: string, password: string, role: Role) {
    const account = demoAccounts[role];
    if (employeeId.trim().toLowerCase() === account.employeeId && password.length > 0) {
      setUser(account);
      saveJSON('user', account);
      return { ok: true };
    }
    return { ok: false, message: `Try demo credentials — Employee ID: "${account.employeeId}", any password.` };
  }

  function loginDemo(role: Role) {
    const account = demoAccounts[role];
    setUser(account);
    saveJSON('user', account);
  }

  function logout() {
    setUser(null);
    removeKey('user');
  }

  return (
    <AuthContext.Provider value={{ user, login, loginDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
