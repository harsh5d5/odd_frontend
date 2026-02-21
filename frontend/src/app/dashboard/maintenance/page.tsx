'use client';

import { useState } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import {
    Plus,
    X,
    Wrench,
    AlertTriangle,
    Trash2,
    CheckCircle2,
} from 'lucide-react';

/* ── Types ─────────────────────────────────────────────── */

type LogStatus = 'New' | 'In Progress' | 'Completed';

interface MaintenanceLog {
    id: number;
    vehicle: string;
    issue: string;
    date: string;
    cost: number;
    status: LogStatus;
}

/* ── Mock Data ─────────────────────────────────────────── */

const vehicleList = [
    'MH 12 AB 1234 — Tata Ace',
    'MH 04 CD 5678 — Ashok Leyland',
    'GJ 01 EF 9012 — Eicher Pro',
    'RJ 14 GH 3456 — BharatBenz',
    'KA 05 IJ 7890 — Mahindra Blazo',
    'DL 08 KL 2345 — Tata Prima',
];

const initialLogs: MaintenanceLog[] = [
    { id: 321, vehicle: 'RJ 14 GH 3456', issue: 'Engine Issue', date: '2026-02-20', cost: 10000, status: 'New' },
    { id: 322, vehicle: 'MH 04 CD 5678', issue: 'Brake Pad Replacement', date: '2026-02-18', cost: 4500, status: 'In Progress' },
    { id: 323, vehicle: 'DL 08 KL 2345', issue: 'Oil Change', date: '2026-02-15', cost: 2000, status: 'Completed' },
    { id: 324, vehicle: 'GJ 01 EF 9012', issue: 'Tire Rotation', date: '2026-02-14', cost: 3000, status: 'In Progress' },
    { id: 325, vehicle: 'KA 05 IJ 7890', issue: 'AC Compressor Fix', date: '2026-02-12', cost: 8500, status: 'New' },
    { id: 326, vehicle: 'MH 12 AB 1234', issue: 'Battery Replacement', date: '2026-02-10', cost: 5500, status: 'Completed' },
    { id: 327, vehicle: 'RJ 14 GH 3456', issue: 'Suspension Check', date: '2026-02-08', cost: 7000, status: 'Completed' },
];

const statusColors: Record<LogStatus, string> = {
    New: 'bg-red-50 text-red-500',
    'In Progress': 'bg-amber-50 text-amber-600',
    Completed: 'bg-green-50 text-green-600',
};

const statusDot: Record<LogStatus, string> = {
    New: 'bg-red-500',
    'In Progress': 'bg-amber-500',
    Completed: 'bg-green-500',
};

/* ── Component ─────────────────────────────────────────── */

export default function MaintenancePage() {
    const [logs, setLogs] = useState<MaintenanceLog[]>(initialLogs);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        vehicle: vehicleList[0],
        issue: '',
        date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const vehiclePlate = form.vehicle.split(' — ')[0];
        const newLog: MaintenanceLog = {
            id: Math.max(...logs.map((l) => l.id), 0) + 1,
            vehicle: vehiclePlate,
            issue: form.issue,
            date: form.date,
            cost: 0,
            status: 'New',
        };
        setLogs([newLog, ...logs]);
        setForm({ vehicle: vehicleList[0], issue: '', date: new Date().toISOString().split('T')[0] });
        setShowForm(false);
    };

    const handleDelete = (id: number) => {
        setLogs(logs.filter((l) => l.id !== id));
    };

    const markComplete = (id: number) => {
        setLogs(logs.map((l) => (l.id === id ? { ...l, status: 'Completed' as LogStatus } : l)));
    };

    const inShopVehicles = logs
        .filter((l) => l.status === 'New' || l.status === 'In Progress')
        .map((l) => l.vehicle);

    const uniqueInShop = [...new Set(inShopVehicles)];

    return (
        <>
            <TopBar title="Maintenance & Service Logs" subtitle="Track repairs, services, and vehicle health" />

            <main className="p-6 space-y-6">
                {/* Info Banner — Auto-Hide Rule */}
                {uniqueInShop.length > 0 && (
                    <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                        <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-amber-700 mb-1">Auto-Hide Active</p>
                            <p className="text-xs text-amber-600">
                                {uniqueInShop.length} vehicle{uniqueInShop.length > 1 ? 's' : ''} currently marked as <strong>"In Shop"</strong> and hidden from Trip Dispatcher:{' '}
                                {uniqueInShop.join(', ')}
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Bar */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                        <span className="font-bold text-gray-700">{logs.length}</span> service logs
                    </p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-orange-500/15"
                    >
                        <Plus size={16} /> Create New Service
                    </button>
                </div>

                {/* New Service Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <Wrench size={18} />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900">New Service</h3>
                                </div>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Vehicle Name *</label>
                                    <select
                                        value={form.vehicle}
                                        onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all appearance-none"
                                    >
                                        {vehicleList.map((v) => (
                                            <option key={v} value={v}>{v}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Issue / Service *</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.issue}
                                        onChange={(e) => setForm({ ...form, issue: e.target.value })}
                                        placeholder="e.g. Engine Issue, Oil Change"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Date *</label>
                                    <input
                                        type="date"
                                        required
                                        value={form.date}
                                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
                                    />
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <button type="submit" className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-orange-500/15">
                                        Create
                                    </button>
                                    <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Logs Table */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Log ID</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Vehicle</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Issue / Service</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Date</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Cost</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Status</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-3.5">
                                            <span className="text-sm font-bold text-gray-900">#{log.id}</span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <Wrench size={14} className="text-gray-400" />
                                                <span className="text-sm font-semibold text-gray-700">{log.vehicle}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className="text-sm text-gray-600">{log.issue}</span>
                                        </td>
                                        <td className="px-6 py-3.5 hidden md:table-cell">
                                            <span className="text-sm text-gray-500">{log.date}</span>
                                        </td>
                                        <td className="px-6 py-3.5 hidden md:table-cell">
                                            <span className="text-sm font-medium text-gray-700">
                                                {log.cost > 0 ? `₹${log.cost.toLocaleString()}` : '—'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${statusColors[log.status]}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${statusDot[log.status]}`} />
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-1">
                                                {log.status !== 'Completed' && (
                                                    <button
                                                        onClick={() => markComplete(log.id)}
                                                        title="Mark as Completed"
                                                        className="w-7 h-7 rounded-lg hover:bg-green-50 flex items-center justify-center text-gray-300 hover:text-green-500 transition-colors"
                                                    >
                                                        <CheckCircle2 size={15} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(log.id)}
                                                    className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
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
