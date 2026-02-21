'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { Truck, ArrowUpRight } from 'lucide-react';

export type CardNavLink = {
    label: string;
    href: string;
    ariaLabel: string;
};

export type CardNavItem = {
    label: string;
    bgColor: string;
    textColor: string;
    links: CardNavLink[];
};

export interface CardNavProps {
    items: CardNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    theme?: 'light' | 'dark';
}

const CardNav: React.FC<CardNavProps> = ({
    items,
    className = '',
    ease = 'power3.out',
    baseColor = '#fff',
    menuColor,
    buttonBgColor,
    buttonTextColor,
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                contentEl.offsetHeight;

                const topBar = 60;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 280;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease
        });

        tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div
            className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[92%] max-w-[900px] z-[99] top-[1rem] md:top-[1.5rem] ${className}`}
        >
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] relative overflow-hidden will-change-[height] backdrop-blur-sm border border-gray-100/50`}
                style={{ backgroundColor: baseColor }}
            >
                {/* Top Bar */}
                <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-3 z-[2]">
                    {/* Hamburger */}
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none w-10`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        tabIndex={0}
                        style={{ color: menuColor || '#1a1a1a' }}
                    >
                        <div
                            className={`w-[26px] h-[2px] bg-current transition-all duration-300 ease-out origin-center ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
                                } group-hover:opacity-70`}
                        />
                        <div
                            className={`w-[26px] h-[2px] bg-current transition-all duration-300 ease-out origin-center ${isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
                                } group-hover:opacity-70`}
                        />
                    </div>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
                        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                            <Truck size={18} />
                        </div>
                        <span className="text-lg font-extrabold tracking-tight text-gray-900">Fleet<span className="text-primary">Flow</span></span>
                    </Link>

                    {/* CTA Button */}
                    <Link
                        href="/login"
                        className="hidden md:inline-flex border-0 rounded-xl px-5 py-2 items-center font-bold text-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02]"
                        style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                    >
                        Get Started
                    </Link>
                </div>

                {/* Expandable Card Content */}
                <div
                    className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
                        } md:flex-row md:items-end md:gap-3`}
                    aria-hidden={!isExpanded}
                >
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card select-none relative flex flex-col gap-2 p-4 rounded-xl min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%] transition-all duration-200 hover:brightness-110"
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="font-bold tracking-tight text-[17px] md:text-[20px] mb-1">
                                {item.label}
                            </div>
                            <div className="mt-auto flex flex-col gap-1">
                                {item.links?.map((lnk, i) => (
                                    <Link
                                        key={`${lnk.label}-${i}`}
                                        className="inline-flex items-center gap-1.5 no-underline cursor-pointer transition-opacity duration-200 hover:opacity-75 text-[14px] md:text-[15px]"
                                        href={lnk.href}
                                        aria-label={lnk.ariaLabel}
                                        style={{ color: item.textColor }}
                                        onClick={() => {
                                            setIsHamburgerOpen(false);
                                            tlRef.current?.reverse();
                                        }}
                                    >
                                        <ArrowUpRight size={14} className="shrink-0" aria-hidden="true" />
                                        {lnk.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
