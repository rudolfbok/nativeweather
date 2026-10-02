import { Toaster as WebToaster } from 'sonner';

export const Toaster = ({ theme }: { theme: 'light' | 'dark' | 'system' }) => (
	<WebToaster position="bottom-right" theme={theme} />
);
