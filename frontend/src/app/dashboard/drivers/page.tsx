'use client';

import { useState } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import {
    Plus,
    X,
    Users,
    Shield,
    AlertTriangle,
    Trash2,
    Star,
} from 'lucide-react';

/* ── Types ─────────────────────────────────────────────── */

type DutyStatus = 'On Duty' | 'Break' | 'Suspended';

interface Driver {
    id: number;
    name: string;
    license: string;
    licenseExpiry: string;
    completionRate: number;
    safetyScore: number;
    complaints: number;
    tripsCompleted: number;
    dutyStatus: DutyStatus;
}

/* ── Mock Data ─────────────────────────────────────────── */

const initialDrivers: Driver[] = [
    { id: 1, name: 'Rahul Sharma', license: 'MH-DL-2025-001', licenseExpiry: '2027-06-15', completionRate: 96, safetyScore: 92, complaints: 0, tripsCompleted: 142, dutyStatus: 'On Duty' },
    { id: 2, name: 'Amit Patel', license: 'GJ-DL-2024-042', licenseExpiry: '2025-12-01', completionRate: 89, safetyScore: 85, complaints: 2, tripsCompleted: 98, dutyStatus: 'On Duty' },
    { id: 3, name: 'Vikram Singh', license: 'DL-DL-2025-118', licenseExpiry: '2026-01-10', completionRate: 94, safetyScore: 88, complaints: 1, tripsCompleted: 120, dutyStatus: 'Break' },
    { id: 4, name: 'Suresh Kumar', license: 'RJ-DL-2024-077', licenseExpiry: '2025-08-20', completionRate: 78, safetyScore: 72, complaints: 4, tripsCompleted: 65, dutyStatus: 'Suspended' },
    { id: 5, name: 'Deepak Yadav', license: 'KA-DL-2025-203', licenseExpiry: '2028-03-05', completionRate: 98, safetyScore: 95, complaints: 0, tripsCompleted: 210, dutyStatus: 'On Duty' },
    { id: 6, name: 'Manoj Tiwari', license: 'UP-DL-2023-156', licenseExpiry: '2025-11-30', completionRate: 82, safetyScore: 78, complaints: 3, tripsCompleted: 87, dutyStatus: 'Break' },
    { id: 7, name: 'Ravi Verma', license: 'MH-DL-2024-089', licenseExpiry: '2025-02-01', completionRate: 91, safetyScore: 83, complaints: 1, tripsCompleted: 110, dutyStatus: 'On Duty' },
];

const dutyColors: Record<DutyStatus, string> = {
    'On Duty': 'bg-green-50 text-green-600',
    Break: 'bg-amber-50 text-amber-600',
    Suspended: 'bg-red-50 text-red-500',
};

const dutyDot: Record<DutyStatus, string> = {
    'On Duty': 'bg-green-500',
    Break: 'bg-amber-500',
    Suspended: 'bg-red-500',
};

/* ── Helpers ─────────────────────────────────────────────── */

function isExpired(dateStr: string): boolean {
    return new Date(dateStr) < new Date();
}

function getSafetyColor(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-amber-600';
    return 'text-red-500';
}

function getSafetyBg(score: number): string {
    if (score >= 90) return 'bg-green-50';
    if (score >= 75) return 'bg-amber-50';
    return 'bg-red-50';
}

/* ── Component ─────────────────────────────────────────── */

export default function DriversPage() {
    const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        name: '',
        license: '',
        licenseExpiry: '',
    });

    const expiredDrivers = drivers.filter((d) => isExpired(d.licenseExpiry));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newDriver: Driver = {
            id: drivers.length + 1,
            name: form.name,
            license: form.license,
            licenseExpiry: form.licenseExpiry,
            completionRate: 0,
            safetyScore: 100,
            complaints: 0,
            tripsCompleted: 0,
            dutyStatus: 'On Duty',
        };
        setDrivers([newDriver, ...drivers]);
        setForm({ name: '', license: '', licenseExpiry: '' });
        setShowForm(false);
    };

    const handleDelete = (id: number) => {
        setDrivers(drivers.filter((d) => d.id !== id));
    };

    return (
        <>
            <TopBar title="Driver Performance & Safety" subtitle="Monitor driver profiles, safety scores, and license compliance" />

            <main className="p-6 space-y-6">
                {/* Safety Lock Banner */}
                {expiredDrivers.length > 0 && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                        <Shield size={18} className="text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-red-700 mb-1">⚠ Safety Lock Active</p>
                            <p className="text-xs text-red-600">
                                {expiredDrivers.length} driver{expiredDrivers.length > 1 ? 's' : ''} with <strong>expired licenses</strong> — blocked from trip assignment:{' '}
                                {expiredDrivers.map((d) => d.name).join(', ')}
                            </p>
                        </div>
                    </div>
                )}

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="text-sm text-gray-400 mb-1">Total Drivers</div>
                        <div className="text-3xl font-extrabold text-gray-900">{drivers.length}</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="text-sm text-gray-400 mb-1">On Duty</div>
                        <div className="text-3xl font-extrabold text-green-600">{drivers.filter((d) => d.dutyStatus === 'On Duty').length}</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="text-sm text-gray-400 mb-1">Avg Safety Score</div>
                        <div className="text-3xl font-extrabold text-primary">
                            {Math.round(drivers.reduce((s, d) => s + d.safetyScore, 0) / drivers.length)}%
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="text-sm text-gray-400 mb-1">License Expired</div>
                        <div className="text-3xl font-extrabold text-red-500">{expiredDrivers.length}</div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                        <span className="font-bold text-gray-700">{drivers.length}</span> registered drivers
                    </p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-orange-500/15"
                    >
                        <Plus size={16} /> Add Driver
                    </button>
                </div>

                {/* New Driver Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <Users size={18} />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900">Add New Driver</h3>
                                </div>
                                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rahul Sharma" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">License Number *</label>
                                    <input type="text" required value={form.license} onChange={(e) => setForm({ ...form, license: e.target.value })} placeholder="e.g. MH-DL-2025-001" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">License Expiry Date *</label>
                                    <input type="date" required value={form.licenseExpiry} onChange={(e) => setForm({ ...form, licenseExpiry: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <button type="submit" className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-orange-500/15">Add Driver</button>
                                    <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Drivers Table */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Driver</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">License #</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Expiry</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">Trips</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">Completion</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Safety</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Complaints</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Status</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {drivers.map((driver) => {
                                    const expired = isExpired(driver.licenseExpiry);
                                    return (
                                        <tr key={driver.id} className={`hover:bg-gray-50/50 transition-colors group ${expired ? 'bg-red-50/30' : ''}`}>
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                                        {driver.name.split(' ').map((n) => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-semibold text-gray-800 block">{driver.name}</span>
                                                        {expired && (
                                                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-0.5">
                                                                <AlertTriangle size={10} /> LICENSE EXPIRED
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5 hidden md:table-cell">
                                                <span className="text-sm text-gray-600 font-mono">{driver.license}</span>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className={`text-sm font-medium ${expired ? 'text-red-500' : 'text-gray-500'}`}>
                                                    {driver.licenseExpiry}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5 hidden lg:table-cell">
                                                <span className="text-sm font-bold text-gray-700">{driver.tripsCompleted}</span>
                                            </td>
                                            <td className="px-6 py-3.5 hidden lg:table-cell">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary rounded-full" style={{ width: `${driver.completionRate}%` }} />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-600">{driver.completionRate}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${getSafetyBg(driver.safetyScore)} ${getSafetyColor(driver.safetyScore)}`}>
                                                    <Star size={11} />
                                                    {driver.safetyScore}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5 hidden md:table-cell">
                                                <span className={`text-sm font-bold ${driver.complaints > 2 ? 'text-red-500' : driver.complaints > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                                                    {driver.complaints}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${dutyColors[driver.dutyStatus]}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${dutyDot[driver.dutyStatus]}`} />
                                                    {driver.dutyStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <button onClick={() => handleDelete(driver.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}
