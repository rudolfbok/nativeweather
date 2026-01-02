'use client';

import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useStorageString } from 'app/storage/setStorageString';

export const StorageTest = () => {
	const [value, setValue] = useState('');
	const [username, setUsername] = useStorageString('user.name');

	return (
		<View className="gap-4 p-4">
			<TextInput
				value={value}
				placeholder="Type anything"
				onChangeText={setValue}
				className="rounded-2xl border border-gray-400 p-4"
			/>

			<Pressable onPress={() => setUsername(value)} className="items-center justify-center rounded-2xl bg-blue-500 p-4">
				<Text className="text-xl font-semibold text-white">Save to Storage</Text>
			</Pressable>

			<Text className="mt-4 text-center text-xl font-semibold">Stored value: {username}</Text>
		</View>
	);
};
