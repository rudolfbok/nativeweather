import { clsx } from "clsx";

export const Separator = ({ className }: { className?: string }) => {
  return (
    <div
      role="separator"
      className={clsx("border-b border-gray-200 dark:border-zinc-800", className)}
    />
  );
};
