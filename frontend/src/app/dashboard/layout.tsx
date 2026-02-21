'use client';

import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />

            {/* Main content — offset by sidebar width */}
            <div className="ml-[250px] transition-all duration-300">
                {children}
            </div>
        </div>
    );
}
