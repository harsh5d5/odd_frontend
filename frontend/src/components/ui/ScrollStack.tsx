'use client';

import React from 'react';
import type { ReactNode } from 'react';

export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
    index?: number;
    total?: number;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
    children,
    itemClassName = '',
    index = 0,
}) => {
    return (
        <div
            className="sticky"
            style={{
                top: `${96 + index * 20}px`,
                zIndex: index + 1,
                marginBottom: '40px',
            }}
        >
            <div
                className={`relative w-full p-8 md:p-12 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] ${itemClassName}`.trim()}
            >
                {children}
            </div>
        </div>
    );
};

interface ScrollStackProps {
    className?: string;
    children: ReactNode;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = '',
}) => {
    const childArray = React.Children.toArray(children);
    const total = childArray.length;

    return (
        <div className={`relative px-4 md:px-16 lg:px-20 pt-8 pb-40 ${className}`}>
            {childArray.map((child, index) => {
                if (React.isValidElement<ScrollStackItemProps>(child)) {
                    return React.cloneElement(child, {
                        index,
                        total,
                    });
                }
                return child;
            })}
        </div>
    );
};

export default ScrollStack;
