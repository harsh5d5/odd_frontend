'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, LogIn, UserPlus, ArrowLeft, Eye, EyeOff, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/lib/config';
import Aurora from '@/components/ui/Aurora';
import Footer from '@/components/Footer';

const CheckIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-[#F06522] mt-1 shrink-0"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
                d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
                fill="currentColor"
                strokeWidth="0"
            />
        </svg>
    );
};

const Step = ({ title }: { title: string }) => {
    return (
        <li className="flex gap-3 items-start mb-3">
            <CheckIcon />
            <p className="text-gray-700 text-sm font-medium">{title}</p>
        </li>
    );
};

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");

    const handleLogin = async (e?: React.FormEvent, signupEmail?: string, signupPassword?: string) => {
        if (e) e.preventDefault();
        setError("");
        setLoading(true);

        const loginEmail = signupEmail || email;
        const loginPassword = signupPassword || password;

        try {
            const formData = new FormData();
            formData.append('username', loginEmail);
            formData.append('password', loginPassword);

            const res = await fetch(`${API_URL}/token`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.detail || 'Login failed');
            }

            const data = await res.json();
            localStorage.setItem("access_token", data.access_token);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, full_name: name }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.detail || 'Signup failed');
            }

            await handleLogin(undefined, email, password);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-4 overflow-hidden relative selection:bg-[#F06522] selection:text-white font-sans">

                {/* Aurora Background Effect - Light Palette */}
                <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
                    <Aurora
                        colorStops={["#F06522", "#FFFFFF", "#F06522"]}
                        blend={0.4}
                        amplitude={1.5}
                        speed={0.3}
                    />
                </div>

                {/* Back Button */}
                <Link href="/" className="absolute top-4 left-4 md:top-8 md:left-8 z-50 flex items-center gap-3 text-gray-500 hover:text-[#F06522] transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-[#F06522] group-hover:text-white transition-all shadow-sm">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="font-semibold text-sm tracking-wide">Back to Home</span>
                </Link>

                {/* Main Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full max-w-5xl h-auto min-h-[600px] md:h-[650px] bg-white rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(240,101,34,0.1)] border border-orange-100 flex flex-col md:flex-row"
                >
                    {/* Visual Side (Orange Gradient/White) */}
                    <div className="relative flex-1 bg-gradient-to-br from-orange-50 to-white hidden md:flex flex-col justify-center p-16 overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                        <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-[radial-gradient(#F06522_1px,transparent_1px)] [background-size:24px_24px]" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-3 mb-10"
                            >
                                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-500/30">
                                    <Truck size={32} />
                                </div>
                                <span className="text-3xl font-black tracking-tight">Fleet<span className="text-primary italic">Flow</span></span>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                {isLogin ? (
                                    <motion.div
                                        key="login-text"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="max-w-sm"
                                    >
                                        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">Welcome back to the <span className="text-primary">Fleet Hub.</span></h2>
                                        <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                                            Monitor your vehicles, track assignments, and optimize your logistics with real-time analytics.
                                        </p>
                                        <ul className="mb-12">
                                            <Step title="Real-time Vehicle Tracking" />
                                            <Step title="Automated Dispatching" />
                                            <Step title="Cost Efficiency Reports" />
                                        </ul>
                                        <button
                                            onClick={() => setIsLogin(false)}
                                            className="text-primary font-bold hover:underline flex items-center gap-2"
                                        >
                                            New here? Create an account <ArrowLeft size={16} className="rotate-180" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="register-text"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="max-w-sm"
                                    >
                                        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">Join the <span className="text-primary italic">Fleet</span> Revolution.</h2>
                                        <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                                            Scale your logistics operations with our centralized, rule-based digital management system.
                                        </p>
                                        <ul className="mb-12">
                                            <Step title="Unlimited Vehicle Assets" />
                                            <Step title="Advanced Safety Scores" />
                                            <Step title="Rule-based Logistics" />
                                        </ul>
                                        <button
                                            onClick={() => setIsLogin(true)}
                                            className="text-primary font-bold hover:underline flex items-center gap-2"
                                        >
                                            Already a member? Sign In <ArrowLeft size={16} className="rotate-180" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Form Side (White) */}
                    <div className="flex-1 bg-white p-8 md:p-16 flex flex-col justify-center relative">
                        <div className="max-w-sm mx-auto w-full">
                            <div className="md:hidden flex items-center gap-2 mb-10 justify-center">
                                <Truck className="text-primary" size={28} />
                                <span className="text-2xl font-black">Fleet<span className="text-primary">Flow</span></span>
                            </div>

                            <h2 className="text-3xl font-extrabold mb-10 text-center md:text-left">
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </h2>

                            <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-5">
                                {!isLogin && (
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                                placeholder="Enter your name"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                            placeholder="admin@fleetflow.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-sm font-bold text-gray-700">Password</label>
                                        {isLogin && <button type="button" className="text-xs text-primary font-bold hover:underline">Forgot?</button>}
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl text-center"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-[#D4541B] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                                            {isLogin ? 'Sign In' : 'Create Account'}
                                        </>
                                    )}
                                </motion.button>

                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-100"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-gray-400 font-bold tracking-wider">Or continue with</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    className="w-full py-4 bg-white border border-gray-100 text-gray-700 font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </motion.button>
                            </form>

                            <div className="mt-8 text-center text-sm text-gray-500 font-medium">
                                {isLogin ? (
                                    <>Don&apos;t have an account? <button onClick={() => setIsLogin(false)} className="text-primary font-bold hover:underline">Sign Up</button></>
                                ) : (
                                    <>Already member? <button onClick={() => setIsLogin(true)} className="text-primary font-bold hover:underline">Sign In</button></>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </>
    );
}
