import { clsx } from 'clsx';
import { gsap } from 'gsap';
import { ChevronRight } from 'lucide-react-native';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { StyledText } from '../styled/StyledText';

interface AccordionProps {
	title: string;
	children: ReactNode;
}

export const Accordion = ({ title, children }: AccordionProps) => {
	const [expanded, setExpanded] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const arrowRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			if (expanded) {
				gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.3, ease: 'power1.out' });
			} else {
				gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power1.in' });
			}
		}
		if (arrowRef.current) {
			if (expanded) {
				gsap.to(arrowRef.current, { rotate: '90deg', duration: 0.3, ease: 'power1.out' });
			} else {
				gsap.to(arrowRef.current, { rotate: '0deg', duration: 0.3, ease: 'power1.out' });
			}
		}
	}, [expanded]);

	return (
		<div className={clsx('flex flex-col', expanded && 'gap-2')}>
			<div
				className={clsx('flex cursor-pointer flex-row items-center justify-between')}
				onClick={() => setExpanded((prev) => !prev)}
			>
				<StyledText type="subtitle" className={clsx('hover:underline')}>
					{title}
				</StyledText>
				<div ref={arrowRef}>
					<ChevronRight size={26} color="#007AFF" />
				</div>
			</div>
			<div ref={contentRef} className={clsx('h-0 overflow-hidden opacity-0')}>
				{children}
			</div>
		</div>
	);
};
