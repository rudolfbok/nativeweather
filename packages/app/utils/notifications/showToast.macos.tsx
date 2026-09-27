import { StyledText } from 'app/components/common/styled/StyledText';
import clsx from 'clsx';
import { Check, Star, StarOff, X } from 'lucide-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import { create } from 'zustand';

type ToastType = 'error' | 'done' | 'add' | 'remove';

interface ToastData {
	message: string;
	type: ToastType;
}

interface ToastState {
	toast: ToastData | null;
	setToast: (toast: ToastData | null) => void;
}

const useToast = create<ToastState>((set) => ({
	toast: null,
	setToast: (toast) => set({ toast }),
}));

const toastStyles = {
	error: { Icon: X, color: '#FF3B30' },
	done: { Icon: Check, color: '#007AFF' },
	add: { Icon: Star, color: '#FE9804' },
	remove: { Icon: StarOff, color: '#FE9804' },
};

export const showToast = ({ message, preset }: { message: string; preset: 'error' | 'done' }) =>
	useToast.getState().setToast({ message, type: preset });

export const showFavoriteToast = ({ message, type }: { message: string; type: 'add' | 'remove' }) =>
	useToast.getState().setToast({ message, type });

export const Toast = () => {
	const { toast, setToast } = useToast();

	useEffect(() => {
		if (!toast) return;

		const timeout = setTimeout(() => setToast(null), 3500);

		return () => clearTimeout(timeout);
	}, [setToast, toast]);

	if (!toast) return null;

	const { Icon, color } = toastStyles[toast.type];

	return (
		<View
			className={clsx(
				'bg-systemBackground dark:bg-secondarySystemBackground_dark',
				'flex-row items-center gap-4 rounded-xl p-4',
				'absolute bottom-6 right-6 z-50 w-[320px]',
				'border border-black/10 dark:border-white/10'
			)}
		>
			<Icon color={color} fill={toast.type === 'add' ? color : 'none'} />
			<StyledText type="caption" className="flex-1 font-semibold" numberOfLines={3}>
				{toast.message}
			</StyledText>
		</View>
	);
};
