'use client';

import { useState } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import {
    Plus,
    X,
    Fuel,
    Trash2,
    IndianRupee,
} from 'lucide-react';

/* ── Types ─────────────────────────────────────────────── */

type ExpenseStatus = 'Pending' | 'Approved' | 'Done';

interface Expense {
    id: number;
    tripId: number;
    driver: string;
    distance: number;
    fuelExpense: number;
    miscExpense: number;
    status: ExpenseStatus;
}

/* ── Mock Data ─────────────────────────────────────────── */

const driverList = [
    'Rahul Sharma',
    'Amit Patel',
    'Vikram Singh',
    'Suresh Kumar',
    'Deepak Yadav',
    'Manoj Tiwari',
];

const initialExpenses: Expense[] = [
    { id: 1, tripId: 321, driver: 'Rahul Sharma', distance: 1000, fuelExpense: 19000, miscExpense: 3000, status: 'Done' },
    { id: 2, tripId: 322, driver: 'Amit Patel', distance: 450, fuelExpense: 8500, miscExpense: 1200, status: 'Done' },
    { id: 3, tripId: 323, driver: 'Vikram Singh', distance: 680, fuelExpense: 12000, miscExpense: 2500, status: 'Approved' },
    { id: 4, tripId: 324, driver: 'Suresh Kumar', distance: 320, fuelExpense: 6200, miscExpense: 800, status: 'Pending' },
    { id: 5, tripId: 325, driver: 'Deepak Yadav', distance: 890, fuelExpense: 15500, miscExpense: 4000, status: 'Approved' },
    { id: 6, tripId: 326, driver: 'Manoj Tiwari', distance: 550, fuelExpense: 10800, miscExpense: 1500, status: 'Pending' },
];

const statusColors: Record<ExpenseStatus, string> = {
    Pending: 'bg-amber-50 text-amber-600',
    Approved: 'bg-blue-50 text-blue-600',
    Done: 'bg-green-50 text-green-600',
};

/* ── Component ─────────────────────────────────────────── */

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        tripId: 0,
        driver: driverList[0],
        fuelCost: 0,
        miscExpense: 0,
    });

    const totalFuel = expenses.reduce((s, e) => s + e.fuelExpense, 0);
    const totalMisc = expenses.reduce((s, e) => s + e.miscExpense, 0);
    const totalAll = totalFuel + totalMisc;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newExpense: Expense = {
            id: expenses.length + 1,
            tripId: form.tripId,
            driver: form.driver,
            distance: 0,
            fuelExpense: form.fuelCost,
            miscExpense: form.miscExpense,
            status: 'Pending',
        };
        setExpenses([newExpense, ...expenses]);
        setForm({ tripId: 0, driver: driverList[0], fuelCost: 0, miscExpense: 0 });
        setShowForm(false);
    };

    const handleDelete = (id: number) => {
        setExpenses(expenses.filter((e) => e.id !== id));
    };

    return (
        <>
            <TopBar title="Trip & Expense Logging" subtitle="Track fuel costs, miscellaneous expenses, and trip budgets" />

            <main className="p-6 space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Fuel size={18} />
                            </div>
                            <span className="text-sm text-gray-400 font-medium">Total Fuel Cost</span>
                        </div>
                        <div className="text-2xl font-extrabold text-gray-900">₹{totalFuel.toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                <IndianRupee size={18} />
                            </div>
                            <span className="text-sm text-gray-400 font-medium">Misc Expenses</span>
                        </div>
                        <div className="text-2xl font-extrabold text-gray-900">₹{totalMisc.toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                                <IndianRupee size={18} />
                            </div>
                            <span className="text-sm text-gray-400 font-medium">Total Expense</span>
                        </div>
                        <div className="text-2xl font-extrabold text-gray-900">₹{totalAll.toLocaleString()}</div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                        <span className="font-bold text-gray-700">{expenses.length}</span> expense records
                    </p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-orange-500/15"
                    >
                        <Plus size={16} /> Add an Expense
                    </button>
                </div>

                {/* New Expense Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <Fuel size={18} />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900">New Expense</h3>
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
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Trip ID *</label>
                                    <input
                                        type="number"
                                        required
                                        min={1}
                                        value={form.tripId || ''}
                                        onChange={(e) => setForm({ ...form, tripId: parseInt(e.target.value) || 0 })}
                                        placeholder="e.g. 321"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Driver *</label>
                                    <select
                                        value={form.driver}
                                        onChange={(e) => setForm({ ...form, driver: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all appearance-none"
                                    >
                                        {driverList.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Fuel Cost (₹) *</label>
                                        <input
                                            type="number"
                                            required
                                            min={0}
                                            value={form.fuelCost || ''}
                                            onChange={(e) => setForm({ ...form, fuelCost: parseInt(e.target.value) || 0 })}
                                            placeholder="e.g. 12000"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Misc Expense (₹)</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={form.miscExpense || ''}
                                            onChange={(e) => setForm({ ...form, miscExpense: parseInt(e.target.value) || 0 })}
                                            placeholder="e.g. 3000"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
                                        />
                                    </div>
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

                {/* Expense Table */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Trip ID</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Driver</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Distance</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Fuel Expense</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Misc. Expense</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Total</th>
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Status</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {expenses.map((exp) => (
                                    <tr key={exp.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-3.5">
                                            <span className="text-sm font-bold text-gray-900">#{exp.tripId}</span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                    {exp.driver.split(' ').map((n) => n[0]).join('')}
                                                </div>
                                                <span className="text-sm text-gray-700">{exp.driver}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 hidden md:table-cell">
                                            <span className="text-sm text-gray-500">{exp.distance > 0 ? `${exp.distance} km` : '—'}</span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className="text-sm font-medium text-gray-700">₹{exp.fuelExpense.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-3.5 hidden md:table-cell">
                                            <span className="text-sm text-gray-500">₹{exp.miscExpense.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className="text-sm font-bold text-gray-900">
                                                ₹{(exp.fuelExpense + exp.miscExpense).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${statusColors[exp.status]}`}>
                                                {exp.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <button
                                                onClick={() => handleDelete(exp.id)}
                                                className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={14} />
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
