import { clsx } from 'clsx';
import { gsap } from 'gsap';
import { ChevronIcon } from 'app/components/icons/ui/ChevronIcon';
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
		<div className={clsx('flex flex-col')}>
			<div
				className={clsx('flex cursor-pointer flex-row items-center justify-between py-2')}
				onClick={() => setExpanded((prev) => !prev)}
			>
				<StyledText type="subtitle" className={clsx('hover:underline')}>
					{title}
				</StyledText>
				<div ref={arrowRef}>
					<ChevronIcon />
				</div>
			</div>
			<div
				ref={contentRef}
				className={clsx(
					'bg-systemBackground dark:bg-secondarySystemBackground_dark h-0 overflow-hidden rounded-3xl opacity-0',
					expanded && 'mb-2'
				)}
			>
				<div className={clsx('p-4')}>{children}</div>
			</div>
		</div>
	);
};
