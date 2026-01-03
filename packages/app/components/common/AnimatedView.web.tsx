'use client';

import gsap from 'gsap';
import { ReactNode, useEffect, useRef } from 'react';

interface AnimatedViewProps {
	children: ReactNode;
	transition?: { duration?: number; ease?: string };
	className?: string;
}

export const AnimatedView = ({ children, className, transition }: AnimatedViewProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			const durationSeconds = (transition?.duration ?? 200) / 1000;
			gsap.fromTo(
				ref.current,
				{ opacity: 0 },
				{ opacity: 1, duration: durationSeconds, ease: transition?.ease ?? 'power1.out' }
			);
		}
	}, []);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
};
