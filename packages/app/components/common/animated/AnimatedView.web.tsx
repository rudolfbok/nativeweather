'use client';

import { gsap } from 'gsap';
import { ReactNode, useEffect, useRef } from 'react';

interface AnimatedViewProps {
	children: ReactNode;
	duration?: number;
	visible?: boolean;
	className?: string;
}

export const AnimatedView = ({ children, className, duration = 200, visible = true }: AnimatedViewProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			gsap.fromTo(
				ref.current,
				{ opacity: visible ? 0 : 1 },
				{ opacity: visible ? 1 : 0, duration: duration / 1000, ease: 'power1.out' }
			);
		}
	}, [duration, visible]);

	return (
		<div ref={ref} className={className} style={{ opacity: visible ? undefined : 0 }}>
			{children}
		</div>
	);
};
