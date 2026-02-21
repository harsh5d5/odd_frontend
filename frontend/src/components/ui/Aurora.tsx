'use client';

import { useEffect, useRef } from 'react';

interface AuroraProps {
    colorStops?: string[];
    blend?: number;
    amplitude?: number;
    speed?: number;
}

export default function Aurora({
    colorStops = ["#F06522", "#FFFFFF", "#F06522"],
    blend = 0.4,
    amplitude = 1.2,
    speed = 0.4
}: AuroraProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const render = () => {
            time += 0.01 * speed;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const gradient = ctx.createRadialGradient(
                canvas.width / 2 + Math.sin(time) * 100 * amplitude,
                canvas.height / 2 + Math.cos(time * 0.5) * 100 * amplitude,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width
            );

            colorStops.forEach((color, index) => {
                gradient.addColorStop(index / (colorStops.length - 1), color);
            });

            ctx.fillStyle = gradient;
            ctx.globalAlpha = blend;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationFrameId = window.requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [colorStops, blend, amplitude, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10"
            style={{ filter: 'blur(100px)' }}
        />
    );
}
