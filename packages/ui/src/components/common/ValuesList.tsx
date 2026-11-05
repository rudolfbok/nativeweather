import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Separator } from './Separator';
import { Text } from './Text';

export interface ValueItem {
	name: string;
	value?: string;
	description?: string;
	/** Text colour class for the name, overrides the list's `valueClassName`. */
	className?: string;
	/** Replaces the index badge, e.g. a moon phase icon. */
	leading?: ReactNode;
}

interface ValuesListProps {
	values: ValueItem[];
	showIndex?: boolean;
	valueClassName?: string;
}

export const ValuesList = ({ values, showIndex = false, valueClassName }: ValuesListProps) => (
	<View className="gap-4">
		{values.map(({ name, value, description, className, leading }, index) => (
			<Fragment key={name}>
				{index > 0 && <Separator />}
				<View className="w-full flex-row items-center gap-4">
					{leading ??
						(showIndex && (
							<View className="aspect-square w-8 items-center justify-center rounded-full bg-tertiary-system-background">
								<Text type="body" className="font-medium">
									{index + 1}
								</Text>
							</View>
						))}
					<View className="flex-1">
						<Text type="body" className={twMerge('font-semibold', valueClassName, className)}>
							{name}
						</Text>
						{value && (
							<Text type="body" className="font-medium">
								{value}
							</Text>
						)}
						{description && <Text type="body">{description}</Text>}
					</View>
				</View>
			</Fragment>
		))}
	</View>
);
