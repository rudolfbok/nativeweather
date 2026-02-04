'use client';

import { gsap } from 'gsap';
import { ReactNode, useEffect, useRef } from 'react';

interface AnimatedViewProps {
	children: ReactNode;
	duration: number;
	className?: string;
}

export const AnimatedView = ({ children, className, duration }: AnimatedViewProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: duration / 100, ease: 'power1.out' });
		}
	}, []);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
};
