import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { showFavoriteToast, showToast } from 'app/utils/notifications/showToast.macos';
import { View } from 'react-native';

export const Testing = () => {
	const { setNavigationScreen } = useNavigationScreen();

	return (
		<View className="w-full items-center gap-4 p-4">
			<View className="items-center gap-2">
				<StyledText type="title">Pointer test</StyledText>
				<View className="rounded-3xl bg-yellow-400 p-4" style={{ cursor: 'pointer' }}>
					<StyledText type="body">Pointer test</StyledText>
				</View>
			</View>
			<StyledPressable onPress={() => setNavigationScreen('weather')} className="rounded-3xl p-4">
				<StyledText type="title">Go back to weather</StyledText>
			</StyledPressable>
			<StyledPressable
				onPress={() => showToast({ message: 'Success toast', preset: 'done' })}
				className="rounded-2xl px-5 py-3"
			>
				<StyledText type="body">Show success toast</StyledText>
			</StyledPressable>
			<StyledPressable
				onPress={() => showToast({ message: 'Error toast', preset: 'error' })}
				className="rounded-2xl px-5 py-3"
			>
				<StyledText type="body">Show error toast</StyledText>
			</StyledPressable>
			<StyledPressable
				onPress={() => showFavoriteToast({ message: 'Add to favorites', type: 'add' })}
				className="rounded-2xl px-5 py-3"
			>
				<StyledText type="body">Add to favorites</StyledText>
			</StyledPressable>
			<StyledPressable
				onPress={() => showFavoriteToast({ message: 'Remove from favorites', type: 'remove' })}
				className="rounded-2xl px-5 py-3"
			>
				<StyledText type="body">Remove from favorites</StyledText>
			</StyledPressable>
		</View>
	);
};
