import type { ReactNode } from "react";
import type { PressableProps } from "react-native";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends Omit<
  PressableProps,
  "children" | "className"
> {
  children: ReactNode;
  loading?: boolean;
  className?: string;
}

export function Button({
  children,
  loading = false,
  disabled,
  style,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      className={twMerge(
        "min-h-11 flex-row items-center justify-center rounded-ui px-[18px] bg-ui-primary",
        isDisabled && "opacity-55",
        className,
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={twMerge("text-base !text-white font-semibold")}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}
