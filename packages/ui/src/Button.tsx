import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import type { PressableProps } from "react-native";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends Omit<PressableProps, "children" | "className"> {
	children: ReactNode;
	variant?: ButtonVariant;
	loading?: boolean;
	className?: string;
	textClassName?: string;
}

const containerClasses: Record<ButtonVariant, string> = {
	primary: "bg-ui-primary",
	secondary: "bg-ui-secondary",
	ghost: "bg-transparent",
};

const labelClasses: Record<ButtonVariant, string> = {
	primary: "text-ui-foreground",
	secondary: "text-ui-secondary-foreground",
	ghost: "text-ui-primary",
};

export function Button({
	children,
	variant = "primary",
	loading = false,
	disabled,
	style,
	className,
	textClassName,
	...props
}: ButtonProps) {
	const isDisabled = disabled || loading;
	return (
		<Pressable
			accessibilityRole="button"
			accessibilityState={{ disabled: isDisabled, busy: loading }}
			disabled={isDisabled}
			className={twMerge(
				"min-h-11 flex-row items-center justify-center rounded-ui px-[18px]",
				containerClasses[variant],
				isDisabled && "opacity-55",
				className,
			)}
			style={(state) => [
				state.pressed && !isDisabled && styles.pressed,
				typeof style === "function" ? style(state) : style,
			]}
			{...props}
		>
			{loading ? (
				<ActivityIndicator color={variant === "primary" ? "#ffffff" : "#2563eb"} />
			) : (
				<Text className={twMerge("text-base font-semibold", labelClasses[variant], textClassName)}>
					{children}
				</Text>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
});
