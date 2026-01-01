"use client";

import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useStorageString } from "app/storage/setStorageString";

export const StorageTest = () => {
  const [value, setValue] = useState("");
  const [username, setUsername] = useStorageString("user.name");

  return (
    <View className="gap-4 p-4">
      <TextInput
        value={value}
        placeholder="Type anything"
        onChangeText={setValue}
        className="border border-gray-400 rounded-2xl p-4"
      />

      <Pressable
        onPress={() => setUsername(value)}
        className="bg-blue-500 rounded-2xl justify-center items-center p-4"
      >
        <Text className="text-white font-semibold text-xl">
          Save to Storage
        </Text>
      </Pressable>

      <Text className="font-semibold text-xl text-center mt-4">
        Stored value: {username}
      </Text>
    </View>
  );
};
