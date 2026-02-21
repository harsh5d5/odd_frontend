'use client';

import { useState } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import {
    FileText,
    Download,
    Printer,
    Calendar,
    Truck,
    Fuel,
    Wrench,
    Users,
    Route,
} from 'lucide-react';

/* ── Mock Report Data ──────────────────────────────────── */

const reports = [
    {
        id: 1,
        title: 'Fleet Utilization Report',
        description: 'Monthly breakdown of vehicle utilization, idle time, and trip frequency.',
        icon: Truck,
        color: 'bg-primary/10 text-primary',
        generated: '2026-02-20',
        type: 'Operations',
    },
    {
        id: 2,
        title: 'Fuel Consumption Report',
        description: 'Fuel cost per vehicle, efficiency trends, and cost anomalies.',
        icon: Fuel,
        color: 'bg-green-50 text-green-600',
        generated: '2026-02-19',
        type: 'Financial',
    },
    {
        id: 3,
        title: 'Maintenance Cost Summary',
        description: 'Total maintenance spend by vehicle, service type, and frequency.',
        icon: Wrench,
        color: 'bg-amber-50 text-amber-600',
        generated: '2026-02-18',
        type: 'Financial',
    },
    {
        id: 4,
        title: 'Driver Safety Scorecard',
        description: 'Individual driver safety scores, complaints, and trip completion rates.',
        icon: Users,
        color: 'bg-blue-50 text-blue-600',
        generated: '2026-02-17',
        type: 'Compliance',
    },
    {
        id: 5,
        title: 'Trip Performance Report',
        description: 'On-time delivery rates, route analysis, and delay causes.',
        icon: Route,
        color: 'bg-purple-50 text-purple-600',
        generated: '2026-02-16',
        type: 'Operations',
    },
    {
        id: 6,
        title: 'Monthly P&L Statement',
        description: 'Revenue, fuel, maintenance, and net profit breakdown by month.',
        icon: FileText,
        color: 'bg-red-50 text-red-500',
        generated: '2026-02-15',
        type: 'Financial',
    },
];

const typeColors: Record<string, string> = {
    Operations: 'bg-primary/10 text-primary',
    Financial: 'bg-green-50 text-green-600',
    Compliance: 'bg-blue-50 text-blue-600',
};

/* ── Component ─────────────────────────────────────────── */

export default function ReportsPage() {
    const [filter, setFilter] = useState<string>('All');
    const types = ['All', 'Operations', 'Financial', 'Compliance'];
    const filtered = filter === 'All' ? reports : reports.filter((r) => r.type === filter);

    return (
        <>
            <TopBar title="Reports" subtitle="Generate and download operational & financial reports" />

            <main className="p-6 space-y-6">
                {/* Filter Tabs */}
                <div className="flex items-center gap-2">
                    {types.map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === type
                                    ? 'bg-primary text-white shadow-md shadow-orange-500/15'
                                    : 'bg-white border border-gray-100 text-gray-500 hover:border-primary/30 hover:text-primary'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Report Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((report) => (
                        <div
                            key={report.id}
                            className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-primary/20 transition-all group"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${report.color}`}>
                                    <report.icon size={20} />
                                </div>
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${typeColors[report.type]}`}>
                                    {report.type}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-primary transition-colors">
                                {report.title}
                            </h3>
                            <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                {report.description}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                    <Calendar size={12} />
                                    {report.generated}
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        title="Download PDF"
                                        className="w-8 h-8 rounded-lg hover:bg-primary/10 flex items-center justify-center text-gray-300 hover:text-primary transition-colors"
                                    >
                                        <Download size={14} />
                                    </button>
                                    <button
                                        title="Print"
                                        className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-300 hover:text-gray-600 transition-colors"
                                    >
                                        <Printer size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
