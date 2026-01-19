import React from 'react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.ts';

export const Sidebar: React.FC = () => {
    const { user, logout } = useAuth();

    const navigation = [
        { name: 'Dashboard', icon: LayoutDashboard, current: true },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="h-16 flex items-center px-6 border-b border-neutral-100">
                <span className="text-xl font-bold text-neutral-800 tracking-tight">Synapse</span>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-8">
                <div>
                    <h3 className="px-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        Main
                    </h3>
                    <div className="mt-2 space-y-1">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href="#"
                                className={`
                  flex items-center px-2 py-2 text-sm font-medium rounded-md group
                  ${item.current ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'}
                `}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="p-4 border-t border-neutral-100">
                <div className="flex items-center p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600">
                        {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900 truncate">
                            {user?.first_name} {user?.last_name}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="ml-2 p-1 text-neutral-400 hover:text-neutral-600"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
