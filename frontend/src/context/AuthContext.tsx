import React, { useState, useEffect } from 'react';
import api from '../api/axios.ts';
import { AuthContext } from './AuthContextType.ts';
import type { User } from '../types/index.ts';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                } catch (error) {
                    console.error('Failed to restore session', error);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (credentials: Record<string, string>) => {
        const response = await api.post('/auth/login/', credentials);
        const { access, refresh, user: userData } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        const refreshToken = localStorage.getItem('refresh_token');
        api.post('/auth/logout/', { refresh: refreshToken }).catch(console.error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const register = async (data: Record<string, string>) => {
        await api.post('/auth/register/', data);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
