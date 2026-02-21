'use client';

import CardNav from '@/components/ui/CardNav';
import type { CardNavItem } from '@/components/ui/CardNav';

const navItems: CardNavItem[] = [
    {
        label: "Fleet Modules",
        bgColor: "#F06522",
        textColor: "#fff",
        links: [
            { label: "Dashboard", href: "/dashboard", ariaLabel: "Main Dashboard" },
            { label: "Vehicle Registry", href: "/dashboard/vehicles", ariaLabel: "Vehicle Registry" },
            { label: "Trip Dispatcher", href: "/dashboard/trips", ariaLabel: "Trip Dispatcher" },
        ]
    },
    {
        label: "Operations",
        bgColor: "#1a1a1a",
        textColor: "#fff",
        links: [
            { label: "Maintenance Logs", href: "/dashboard/maintenance", ariaLabel: "Maintenance Logs" },
            { label: "Expense & Fuel", href: "/dashboard/expenses", ariaLabel: "Expense Tracking" },
            { label: "Driver Profiles", href: "/dashboard/drivers", ariaLabel: "Driver Safety Profiles" },
        ]
    },
    {
        label: "Insights",
        bgColor: "#2d1f0e",
        textColor: "#fff",
        links: [
            { label: "Analytics", href: "/dashboard/analytics", ariaLabel: "Operational Analytics" },
            { label: "Reports", href: "/dashboard/reports", ariaLabel: "Financial Reports" },
        ]
    }
];

export default function Navigation() {
    return (
        <CardNav
            items={navItems}
            baseColor="#ffffffee"
            menuColor="#1a1a1a"
            buttonBgColor="#F06522"
            buttonTextColor="#fff"
            ease="power3.out"
        />
    );
}
