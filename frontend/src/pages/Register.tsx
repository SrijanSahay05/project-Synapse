import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import axios from 'axios';
import { Loader2, Mail, Lock } from 'lucide-react';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.detail || 'Failed to register. Please try again.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">Synapse</h1>
                <p className="mt-2 text-sm text-neutral-500 italic">Start your journey.</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm border border-neutral-100 sm:rounded-2xl sm:px-10">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">First Name</label>
                                <input
                                    name="first_name"
                                    type="text"
                                    required
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-3 border border-neutral-200 rounded-xl placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">Last Name</label>
                                <input
                                    name="last_name"
                                    type="text"
                                    required
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-3 border border-neutral-200 rounded-xl placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">Email address</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-neutral-400" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 px-3 py-3 border border-neutral-200 rounded-xl placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 sm:text-sm"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">Password</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-neutral-400" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 px-3 py-3 border border-neutral-200 rounded-xl placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-neutral-900 hover:underline">
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
