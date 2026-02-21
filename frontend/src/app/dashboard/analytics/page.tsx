'use client';

import TopBar from '@/components/dashboard/TopBar';
import {
    Fuel,
    TrendingUp,
    Gauge,
    Truck,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';

/* ── Mock Data ─────────────────────────────────────────── */

const kpis = [
    { label: 'Total Fuel Cost', value: '₹2,60,000', change: '+8.2%', trend: 'up' as const, icon: Fuel, color: 'bg-primary/10 text-primary' },
    { label: 'Fleet ROI', value: '+12.5%', change: '+2.3%', trend: 'up' as const, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
    { label: 'Utilization Rate', value: '82%', change: '+5%', trend: 'up' as const, icon: Gauge, color: 'bg-blue-50 text-blue-600' },
];

const fuelTrend = [
    { month: 'Sep', value: 42 },
    { month: 'Oct', value: 38 },
    { month: 'Nov', value: 55 },
    { month: 'Dec', value: 48 },
    { month: 'Jan', value: 62 },
    { month: 'Feb', value: 45 },
];

const costliestVehicles = [
    { plate: 'DL 08 KL 2345', model: 'Tata Prima', totalCost: 85000 },
    { plate: 'MH 04 CD 5678', model: 'Ashok Leyland', totalCost: 72000 },
    { plate: 'KA 05 IJ 7890', model: 'Mahindra Blazo', totalCost: 65000 },
    { plate: 'GJ 01 EF 9012', model: 'Eicher Pro', totalCost: 48000 },
    { plate: 'RJ 14 GH 3456', model: 'BharatBenz', totalCost: 42000 },
];

const financialSummary = [
    { month: 'October', revenue: 520000, fuel: 38000, maintenance: 15000, net: 467000 },
    { month: 'November', revenue: 580000, fuel: 55000, maintenance: 22000, net: 503000 },
    { month: 'December', revenue: 490000, fuel: 48000, maintenance: 18000, net: 424000 },
    { month: 'January', revenue: 610000, fuel: 62000, maintenance: 28000, net: 520000 },
    { month: 'February', revenue: 540000, fuel: 45000, maintenance: 12000, net: 483000 },
];

const maxFuel = Math.max(...fuelTrend.map((d) => d.value));
const maxCost = Math.max(...costliestVehicles.map((v) => v.totalCost));

/* ── Component ─────────────────────────────────────────── */

export default function AnalyticsPage() {
    return (
        <>
            <TopBar title="Operational Analytics" subtitle="Fuel efficiency, fleet ROI, and financial insights" />

            <main className="p-6 space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {kpis.map((kpi, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${kpi.color}`}>
                                    <kpi.icon size={20} />
                                </div>
                                <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-green-50 text-green-600">
                                    {kpi.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {kpi.change}
                                </div>
                            </div>
                            <div className="text-3xl font-extrabold text-gray-900 mb-1 group-hover:text-primary transition-colors">{kpi.value}</div>
                            <div className="text-sm text-gray-400 font-medium">{kpi.label}</div>
                        </div>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Fuel Efficiency Trend (Bar Chart) */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-base font-bold text-gray-900">Fuel Efficiency Trend</h3>
                                <p className="text-xs text-gray-400 mt-0.5">Monthly fuel cost (₹ thousands)</p>
                            </div>
                            <BarChart3 size={18} className="text-gray-300" />
                        </div>
                        <div className="flex items-end gap-3 h-48">
                            {fuelTrend.map((item, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <span className="text-xs font-bold text-gray-500">₹{item.value}k</span>
                                    <div className="w-full bg-gray-50 rounded-xl overflow-hidden" style={{ height: '160px' }}>
                                        <div
                                            className="w-full bg-gradient-to-t from-primary to-orange-300 rounded-xl transition-all duration-500 hover:from-primary hover:to-primary"
                                            style={{
                                                height: `${(item.value / maxFuel) * 100}%`,
                                                marginTop: `${100 - (item.value / maxFuel) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-[11px] font-medium text-gray-400">{item.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top 5 Costliest Vehicles */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-base font-bold text-gray-900">Top 5 Costliest Vehicles</h3>
                                <p className="text-xs text-gray-400 mt-0.5">Fuel + Maintenance combined</p>
                            </div>
                            <Truck size={18} className="text-gray-300" />
                        </div>
                        <div className="space-y-4">
                            {costliestVehicles.map((vehicle, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-gray-400 w-4 text-right">#{i + 1}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <div>
                                                <span className="text-sm font-semibold text-gray-800">{vehicle.plate}</span>
                                                <span className="text-xs text-gray-400 ml-2">{vehicle.model}</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">₹{vehicle.totalCost.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${i === 0 ? 'bg-red-400' : i === 1 ? 'bg-orange-400' : 'bg-primary/60'
                                                    }`}
                                                style={{ width: `${(vehicle.totalCost / maxCost) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Financial Summary Table */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                        <div>
                            <h3 className="text-base font-bold text-gray-900">Financial Summary</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Monthly revenue vs. costs breakdown</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Month</th>
                                    <th className="text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Revenue</th>
                                    <th className="text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Fuel Cost</th>
                                    <th className="text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Maintenance</th>
                                    <th className="text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Net Profit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {financialSummary.map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-3.5">
                                            <span className="text-sm font-bold text-gray-900">{row.month}</span>
                                        </td>
                                        <td className="px-6 py-3.5 text-right">
                                            <span className="text-sm font-medium text-gray-700">₹{row.revenue.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-3.5 text-right">
                                            <span className="text-sm text-red-500 font-medium">-₹{row.fuel.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-3.5 text-right hidden md:table-cell">
                                            <span className="text-sm text-amber-600 font-medium">-₹{row.maintenance.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-3.5 text-right">
                                            <span className="text-sm font-bold text-green-600">₹{row.net.toLocaleString()}</span>
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
