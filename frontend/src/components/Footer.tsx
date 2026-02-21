import { Truck } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                {/* Top Section */}
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                                <Truck size={22} />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight">Fleet<span className="text-primary">Flow</span></span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Centralized digital hub for optimizing delivery fleet lifecycle and monitoring driver safety.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Product</h4>
                        <ul className="space-y-3">
                            {["Dashboard", "Asset Management", "Trip Dispatcher", "Maintenance", "Analytics"].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 text-sm hover:text-primary transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Company</h4>
                        <ul className="space-y-3">
                            {["About Us", "Careers", "Blog", "Contact", "Partners"].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 text-sm hover:text-primary transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 text-sm hover:text-primary transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2026 FleetFlow. Built for the Odoo Hackathon.
                    </p>
                    <div className="flex items-center gap-6">
                        {["Twitter", "GitHub", "LinkedIn"].map(item => (
                            <Link key={item} href="#" className="text-gray-500 text-sm hover:text-primary transition-colors">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
