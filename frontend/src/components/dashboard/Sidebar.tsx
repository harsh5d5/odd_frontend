'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Truck,
    Route,
    Wrench,
    Fuel,
    Users,
    BarChart3,
    ChevronLeft,
    LogOut,
} from 'lucide-react';

const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Vehicle Registry', href: '/dashboard/vehicles', icon: Truck },
    { label: 'Trip Dispatcher', href: '/dashboard/trips', icon: Route },
    { label: 'Maintenance', href: '/dashboard/maintenance', icon: Wrench },
    { label: 'Trip & Expense', href: '/dashboard/expenses', icon: Fuel },
    { label: 'Performance', href: '/dashboard/drivers', icon: Users },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-[#0f0f0f] text-white transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[250px]'
                }`}
        >
            {/* Logo */}
            <div className={`flex items-center h-16 px-4 border-b border-white/5 ${collapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/20">
                    <Truck size={18} />
                </div>
                {!collapsed && (
                    <span className="text-lg font-extrabold tracking-tight">
                        Fleet<span className="text-primary">Flow</span>
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive =
                        item.href === '/dashboard'
                            ? pathname === '/dashboard'
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                    ? 'bg-primary text-white shadow-md shadow-orange-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                } ${collapsed ? 'justify-center' : ''}`}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon size={20} className="shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Controls */}
            <div className="p-3 border-t border-white/5 space-y-1">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all w-full ${collapsed ? 'justify-center' : ''
                        }`}
                >
                    <ChevronLeft
                        size={20}
                        className={`shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
                    />
                    {!collapsed && <span>Collapse</span>}
                </button>

                <Link
                    href="/"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all ${collapsed ? 'justify-center' : ''
                        }`}
                >
                    <LogOut size={20} className="shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </Link>
            </div>
        </aside>
    );
}
