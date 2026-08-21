import type { ReactNode } from 'react';

interface StatusPageProps {
	icon?: ReactNode;
	title: string;
	description: string;
	actions?: ReactNode;
}

export const StatusPage = ({ icon, title, description, actions }: StatusPageProps) => (
	<main className="mt-2 flex items-center justify-center">
		<section className="flex w-full flex-col items-center justify-center gap-4 text-center">
			{icon}
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-semibold md:text-3xl dark:text-white">{title}</h1>
				<p className="mx-auto max-w-md text-base opacity-70 dark:text-white">{description}</p>
			</div>
			{actions}
		</section>
	</main>
);
