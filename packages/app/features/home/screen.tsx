"use client";

import { View } from "react-native";
import { StorageTest } from "app/components/common/StorageTest";
import { useState, useEffect } from "react";

export const HomeScreen = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <View className="flex flex-1 h-screen items-center justify-center bg-yellow-200">
      <StorageTest />
    </View>
  );
};
