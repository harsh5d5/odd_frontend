'use client';

import { useState, useMemo } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import {
    Plus,
    X,
    Truck,
    Pencil,
    Trash2,
    ChevronRight,
    ChevronLeft,
    Wrench,
    Route,
    Fuel,
    Calendar,
    Gauge,
    Package,
    ChevronDown,
    Search,
    Filter,
    ArrowUpDown,
} from 'lucide-react';

/* ── Types ─────────────────────────────────────────────── */

type VehicleStatus = 'Idle' | 'On Trip' | 'In Shop';

interface Vehicle {
    id: number;
    plate: string;
    model: string;
    type: string;
    year: number;
    capacity: string;
    capacityKg: number;
    odometer: number;
    status: VehicleStatus;
    lastService: string;
    assignedDriver: string;
    fuelCost: number;
    maintenanceCost: number;
}

/* ── Mock Data ─────────────────────────────────────────── */

const initialVehicles: Vehicle[] = [
    { id: 1, plate: 'MH 12 AB 1234', model: 'Tata Ace', type: 'Mini', year: 2022, capacity: '1 ton', capacityKg: 1000, odometer: 45000, status: 'Idle', lastService: '2026-01-15', assignedDriver: 'Rahul Sharma', fuelCost: 18000, maintenanceCost: 5500 },
    { id: 2, plate: 'MH 04 CD 5678', model: 'Ashok Leyland', type: 'Trailer', year: 2021, capacity: '10 ton', capacityKg: 10000, odometer: 120000, status: 'On Trip', lastService: '2026-02-01', assignedDriver: 'Amit Patel', fuelCost: 72000, maintenanceCost: 4500 },
    { id: 3, plate: 'GJ 01 EF 9012', model: 'Eicher Pro', type: 'Container', year: 2023, capacity: '7 ton', capacityKg: 7000, odometer: 32000, status: 'Idle', lastService: '2026-01-20', assignedDriver: '—', fuelCost: 48000, maintenanceCost: 3000 },
    { id: 4, plate: 'RJ 14 GH 3456', model: 'BharatBenz', type: 'Flatbed', year: 2020, capacity: '15 ton', capacityKg: 15000, odometer: 89000, status: 'In Shop', lastService: '2026-02-18', assignedDriver: '—', fuelCost: 42000, maintenanceCost: 17000 },
    { id: 5, plate: 'KA 05 IJ 7890', model: 'Mahindra Blazo', type: 'Tanker', year: 2022, capacity: '12 ton', capacityKg: 12000, odometer: 67000, status: 'On Trip', lastService: '2026-02-05', assignedDriver: 'Deepak Yadav', fuelCost: 65000, maintenanceCost: 8500 },
    { id: 6, plate: 'DL 08 KL 2345', model: 'Tata Prima', type: 'Trailer', year: 2019, capacity: '20 ton', capacityKg: 20000, odometer: 180000, status: 'Idle', lastService: '2026-01-28', assignedDriver: '—', fuelCost: 85000, maintenanceCost: 12000 },
    { id: 7, plate: 'UP 32 MN 6789', model: 'Tata Ace Gold', type: 'Mini', year: 2024, capacity: '1.5 ton', capacityKg: 1500, odometer: 8000, status: 'Idle', lastService: '2026-02-10', assignedDriver: '—', fuelCost: 5000, maintenanceCost: 0 },
    { id: 8, plate: 'MH 02 OP 1122', model: 'Ashok Leyland', type: 'Container', year: 2021, capacity: '9 ton', capacityKg: 9000, odometer: 105000, status: 'On Trip', lastService: '2026-01-22', assignedDriver: 'Vikram Singh', fuelCost: 58000, maintenanceCost: 6000 },
    { id: 9, plate: 'TN 07 QR 3344', model: 'Eicher 10.90', type: 'Trailer', year: 2023, capacity: '14 ton', capacityKg: 14000, odometer: 28000, status: 'Idle', lastService: '2026-02-12', assignedDriver: '—', fuelCost: 22000, maintenanceCost: 1500 },
    { id: 10, plate: 'AP 09 ST 5566', model: 'Tata 407', type: 'Mini', year: 2021, capacity: '2.5 ton', capacityKg: 2500, odometer: 78000, status: 'On Trip', lastService: '2026-01-30', assignedDriver: 'Suresh Kumar', fuelCost: 34000, maintenanceCost: 7200 },
    { id: 11, plate: 'HR 26 UV 7788', model: 'BharatBenz 1617', type: 'Container', year: 2020, capacity: '16 ton', capacityKg: 16000, odometer: 142000, status: 'In Shop', lastService: '2026-02-15', assignedDriver: '—', fuelCost: 78000, maintenanceCost: 21000 },
    { id: 12, plate: 'MP 20 WX 9900', model: 'Mahindra Furio', type: 'Flatbed', year: 2024, capacity: '8 ton', capacityKg: 8000, odometer: 12000, status: 'Idle', lastService: '2026-02-08', assignedDriver: '—', fuelCost: 9000, maintenanceCost: 0 },
    { id: 13, plate: 'WB 74 YZ 1122', model: 'Ashok Leyland Dost', type: 'Mini', year: 2022, capacity: '1.25 ton', capacityKg: 1250, odometer: 55000, status: 'On Trip', lastService: '2026-01-18', assignedDriver: 'Manoj Tiwari', fuelCost: 26000, maintenanceCost: 3800 },
    { id: 14, plate: 'CG 04 AB 3344', model: 'Tata Signa', type: 'Tanker', year: 2021, capacity: '18 ton', capacityKg: 18000, odometer: 97000, status: 'Idle', lastService: '2026-02-02', assignedDriver: '—', fuelCost: 56000, maintenanceCost: 9500 },
    { id: 15, plate: 'PB 10 CD 5566', model: 'Eicher Pro 3019', type: 'Trailer', year: 2020, capacity: '19 ton', capacityKg: 19000, odometer: 165000, status: 'On Trip', lastService: '2026-01-25', assignedDriver: 'Ravi Verma', fuelCost: 91000, maintenanceCost: 14000 },
    { id: 16, plate: 'OR 05 EF 7788', model: 'Tata LPT', type: 'Flatbed', year: 2023, capacity: '11 ton', capacityKg: 11000, odometer: 38000, status: 'Idle', lastService: '2026-02-14', assignedDriver: '—', fuelCost: 19000, maintenanceCost: 2000 },
    { id: 17, plate: 'JH 01 GH 9900', model: 'Mahindra Blazo X', type: 'Container', year: 2024, capacity: '13 ton', capacityKg: 13000, odometer: 6000, status: 'Idle', lastService: '—', assignedDriver: '—', fuelCost: 3000, maintenanceCost: 0 },
    { id: 18, plate: 'UK 07 IJ 1122', model: 'BharatBenz 2823', type: 'Tanker', year: 2019, capacity: '25 ton', capacityKg: 25000, odometer: 210000, status: 'In Shop', lastService: '2026-02-19', assignedDriver: '—', fuelCost: 120000, maintenanceCost: 32000 },
];

const vehicleTypes = ['Mini', 'Trailer', 'Container', 'Flatbed', 'Tanker'];

const statusColors: Record<VehicleStatus, string> = {
    Idle: 'bg-gray-100 text-gray-600',
    'On Trip': 'bg-primary/10 text-primary',
    'In Shop': 'bg-red-50 text-red-500',
};

const statusDot: Record<VehicleStatus, string> = {
    Idle: 'bg-gray-400',
    'On Trip': 'bg-primary',
    'In Shop': 'bg-red-500',
};

const allStatuses: VehicleStatus[] = ['Idle', 'On Trip', 'In Shop'];

/* ── Component ─────────────────────────────────────────── */

type SortKey = 'plate' | 'odometer' | 'capacityKg' | '';

const ITEMS_PER_PAGE = 5;

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
    const [showForm, setShowForm] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [statusDropdown, setStatusDropdown] = useState<number | null>(null);

    // Search, Filter, Sort
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<VehicleStatus | 'All'>('All');
    const [filterType, setFilterType] = useState<string>('All');
    const [sortKey, setSortKey] = useState<SortKey>('');
    const [sortAsc, setSortAsc] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const [form, setForm] = useState({
        plate: '',
        model: '',
        type: 'Mini',
        year: 2024,
        capacity: '',
        capacityKg: 0,
        odometer: 0,
    });

    /* ── Derived: filtered, sorted, paginated list ───── */

    const filteredVehicles = useMemo(() => {
        let list = [...vehicles];

        // Search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter((v) =>
                v.plate.toLowerCase().includes(q) || v.model.toLowerCase().includes(q)
            );
        }

        // Filter status
        if (filterStatus !== 'All') {
            list = list.filter((v) => v.status === filterStatus);
        }

        // Filter type
        if (filterType !== 'All') {
            list = list.filter((v) => v.type === filterType);
        }

        // Sort
        if (sortKey) {
            list.sort((a, b) => {
                const aVal = a[sortKey];
                const bVal = b[sortKey];
                if (typeof aVal === 'string') return sortAsc ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
                return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
            });
        }

        return list;
    }, [vehicles, searchQuery, filterStatus, filterType, sortKey, sortAsc]);

    const totalPages = Math.max(1, Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedVehicles = filteredVehicles.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE
    );
    const showStart = filteredVehicles.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1;
    const showEnd = Math.min(safePage * ITEMS_PER_PAGE, filteredVehicles.length);

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortAsc(!sortAsc);
        } else {
            setSortKey(key);
            setSortAsc(true);
        }
        setCurrentPage(1);
    };

    /* ── Form Handlers ─────────────────────────────────── */

    const openNewForm = () => {
        setEditingVehicle(null);
        setForm({ plate: '', model: '', type: 'Mini', year: 2024, capacity: '', capacityKg: 0, odometer: 0 });
        setShowForm(true);
    };

    const openEditForm = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle);
        setForm({
            plate: vehicle.plate,
            model: vehicle.model,
            type: vehicle.type,
            year: vehicle.year,
            capacity: vehicle.capacity,
            capacityKg: vehicle.capacityKg,
            odometer: vehicle.odometer,
        });
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingVehicle) {
            // Update existing
            setVehicles(
                vehicles.map((v) =>
                    v.id === editingVehicle.id
                        ? { ...v, plate: form.plate, model: form.model, type: form.type, year: form.year, capacity: form.capacity, capacityKg: form.capacityKg, odometer: form.odometer }
                        : v
                )
            );
            // Update detail panel if open
            if (selectedVehicle?.id === editingVehicle.id) {
                setSelectedVehicle({
                    ...selectedVehicle,
                    plate: form.plate,
                    model: form.model,
                    type: form.type,
                    year: form.year,
                    capacity: form.capacity,
                    capacityKg: form.capacityKg,
                    odometer: form.odometer,
                });
            }
        } else {
            // Create new
            const newVehicle: Vehicle = {
                id: Math.max(...vehicles.map((v) => v.id), 0) + 1,
                plate: form.plate,
                model: form.model,
                type: form.type,
                year: form.year,
                capacity: form.capacity,
                capacityKg: form.capacityKg,
                odometer: form.odometer,
                status: 'Idle',
                lastService: '—',
                assignedDriver: '—',
                fuelCost: 0,
                maintenanceCost: 0,
            };
            setVehicles([newVehicle, ...vehicles]);
        }

        setForm({ plate: '', model: '', type: 'Mini', year: 2024, capacity: '', capacityKg: 0, odometer: 0 });
        setShowForm(false);
        setEditingVehicle(null);
    };

    const handleDelete = (id: number) => {
        setVehicles(vehicles.filter((v) => v.id !== id));
        if (selectedVehicle?.id === id) setSelectedVehicle(null);
    };

    /* ── Status Change ─────────────────────────────────── */

    const changeStatus = (id: number, newStatus: VehicleStatus) => {
        setVehicles(
            vehicles.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
        );
        if (selectedVehicle?.id === id) {
            setSelectedVehicle({ ...selectedVehicle, status: newStatus });
        }
        setStatusDropdown(null);
    };

    return (
        <>
            <TopBar title="Vehicle Registry" subtitle="Asset Management — Register and manage your fleet" />

            <main className="p-6">
                <div className="flex gap-6">
                    {/* ── Left: Table ─────────────────────────────── */}
                    <div className={`flex-1 space-y-6 transition-all duration-300 ${selectedVehicle ? 'max-w-[calc(100%-380px)]' : ''}`}>
                        {/* Search & Filter Bar */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-400">
                                    <span className="font-bold text-gray-700">{filteredVehicles.length}</span> of {vehicles.length} vehicles
                                </p>
                                <button
                                    onClick={openNewForm}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-orange-500/15"
                                >
                                    <Plus size={16} /> New Vehicle
                                </button>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {/* Search */}
                                <div className="relative flex-1 min-w-[180px]">
                                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type="text"
                                        placeholder="Search plate or model..."
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                        className="w-full pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
                                    />
                                </div>
                                {/* Filter: Status */}
                                <div className="relative">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => { setFilterStatus(e.target.value as VehicleStatus | 'All'); setCurrentPage(1); }}
                                        className="pl-8 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-medium text-gray-600 focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="All">All Status</option>
                                        {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                {/* Filter: Type */}
                                <div className="relative">
                                    <select
                                        value={filterType}
                                        onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
                                        className="pl-8 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-medium text-gray-600 focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="All">All Types</option>
                                        {vehicleTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    <Truck size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                {/* Sort */}
                                <div className="flex items-center gap-1">
                                    <button onClick={() => toggleSort('plate')} className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${sortKey === 'plate' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white border-gray-100 text-gray-500 hover:border-primary/20'}`}>
                                        <ArrowUpDown size={12} className="inline mr-1" />Plate {sortKey === 'plate' ? (sortAsc ? '↑' : '↓') : ''}
                                    </button>
                                    <button onClick={() => toggleSort('odometer')} className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${sortKey === 'odometer' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white border-gray-100 text-gray-500 hover:border-primary/20'}`}>
                                        <ArrowUpDown size={12} className="inline mr-1" />KM {sortKey === 'odometer' ? (sortAsc ? '↑' : '↓') : ''}
                                    </button>
                                    <button onClick={() => toggleSort('capacityKg')} className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${sortKey === 'capacityKg' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white border-gray-100 text-gray-500 hover:border-primary/20'}`}>
                                        <ArrowUpDown size={12} className="inline mr-1" />Capacity {sortKey === 'capacityKg' ? (sortAsc ? '↑' : '↓') : ''}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Table */}
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">No</th>
                                            <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Plate</th>
                                            <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Model</th>
                                            <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Type</th>
                                            <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">Capacity</th>
                                            <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">Odometer</th>
                                            <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Status</th>
                                            <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {paginatedVehicles.map((vehicle) => (
                                            <tr
                                                key={vehicle.id}
                                                onClick={() => setSelectedVehicle(vehicle)}
                                                className={`hover:bg-gray-50/50 transition-colors group cursor-pointer ${selectedVehicle?.id === vehicle.id ? 'bg-primary/5' : ''
                                                    }`}
                                            >
                                                <td className="px-6 py-3.5">
                                                    <span className="text-sm font-bold text-gray-900">{vehicle.id}</span>
                                                </td>
                                                <td className="px-6 py-3.5">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${statusColors[vehicle.status]}`}>
                                                            <Truck size={14} />
                                                        </div>
                                                        <span className="text-sm font-semibold text-gray-800">{vehicle.plate}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3.5 hidden md:table-cell">
                                                    <div>
                                                        <span className="text-sm text-gray-700">{vehicle.model}</span>
                                                        <span className="text-xs text-gray-400 ml-1">({vehicle.year})</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3.5">
                                                    <span className="text-sm text-gray-500">{vehicle.type}</span>
                                                </td>
                                                <td className="px-6 py-3.5 hidden lg:table-cell">
                                                    <span className="text-sm font-medium text-gray-700">{vehicle.capacity}</span>
                                                </td>
                                                <td className="px-6 py-3.5 hidden lg:table-cell">
                                                    <span className="text-sm text-gray-500">{vehicle.odometer.toLocaleString()} km</span>
                                                </td>
                                                <td className="px-6 py-3.5">
                                                    {/* Status with dropdown toggle */}
                                                    <div className="relative">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setStatusDropdown(statusDropdown === vehicle.id ? null : vehicle.id);
                                                            }}
                                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${statusColors[vehicle.status]} hover:brightness-95 transition-all`}
                                                        >
                                                            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[vehicle.status]}`} />
                                                            {vehicle.status}
                                                            <ChevronDown size={10} className="ml-0.5" />
                                                        </button>

                                                        {/* Dropdown */}
                                                        {statusDropdown === vehicle.id && (
                                                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1 min-w-[120px]">
                                                                {allStatuses.map((s) => (
                                                                    <button
                                                                        key={s}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            changeStatus(vehicle.id, s);
                                                                        }}
                                                                        className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 ${vehicle.status === s ? 'text-primary font-bold' : 'text-gray-600'
                                                                            }`}
                                                                    >
                                                                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot[s]}`} />
                                                                        {s}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3.5">
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openEditForm(vehicle);
                                                            }}
                                                            className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center text-gray-300 hover:text-blue-500 transition-colors"
                                                        >
                                                            <Pencil size={14} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(vehicle.id);
                                                            }}
                                                            className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors"
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

                        {/* Pagination */}
                        <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 px-6 py-3">
                            <span className="text-xs text-gray-400 font-medium">
                                Showing <span className="font-bold text-gray-700">{showStart}–{showEnd}</span> of <span className="font-bold text-gray-700">{filteredVehicles.length}</span>
                            </span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                                    disabled={safePage <= 1}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${page === safePage
                                                ? 'bg-primary text-white shadow-md shadow-orange-500/15'
                                                : 'text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                                    disabled={safePage >= totalPages}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Detail Panel ────────────────────── */}
                    {selectedVehicle && (
                        <div className="w-[360px] shrink-0">
                            <div className="bg-white rounded-2xl border border-gray-100 sticky top-20 overflow-hidden">
                                {/* Header */}
                                <div className="relative p-6 pb-4 border-b border-gray-50">
                                    <button
                                        onClick={() => setSelectedVehicle(null)}
                                        className="absolute top-4 right-4 w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>

                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                        <Truck size={24} />
                                    </div>
                                    <h3 className="text-lg font-extrabold text-gray-900">{selectedVehicle.plate}</h3>
                                    <p className="text-sm text-gray-400">
                                        {selectedVehicle.model} · {selectedVehicle.year} · {selectedVehicle.type}
                                    </p>

                                    <div className="mt-3">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${statusColors[selectedVehicle.status]}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[selectedVehicle.status]}`} />
                                            {selectedVehicle.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Specs Grid */}
                                <div className="p-6 space-y-4">
                                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Vehicle Details</h4>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-gray-50 rounded-xl p-3">
                                            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                                                <Package size={12} />
                                                <span className="text-[10px] font-bold uppercase">Capacity</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">{selectedVehicle.capacity}</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3">
                                            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                                                <Gauge size={12} />
                                                <span className="text-[10px] font-bold uppercase">Odometer</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">{selectedVehicle.odometer.toLocaleString()} km</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3">
                                            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                                                <Calendar size={12} />
                                                <span className="text-[10px] font-bold uppercase">Last Service</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">{selectedVehicle.lastService}</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3">
                                            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                                                <Route size={12} />
                                                <span className="text-[10px] font-bold uppercase">Driver</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">{selectedVehicle.assignedDriver}</span>
                                        </div>
                                    </div>

                                    {/* Cost Summary */}
                                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider pt-2">Cost Summary</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Fuel size={14} className="text-primary" />
                                                Fuel Cost
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">₹{selectedVehicle.fuelCost.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Wrench size={14} className="text-amber-500" />
                                                Maintenance
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">₹{selectedVehicle.maintenanceCost.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 px-3 bg-primary/5 rounded-xl border border-primary/10">
                                            <span className="text-sm font-bold text-gray-700">Total Cost</span>
                                            <span className="text-sm font-extrabold text-primary">
                                                ₹{(selectedVehicle.fuelCost + selectedVehicle.maintenanceCost).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={() => openEditForm(selectedVehicle)}
                                            className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Pencil size={14} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(selectedVehicle.id)}
                                            className="py-2.5 px-4 bg-red-50 text-red-500 rounded-xl text-sm font-bold hover:bg-red-100 transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* ── Add / Edit Modal ──────────────────────────── */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Truck size={18} />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">
                                    {editingVehicle ? 'Edit Vehicle' : 'New Vehicle Registration'}
                                </h3>
                            </div>
                            <button
                                onClick={() => { setShowForm(false); setEditingVehicle(null); }}
                                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">License Plate *</label>
                                <input type="text" required value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} placeholder="e.g. MH 12 AB 1234" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Model *</label>
                                    <input type="text" required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="e.g. Tata Ace" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Year</label>
                                    <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Type *</label>
                                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all appearance-none">
                                        {vehicleTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Max Payload *</label>
                                    <input type="text" required value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} placeholder="e.g. 5 ton" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Capacity (kg)</label>
                                    <input type="number" value={form.capacityKg || ''} onChange={(e) => setForm({ ...form, capacityKg: parseInt(e.target.value) || 0 })} placeholder="e.g. 5000" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Odometer (km)</label>
                                    <input type="number" value={form.odometer || ''} onChange={(e) => setForm({ ...form, odometer: parseInt(e.target.value) || 0 })} placeholder="e.g. 45000" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <button type="submit" className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-orange-500/15">
                                    {editingVehicle ? 'Save Changes' : 'Save Vehicle'}
                                </button>
                                <button type="button" onClick={() => { setShowForm(false); setEditingVehicle(null); }} className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
