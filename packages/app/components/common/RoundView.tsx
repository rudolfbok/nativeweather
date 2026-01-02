import { clsx } from "clsx";
import React from "react";
import { View } from "react-native";

interface RoundViewProps {
  className?: string;
  children: React.ReactNode;
}

export const RoundView = ({ className, children }: RoundViewProps) => {
  return (
    <View
      className={clsx(
        "bg-systemBackground dark:bg-secondarySystemBackground_dark flex rounded-3xl",
        className
      )}
    >
      {children}
    </View>
  );
};
