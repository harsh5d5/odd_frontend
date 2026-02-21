'use client';

import TopBar from '@/components/dashboard/TopBar';
import {
    Truck,
    AlertTriangle,
    Gauge,
    Package,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
} from 'lucide-react';
import Link from 'next/link';

/* ── Mock Data ─────────────────────────────────────────── */

const kpis = [
    {
        label: 'Active Fleet',
        value: '220',
        change: '+12',
        trend: 'up' as const,
        icon: Truck,
        color: 'bg-primary/10 text-primary',
    },
    {
        label: 'Maintenance Alerts',
        value: '18',
        change: '+3',
        trend: 'up' as const,
        icon: AlertTriangle,
        color: 'bg-amber-50 text-amber-500',
    },
    {
        label: 'Utilization Rate',
        value: '82%',
        change: '+5%',
        trend: 'up' as const,
        icon: Gauge,
        color: 'bg-green-50 text-green-500',
    },
    {
        label: 'Pending Cargo',
        value: '20',
        change: '-4',
        trend: 'down' as const,
        icon: Package,
        color: 'bg-blue-50 text-blue-500',
    },
];

const trips = [
    { id: 1, vehicle: 'MH 12 AB 1234', type: 'Trailer Truck', driver: 'Rahul Sharma', origin: 'Mumbai', destination: 'Pune', status: 'On Trip' },
    { id: 2, vehicle: 'MH 04 CD 5678', type: 'Mini Van', driver: 'Amit Patel', origin: 'Ahmedabad', destination: 'Surat', status: 'On Trip' },
    { id: 3, vehicle: 'GJ 01 EF 9012', type: 'Container', driver: 'Vikram Singh', origin: 'Delhi', destination: 'Jaipur', status: 'Delivered' },
    { id: 4, vehicle: 'RJ 14 GH 3456', type: 'Flatbed', driver: 'Suresh Kumar', origin: 'Bangalore', destination: 'Chennai', status: 'Scheduled' },
    { id: 5, vehicle: 'KA 05 IJ 7890', type: 'Tanker', driver: 'Deepak Yadav', origin: 'Kolkata', destination: 'Patna', status: 'On Trip' },
    { id: 6, vehicle: 'DL 08 KL 2345', type: 'Trailer Truck', driver: 'Manoj Tiwari', origin: 'Pune', destination: 'Nagpur', status: 'Idle' },
    { id: 7, vehicle: 'UP 32 MN 6789', type: 'Mini Van', driver: 'Ravi Verma', origin: 'Lucknow', destination: 'Varanasi', status: 'Delivered' },
];

const statusColors: Record<string, string> = {
    'On Trip': 'bg-primary/10 text-primary',
    'Delivered': 'bg-green-50 text-green-600',
    'Scheduled': 'bg-blue-50 text-blue-600',
    'Idle': 'bg-gray-100 text-gray-500',
};

/* ── Component ─────────────────────────────────────────── */

export default function DashboardPage() {
    return (
        <>
            <TopBar title="Dashboard" subtitle="Overview of your fleet operations" />

            <main className="p-6 space-y-6">
                {/* Quick Actions */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/trips"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-orange-500/15 hover:shadow-lg hover:shadow-orange-500/20"
                    >
                        <Plus size={16} /> New Trip
                    </Link>
                    <Link
                        href="/dashboard/vehicles"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all"
                    >
                        <Plus size={16} /> New Vehicle
                    </Link>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpis.map((kpi, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:shadow-gray-100/80 transition-all duration-200 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${kpi.color}`}>
                                    <kpi.icon size={20} />
                                </div>
                                <div
                                    className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${kpi.trend === 'up' && kpi.label !== 'Maintenance Alerts'
                                            ? 'bg-green-50 text-green-600'
                                            : kpi.trend === 'up' && kpi.label === 'Maintenance Alerts'
                                                ? 'bg-red-50 text-red-500'
                                                : 'bg-green-50 text-green-600'
                                        }`}
                                >
                                    {kpi.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {kpi.change}
                                </div>
                            </div>
                            <div className="text-3xl font-extrabold text-gray-900 leading-none mb-1 group-hover:text-primary transition-colors">
                                {kpi.value}
                            </div>
                            <div className="text-sm text-gray-400 font-medium">{kpi.label}</div>
                        </div>
                    ))}
                </div>

                {/* Trip Overview Table */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">Trip Overview</h2>
                            <p className="text-xs text-gray-400 mt-0.5">{trips.length} active trips</p>
                        </div>
                        <Link
                            href="/dashboard/trips"
                            className="text-xs font-bold text-primary hover:underline"
                        >
                            View All →
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Trip</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Vehicle</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Type</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Driver</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">Origin</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">Destination</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Status</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {trips.map((trip) => (
                                    <tr key={trip.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-3.5">
                                            <span className="text-sm font-bold text-gray-900">#{trip.id}</span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className="text-sm font-semibold text-gray-700">{trip.vehicle}</span>
                                        </td>
                                        <td className="px-6 py-3.5 hidden md:table-cell">
                                            <span className="text-sm text-gray-500">{trip.type}</span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                    {trip.driver.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="text-sm text-gray-700">{trip.driver}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 hidden lg:table-cell">
                                            <span className="text-sm text-gray-500">{trip.origin}</span>
                                        </td>
                                        <td className="px-6 py-3.5 hidden lg:table-cell">
                                            <span className="text-sm text-gray-500">{trip.destination}</span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${statusColors[trip.status] || 'bg-gray-100 text-gray-500'
                                                    }`}
                                            >
                                                {trip.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}
