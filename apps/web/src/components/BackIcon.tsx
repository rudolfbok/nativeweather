import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { Text } from "./Text";

interface BackIconProps {
	to?: string;
}

export const BackIcon = ({ to = "/" }: BackIconProps) => {
	return (
		<Link to={to} className="inline-flex items-center gap-4 mb-4">
			<div className="p-1.5 rounded-full border dark:border-white/30 border-black/10">
				<ChevronLeft
					aria-hidden="true"
					className="h-5 w-5 text-black dark:text-white"
				/>
			</div>
			<Text>Back</Text>
		</Link>
	);
};
