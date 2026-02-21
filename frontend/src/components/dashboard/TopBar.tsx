'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, Filter, ArrowUpDown, Bell, ChevronDown } from 'lucide-react';

interface TopBarProps {
    title: string;
    subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Left — Page Title */}
                <div>
                    <h1 className="text-lg font-bold text-gray-900 leading-tight">{title}</h1>
                    {subtitle && (
                        <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
                    )}
                </div>

                {/* Center — Search & Filters */}
                <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-8">
                    <div className="flex-1 relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-500 hover:border-primary/30 hover:text-primary transition-all">
                        <SlidersHorizontal size={14} />
                        Group by
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-500 hover:border-primary/30 hover:text-primary transition-all">
                        <Filter size={14} />
                        Filter
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-500 hover:border-primary/30 hover:text-primary transition-all">
                        <ArrowUpDown size={14} />
                        Sort by
                    </button>
                </div>

                {/* Right — Notifications & User */}
                <div className="flex items-center gap-3">
                    <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/30 transition-all">
                        <Bell size={16} />
                        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                    </button>

                    <div className="flex items-center gap-2 pl-3 border-l border-gray-100 cursor-pointer group">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            A
                        </div>
                        <div className="hidden lg:block">
                            <div className="text-sm font-semibold text-gray-700 leading-tight group-hover:text-primary transition-colors">Admin</div>
                            <div className="text-[10px] text-gray-400">Manager</div>
                        </div>
                        <ChevronDown size={14} className="text-gray-300" />
                    </div>
                </div>
            </div>
        </header>
    );
}
