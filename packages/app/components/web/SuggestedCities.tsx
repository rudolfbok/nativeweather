'use client';

import { StyledButton } from 'app/components/common/styled/StyledButton';
import { StyledText } from 'app/components/common/styled/StyledText';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { View } from 'react-native';

const suggestedCities = [
	{ name: 'Prague', href: '/prague' },
	{ name: 'New York', href: '/new-york' },
	{ name: 'Osaka', href: '/osaka' },
	{ name: 'London', href: '/london' },
	{ name: 'Istanbul', href: '/istanbul' },
];

export const SuggestedCities = () => {
	const router = useRouter();

	return (
		<View className="items-center gap-3">
			<StyledText type="body" className="font-medium">
				Suggested cities
			</StyledText>
			<View
				accessibilityLabel="Suggested cities"
				accessibilityRole="menu"
				className="flex-row flex-wrap justify-center gap-2"
			>
				{suggestedCities.map(({ name, href }) => (
					<StyledButton key={href} className="w-auto px-6 py-3" onPress={() => router.push(href)} text={name} />
				))}
			</View>
		</View>
	);
};
