import type { ReactNode } from "react";
import { Text } from "./Text";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="mt-8">
      <Text as="h2" className="text-left text-xl font-semibold tracking-tight">
        {title}
      </Text>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
};
