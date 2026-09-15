import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { Text } from "./Text";

interface BackIconProps {
  to?: string;
}

export const BackIcon = ({ to = "/" }: BackIconProps) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-4 mb-4 hover:opacity-70"
    >
      <div className="p-2 rounded-full border dark:border-white/30 border-black/10">
        <ChevronLeft aria-hidden="true" className="h-5 w-5" />
      </div>
      <Text>Back</Text>
    </Link>
  );
};
