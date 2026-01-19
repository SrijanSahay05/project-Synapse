import { createContext } from 'react';
import type { User } from '../types/index.ts';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: Record<string, string>) => Promise<void>;
    logout: () => void;
    register: (data: Record<string, string>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
