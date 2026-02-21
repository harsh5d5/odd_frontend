'use client';

import { useState, useMemo } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import {
    Plus,
    X,
    MapPin,
    ArrowRight,
    Truck,
    Pencil,
    Trash2,
    ChevronLeft,
    Search,
    Filter,
    ArrowUpDown,
    Ban,
    Play,
    LayoutGrid,
    List,
    Package,
    Fuel,
    User,
    Calendar,
    AlertTriangle,
    ChevronRight,
} from 'lucide-react';

/* ── Types ─────────────────────────────────────────────── */

type TripStatus = 'Scheduled' | 'On Way' | 'Delivered' | 'Done' | 'Cancelled';

interface Trip {
    id: number;
    vehicle: string;
    driver: string;
    origin: string;
    destination: string;
    cargoKg: number;
    fuelEstimate: number;
    status: TripStatus;
    scheduledDate: string;
    departedDate: string;
    deliveredDate: string;
}

/* ── Mock Data ─────────────────────────────────────────── */

const availableVehicles = [
    { plate: 'MH 12 AB 1234', model: 'Tata Ace', capacityKg: 1000, status: 'Idle' },
    { plate: 'GJ 01 EF 9012', model: 'Eicher Pro', capacityKg: 7000, status: 'Idle' },
    { plate: 'DL 08 KL 2345', model: 'Tata Prima', capacityKg: 20000, status: 'Idle' },
    { plate: 'UP 32 MN 6789', model: 'Tata Ace Gold', capacityKg: 1500, status: 'Idle' },
    { plate: 'TN 07 QR 3344', model: 'Eicher 10.90', capacityKg: 14000, status: 'Idle' },
    { plate: 'MP 20 WX 9900', model: 'Mahindra Furio', capacityKg: 8000, status: 'Idle' },
    { plate: 'MH 04 CD 5678', model: 'Ashok Leyland', capacityKg: 10000, status: 'On Trip' },
    { plate: 'RJ 14 GH 3456', model: 'BharatBenz', capacityKg: 15000, status: 'In Shop' },
];

const availableDrivers = [
    { name: 'Rahul Sharma', licenseExpiry: '2027-06-15', valid: true },
    { name: 'Amit Patel', licenseExpiry: '2025-12-01', valid: false },
    { name: 'Vikram Singh', licenseExpiry: '2026-01-10', valid: false },
    { name: 'Deepak Yadav', licenseExpiry: '2028-03-05', valid: true },
    { name: 'Manoj Tiwari', licenseExpiry: '2025-11-30', valid: false },
    { name: 'Ravi Verma', licenseExpiry: '2027-02-01', valid: true },
    { name: 'Suresh Kumar', licenseExpiry: '2027-08-20', valid: true },
];

// Pre-check validity
const now = new Date();
const validDrivers = availableDrivers.filter(d => new Date(d.licenseExpiry) > now);
const idleVehicles = availableVehicles.filter(v => v.status === 'Idle');

const initialTrips: Trip[] = [
    { id: 401, vehicle: 'MH 04 CD 5678', driver: 'Amit Patel', origin: 'Mumbai', destination: 'Pune', cargoKg: 8500, fuelEstimate: 3200, status: 'On Way', scheduledDate: '2026-02-19', departedDate: '2026-02-20', deliveredDate: '' },
    { id: 402, vehicle: 'KA 05 IJ 7890', driver: 'Deepak Yadav', origin: 'Bangalore', destination: 'Chennai', cargoKg: 9800, fuelEstimate: 5400, status: 'Delivered', scheduledDate: '2026-02-17', departedDate: '2026-02-18', deliveredDate: '2026-02-20' },
    { id: 403, vehicle: 'DL 08 KL 2345', driver: 'Rahul Sharma', origin: 'Delhi', destination: 'Jaipur', cargoKg: 15000, fuelEstimate: 4800, status: 'Scheduled', scheduledDate: '2026-02-22', departedDate: '', deliveredDate: '' },
    { id: 404, vehicle: 'MH 12 AB 1234', driver: 'Ravi Verma', origin: 'Nagpur', destination: 'Hyderabad', cargoKg: 900, fuelEstimate: 7200, status: 'Done', scheduledDate: '2026-02-14', departedDate: '2026-02-15', deliveredDate: '2026-02-17' },
    { id: 405, vehicle: 'GJ 01 EF 9012', driver: 'Suresh Kumar', origin: 'Ahmedabad', destination: 'Surat', cargoKg: 5200, fuelEstimate: 2100, status: 'Scheduled', scheduledDate: '2026-02-23', departedDate: '', deliveredDate: '' },
    { id: 406, vehicle: 'MH 02 OP 1122', driver: 'Vikram Singh', origin: 'Pune', destination: 'Mumbai', cargoKg: 6000, fuelEstimate: 3000, status: 'On Way', scheduledDate: '2026-02-20', departedDate: '2026-02-21', deliveredDate: '' },
    { id: 407, vehicle: 'UP 32 MN 6789', driver: 'Manoj Tiwari', origin: 'Lucknow', destination: 'Kanpur', cargoKg: 1200, fuelEstimate: 1800, status: 'Done', scheduledDate: '2026-02-12', departedDate: '2026-02-13', deliveredDate: '2026-02-14' },
    { id: 408, vehicle: 'TN 07 QR 3344', driver: 'Deepak Yadav', origin: 'Chennai', destination: 'Coimbatore', cargoKg: 11000, fuelEstimate: 4000, status: 'Scheduled', scheduledDate: '2026-02-24', departedDate: '', deliveredDate: '' },
    { id: 409, vehicle: 'WB 74 YZ 1122', driver: 'Rahul Sharma', origin: 'Kolkata', destination: 'Patna', cargoKg: 1100, fuelEstimate: 5600, status: 'On Way', scheduledDate: '2026-02-18', departedDate: '2026-02-19', deliveredDate: '' },
    { id: 410, vehicle: 'PB 10 CD 5566', driver: 'Ravi Verma', origin: 'Chandigarh', destination: 'Delhi', cargoKg: 16000, fuelEstimate: 3300, status: 'Cancelled', scheduledDate: '2026-02-16', departedDate: '', deliveredDate: '' },
];

const statusColors: Record<TripStatus, string> = {
    Scheduled: 'bg-blue-50 text-blue-600',
    'On Way': 'bg-amber-50 text-amber-600',
    Delivered: 'bg-green-50 text-green-600',
    Done: 'bg-gray-100 text-gray-500',
    Cancelled: 'bg-red-50 text-red-500',
};

const statusDot: Record<TripStatus, string> = {
    Scheduled: 'bg-blue-500',
    'On Way': 'bg-amber-500',
    Delivered: 'bg-green-500',
    Done: 'bg-gray-400',
    Cancelled: 'bg-red-500',
};

const pipeline: TripStatus[] = ['Scheduled', 'On Way', 'Delivered', 'Done'];
const allStatuses: TripStatus[] = ['Scheduled', 'On Way', 'Delivered', 'Done', 'Cancelled'];

type SortKey = 'id' | 'fuelEstimate' | 'cargoKg' | '';
type ViewMode = 'table' | 'kanban';
const ITEMS_PER_PAGE = 5;

/* ── Component ─────────────────────────────────────────── */

export default function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>(initialTrips);
    const [showForm, setShowForm] = useState(false);
    const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('table');

    // Search, Filter, Sort
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<TripStatus | 'All'>('All');
    const [sortKey, setSortKey] = useState<SortKey>('');
    const [sortAsc, setSortAsc] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // Form
    const [form, setForm] = useState({
        vehicle: '',
        driver: '',
        origin: '',
        destination: '',
        cargoKg: 0,
        fuelEstimate: 0,
    });
    const [loadError, setLoadError] = useState('');

    /* ── Derived List ──────────────────────────────────── */

    const filteredTrips = useMemo(() => {
        let list = [...trips];
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter((t) =>
                t.vehicle.toLowerCase().includes(q) ||
                t.driver.toLowerCase().includes(q) ||
                t.origin.toLowerCase().includes(q) ||
                t.destination.toLowerCase().includes(q)
            );
        }
        if (filterStatus !== 'All') {
            list = list.filter((t) => t.status === filterStatus);
        }
        if (sortKey) {
            list.sort((a, b) => {
                const aVal = a[sortKey] as number;
                const bVal = b[sortKey] as number;
                return sortAsc ? aVal - bVal : bVal - aVal;
            });
        }
        return list;
    }, [trips, searchQuery, filterStatus, sortKey, sortAsc]);

    const totalPages = Math.max(1, Math.ceil(filteredTrips.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedTrips = filteredTrips.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);
    const showStart = filteredTrips.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1;
    const showEnd = Math.min(safePage * ITEMS_PER_PAGE, filteredTrips.length);

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) setSortAsc(!sortAsc);
        else { setSortKey(key); setSortAsc(true); }
        setCurrentPage(1);
    };

    /* ── Form Handlers ─────────────────────────────────── */

    const openNewForm = () => {
        setEditingTrip(null);
        setForm({ vehicle: idleVehicles[0]?.plate || '', driver: validDrivers[0]?.name || '', origin: '', destination: '', cargoKg: 0, fuelEstimate: 0 });
        setLoadError('');
        setShowForm(true);
    };

    const openEditForm = (trip: Trip) => {
        setEditingTrip(trip);
        setForm({
            vehicle: trip.vehicle,
            driver: trip.driver,
            origin: trip.origin,
            destination: trip.destination,
            cargoKg: trip.cargoKg,
            fuelEstimate: trip.fuelEstimate,
        });
        setLoadError('');
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Capacity check
        const selected = availableVehicles.find((v) => v.plate === form.vehicle);
        if (selected && form.cargoKg > selected.capacityKg) {
            setLoadError(`Overloaded! Max capacity for ${selected.model} is ${selected.capacityKg} kg.`);
            return;
        }
        setLoadError('');

        if (editingTrip) {
            setTrips(trips.map((t) =>
                t.id === editingTrip.id
                    ? { ...t, vehicle: form.vehicle, driver: form.driver, origin: form.origin, destination: form.destination, cargoKg: form.cargoKg, fuelEstimate: form.fuelEstimate }
                    : t
            ));
            if (selectedTrip?.id === editingTrip.id) {
                setSelectedTrip({ ...selectedTrip, vehicle: form.vehicle, driver: form.driver, origin: form.origin, destination: form.destination, cargoKg: form.cargoKg, fuelEstimate: form.fuelEstimate });
            }
        } else {
            const newTrip: Trip = {
                id: Math.max(...trips.map((t) => t.id), 0) + 1,
                vehicle: form.vehicle,
                driver: form.driver,
                origin: form.origin,
                destination: form.destination,
                cargoKg: form.cargoKg,
                fuelEstimate: form.fuelEstimate,
                status: 'Scheduled',
                scheduledDate: new Date().toISOString().split('T')[0],
                departedDate: '',
                deliveredDate: '',
            };
            setTrips([newTrip, ...trips]);
        }
        setShowForm(false);
        setEditingTrip(null);
    };

    const advanceStatus = (id: number) => {
        setTrips(trips.map((t) => {
            if (t.id !== id) return t;
            const idx = pipeline.indexOf(t.status);
            if (idx < 0 || idx >= pipeline.length - 1) return t;
            const next = pipeline[idx + 1];
            const today = new Date().toISOString().split('T')[0];
            return {
                ...t,
                status: next,
                departedDate: next === 'On Way' ? today : t.departedDate,
                deliveredDate: next === 'Delivered' ? today : t.deliveredDate,
            };
        }));
    };

    const cancelTrip = (id: number) => {
        setTrips(trips.map((t) => t.id === id ? { ...t, status: 'Cancelled' as TripStatus } : t));
        if (selectedTrip?.id === id) setSelectedTrip({ ...selectedTrip!, status: 'Cancelled' });
    };

    const handleDelete = (id: number) => {
        setTrips(trips.filter((t) => t.id !== id));
        if (selectedTrip?.id === id) setSelectedTrip(null);
    };

    /* ── (Pipeline rendered inline in table rows and kanban) ── */

    /* ── Kanban Card ────────────────────────────────────── */

    const KanbanCard = ({ trip }: { trip: Trip }) => (
        <div
            onClick={() => setSelectedTrip(trip)}
            className={`bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group ${selectedTrip?.id === trip.id ? 'ring-2 ring-primary/20' : ''
                }`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900">#{trip.id}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {trip.status === 'Scheduled' && (
                        <button onClick={(e) => { e.stopPropagation(); openEditForm(trip); }} className="w-5 h-5 rounded flex items-center justify-center text-gray-300 hover:text-blue-500"><Pencil size={10} /></button>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(trip.id); }} className="w-5 h-5 rounded flex items-center justify-center text-gray-300 hover:text-red-500"><Trash2 size={10} /></button>
                </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                <MapPin size={10} className="text-green-500" />
                <span className="truncate">{trip.origin}</span>
                <ArrowRight size={10} className="text-gray-300 shrink-0" />
                <MapPin size={10} className="text-red-500" />
                <span className="truncate">{trip.destination}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span className="flex items-center gap-0.5"><Truck size={10} />{trip.vehicle.split(' ').slice(0, 3).join(' ')}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5"><Package size={10} />{trip.cargoKg}kg</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400">
                <User size={10} /> {trip.driver}
            </div>
            {trip.status !== 'Done' && trip.status !== 'Cancelled' && (
                <button
                    onClick={(e) => { e.stopPropagation(); advanceStatus(trip.id); }}
                    className="w-full mt-3 py-1.5 bg-primary/10 text-primary rounded-lg text-[10px] font-bold hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                >
                    <Play size={10} /> Advance → {pipeline[pipeline.indexOf(trip.status) + 1]}
                </button>
            )}
        </div>
    );

    /* ── Selected vehicle capacity for form ────────────── */
    const selectedVehicleCapacity = availableVehicles.find(v => v.plate === form.vehicle)?.capacityKg || 0;

    return (
        <>
            <TopBar title="Trip Dispatcher" subtitle="Schedule trips, monitor cargo, and track status pipelines" />

            <main className="p-6">
                <div className="flex gap-6">
                    {/* ── Left: Main Content ─────────────────────── */}
                    <div className={`flex-1 space-y-5 transition-all duration-300 ${selectedTrip ? 'max-w-[calc(100%-380px)]' : ''}`}>

                        {/* Action + Search Bar */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-400">
                                    <span className="font-bold text-gray-700">{filteredTrips.length}</span> of {trips.length} trips
                                </p>
                                <div className="flex items-center gap-2">
                                    {/* View Toggle */}
                                    <div className="flex items-center bg-white border border-gray-100 rounded-xl overflow-hidden">
                                        <button onClick={() => setViewMode('table')} className={`px-3 py-2 text-xs font-medium transition-all ${viewMode === 'table' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'}`}>
                                            <List size={14} />
                                        </button>
                                        <button onClick={() => setViewMode('kanban')} className={`px-3 py-2 text-xs font-medium transition-all ${viewMode === 'kanban' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'}`}>
                                            <LayoutGrid size={14} />
                                        </button>
                                    </div>
                                    <button onClick={openNewForm} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-orange-500/15">
                                        <Plus size={16} /> Dispatch Trip
                                    </button>
                                </div>
                            </div>

                            {/* Search + Filters */}
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="relative flex-1 min-w-[180px]">
                                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type="text"
                                        placeholder="Search vehicle, driver, or city..."
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                        className="w-full pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => { setFilterStatus(e.target.value as TripStatus | 'All'); setCurrentPage(1); }}
                                        className="pl-8 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-medium text-gray-600 focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="All">All Status</option>
                                        {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => toggleSort('id')} className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${sortKey === 'id' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white border-gray-100 text-gray-500 hover:border-primary/20'}`}>
                                        <ArrowUpDown size={12} className="inline mr-1" />Trip # {sortKey === 'id' ? (sortAsc ? '↑' : '↓') : ''}
                                    </button>
                                    <button onClick={() => toggleSort('cargoKg')} className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${sortKey === 'cargoKg' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white border-gray-100 text-gray-500 hover:border-primary/20'}`}>
                                        <ArrowUpDown size={12} className="inline mr-1" />Cargo {sortKey === 'cargoKg' ? (sortAsc ? '↑' : '↓') : ''}
                                    </button>
                                    <button onClick={() => toggleSort('fuelEstimate')} className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${sortKey === 'fuelEstimate' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white border-gray-100 text-gray-500 hover:border-primary/20'}`}>
                                        <ArrowUpDown size={12} className="inline mr-1" />Fuel {sortKey === 'fuelEstimate' ? (sortAsc ? '↑' : '↓') : ''}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ── Table View ──────────────────────────── */}
                        {viewMode === 'table' && (
                            <>
                                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-50/50">
                                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Trip</th>
                                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Route</th>
                                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Vehicle</th>
                                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Driver</th>
                                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Cargo</th>
                                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Pipeline</th>
                                                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {paginatedTrips.map((trip) => (
                                                    <tr
                                                        key={trip.id}
                                                        onClick={() => setSelectedTrip(trip)}
                                                        className={`hover:bg-gray-50/50 transition-colors group cursor-pointer ${selectedTrip?.id === trip.id ? 'bg-primary/5' : ''}`}
                                                    >
                                                        <td className="px-5 py-3.5">
                                                            <span className="text-sm font-bold text-gray-900">#{trip.id}</span>
                                                        </td>
                                                        <td className="px-5 py-3.5">
                                                            <div className="flex items-center gap-1.5 text-sm">
                                                                <MapPin size={12} className="text-green-500 shrink-0" />
                                                                <span className="text-gray-700 font-medium">{trip.origin}</span>
                                                                <ArrowRight size={12} className="text-gray-300 shrink-0" />
                                                                <MapPin size={12} className="text-red-500 shrink-0" />
                                                                <span className="text-gray-700 font-medium">{trip.destination}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                                            <span className="text-sm text-gray-600">{trip.vehicle}</span>
                                                        </td>
                                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                                            <span className="text-sm text-gray-600">{trip.driver}</span>
                                                        </td>
                                                        <td className="px-5 py-3.5 hidden lg:table-cell">
                                                            <span className="text-sm text-gray-500">{trip.cargoKg.toLocaleString()} kg</span>
                                                        </td>
                                                        <td className="px-5 py-3.5">
                                                            {/* Status Pipeline */}
                                                            {trip.status === 'Cancelled' ? (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-red-50 text-red-500">
                                                                    <Ban size={11} /> Cancelled
                                                                </span>
                                                            ) : (
                                                                <div className="flex items-center gap-0.5">
                                                                    {pipeline.map((step, i) => {
                                                                        const idx = pipeline.indexOf(trip.status);
                                                                        return (
                                                                            <div key={step} className="flex items-center gap-0.5">
                                                                                <div
                                                                                    className={`w-2.5 h-2.5 rounded-full border-2 transition-all ${i <= idx ? 'bg-primary border-primary' : 'bg-white border-gray-200'
                                                                                        }`}
                                                                                    title={step}
                                                                                />
                                                                                {i < pipeline.length - 1 && (
                                                                                    <div className={`w-3 h-0.5 ${i < idx ? 'bg-primary' : 'bg-gray-200'}`} />
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                    <span className={`ml-1 text-[10px] font-bold ${trip.status === 'Done' ? 'text-green-600' : 'text-primary'
                                                                        }`}>{trip.status}</span>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-5 py-3.5">
                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {trip.status !== 'Done' && trip.status !== 'Cancelled' && (
                                                                    <button
                                                                        onClick={(e) => { e.stopPropagation(); advanceStatus(trip.id); }}
                                                                        title={`Advance to ${pipeline[pipeline.indexOf(trip.status) + 1]}`}
                                                                        className="w-7 h-7 rounded-lg hover:bg-green-50 flex items-center justify-center text-gray-300 hover:text-green-500 transition-colors"
                                                                    >
                                                                        <Play size={13} />
                                                                    </button>
                                                                )}
                                                                {trip.status === 'Scheduled' && (
                                                                    <>
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); openEditForm(trip); }}
                                                                            className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center text-gray-300 hover:text-blue-500 transition-colors"
                                                                        >
                                                                            <Pencil size={13} />
                                                                        </button>
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); cancelTrip(trip.id); }}
                                                                            title="Cancel trip"
                                                                            className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors"
                                                                        >
                                                                            <Ban size={13} />
                                                                        </button>
                                                                    </>
                                                                )}
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); handleDelete(trip.id); }}
                                                                    className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors"
                                                                >
                                                                    <Trash2 size={13} />
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
                                        Showing <span className="font-bold text-gray-700">{showStart}–{showEnd}</span> of <span className="font-bold text-gray-700">{filteredTrips.length}</span>
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => setCurrentPage(Math.max(1, safePage - 1))} disabled={safePage <= 1} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                                            <ChevronLeft size={16} />
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${page === safePage ? 'bg-primary text-white shadow-md shadow-orange-500/15' : 'text-gray-500 hover:bg-gray-50'}`}>
                                                {page}
                                            </button>
                                        ))}
                                        <button onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))} disabled={safePage >= totalPages} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── Kanban View ─────────────────────────── */}
                        {viewMode === 'kanban' && (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {pipeline.map((status) => {
                                    const columnTrips = filteredTrips.filter((t) => t.status === status);
                                    return (
                                        <div key={status} className="space-y-3">
                                            <div className="flex items-center justify-between px-1">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2.5 h-2.5 rounded-full ${statusDot[status]}`} />
                                                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">{status}</span>
                                                </div>
                                                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">{columnTrips.length}</span>
                                            </div>
                                            <div className="space-y-2 min-h-[120px] bg-gray-50/50 rounded-xl p-2">
                                                {columnTrips.length === 0 && (
                                                    <div className="flex items-center justify-center h-24 text-xs text-gray-300 font-medium">
                                                        No trips
                                                    </div>
                                                )}
                                                {columnTrips.map((trip) => (
                                                    <KanbanCard key={trip.id} trip={trip} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Status Legend */}
                        <div className="flex items-center gap-4 px-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pipeline:</span>
                            {pipeline.map((step, i) => (
                                <div key={step} className="flex items-center gap-1">
                                    <span className={`w-2 h-2 rounded-full ${statusDot[step]}`} />
                                    <span className="text-[11px] font-medium text-gray-500">{step}</span>
                                    {i < pipeline.length - 1 && <ArrowRight size={10} className="text-gray-300 ml-1" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Detail Panel ────────────────────── */}
                    {selectedTrip && (
                        <div className="w-[360px] shrink-0">
                            <div className="bg-white rounded-2xl border border-gray-100 sticky top-20 overflow-hidden">
                                {/* Header */}
                                <div className="relative p-6 pb-4 border-b border-gray-50">
                                    <button onClick={() => setSelectedTrip(null)} className="absolute top-4 right-4 w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                                        <X size={16} />
                                    </button>

                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                        <Truck size={24} />
                                    </div>
                                    <h3 className="text-lg font-extrabold text-gray-900">Trip #{selectedTrip.id}</h3>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-400 mt-1">
                                        <MapPin size={12} className="text-green-500" />
                                        {selectedTrip.origin}
                                        <ArrowRight size={12} className="text-gray-300" />
                                        <MapPin size={12} className="text-red-500" />
                                        {selectedTrip.destination}
                                    </div>
                                    <div className="mt-3">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${statusColors[selectedTrip.status]}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[selectedTrip.status]}`} />
                                            {selectedTrip.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-6 space-y-4">
                                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Trip Details</h4>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-gray-50 rounded-xl p-3">
                                            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                                                <Truck size={12} />
                                                <span className="text-[10px] font-bold uppercase">Vehicle</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">{selectedTrip.vehicle}</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3">
                                            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                                                <User size={12} />
                                                <span className="text-[10px] font-bold uppercase">Driver</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">{selectedTrip.driver}</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3">
                                            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                                                <Package size={12} />
                                                <span className="text-[10px] font-bold uppercase">Cargo</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">{selectedTrip.cargoKg.toLocaleString()} kg</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3">
                                            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                                                <Fuel size={12} />
                                                <span className="text-[10px] font-bold uppercase">Fuel Est.</span>
                                            </div>
                                            <span className="text-sm font-bold text-primary">₹{selectedTrip.fuelEstimate.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Timestamps */}
                                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider pt-2">Timeline</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar size={12} className="text-blue-500" /> Scheduled
                                            </div>
                                            <span className="text-xs font-bold text-gray-700">{selectedTrip.scheduledDate || '—'}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar size={12} className="text-amber-500" /> Departed
                                            </div>
                                            <span className="text-xs font-bold text-gray-700">{selectedTrip.departedDate || '—'}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar size={12} className="text-green-500" /> Delivered
                                            </div>
                                            <span className="text-xs font-bold text-gray-700">{selectedTrip.deliveredDate || '—'}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2">
                                        {selectedTrip.status !== 'Done' && selectedTrip.status !== 'Cancelled' && (
                                            <button
                                                onClick={() => advanceStatus(selectedTrip.id)}
                                                className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Play size={14} /> Advance
                                            </button>
                                        )}
                                        {selectedTrip.status === 'Scheduled' && (
                                            <>
                                                <button onClick={() => openEditForm(selectedTrip)} className="py-2.5 px-4 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all">
                                                    <Pencil size={14} />
                                                </button>
                                                <button onClick={() => cancelTrip(selectedTrip.id)} className="py-2.5 px-4 bg-red-50 text-red-500 rounded-xl text-sm font-bold hover:bg-red-100 transition-all">
                                                    <Ban size={14} />
                                                </button>
                                            </>
                                        )}
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
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Truck size={18} />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">{editingTrip ? 'Edit Trip' : 'Dispatch New Trip'}</h3>
                            </div>
                            <button onClick={() => { setShowForm(false); setEditingTrip(null); }} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Vehicle *</label>
                                    <select
                                        value={form.vehicle}
                                        onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all appearance-none"
                                    >
                                        {editingTrip && (
                                            <option value={editingTrip.vehicle}>{editingTrip.vehicle} (current)</option>
                                        )}
                                        {idleVehicles.map((v) => (
                                            <option key={v.plate} value={v.plate}>{v.plate} — {v.model} ({v.capacityKg} kg)</option>
                                        ))}
                                    </select>
                                    <p className="text-[10px] text-gray-400 mt-1">Only <span className="font-bold text-green-600">Idle</span> vehicles shown</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Driver *</label>
                                    <select
                                        value={form.driver}
                                        onChange={(e) => setForm({ ...form, driver: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all appearance-none"
                                    >
                                        {editingTrip && !validDrivers.find(d => d.name === editingTrip.driver) && (
                                            <option value={editingTrip.driver}>{editingTrip.driver} (current)</option>
                                        )}
                                        {validDrivers.map((d) => (
                                            <option key={d.name} value={d.name}>{d.name} (exp: {d.licenseExpiry})</option>
                                        ))}
                                    </select>
                                    <p className="text-[10px] text-gray-400 mt-1">Only <span className="font-bold text-green-600">valid license</span> drivers shown</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Origin *</label>
                                    <input type="text" required value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} placeholder="e.g. Mumbai" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Destination *</label>
                                    <input type="text" required value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} placeholder="e.g. Pune" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                        Cargo Weight (kg) *
                                        {selectedVehicleCapacity > 0 && (
                                            <span className="ml-1 text-gray-400 normal-case">/ max {selectedVehicleCapacity.toLocaleString()} kg</span>
                                        )}
                                    </label>
                                    <input type="number" required min={1} value={form.cargoKg || ''} onChange={(e) => setForm({ ...form, cargoKg: parseInt(e.target.value) || 0 })} placeholder="e.g. 5000" className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none transition-all ${loadError ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-100 focus:border-primary/30 focus:ring-2 focus:ring-primary/10'}`} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Est. Fuel Cost (₹)</label>
                                    <input type="number" min={0} value={form.fuelEstimate || ''} onChange={(e) => setForm({ ...form, fuelEstimate: parseInt(e.target.value) || 0 })} placeholder="e.g. 5000" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                            </div>

                            {/* Load Error */}
                            {loadError && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                                    <AlertTriangle size={14} className="text-red-500 shrink-0" />
                                    <span className="text-xs font-bold text-red-600">{loadError}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-3 pt-2">
                                <button type="submit" className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-orange-500/15">
                                    {editingTrip ? 'Save Changes' : 'Dispatch Trip'}
                                </button>
                                <button type="button" onClick={() => { setShowForm(false); setEditingTrip(null); }} className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">
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
