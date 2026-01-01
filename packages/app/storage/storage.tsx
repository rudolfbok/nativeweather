"use client";

import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV({
  id: "app-storage",
  // optional encryptionKey if you want secure storage
  // encryptionKey: 'my-secret-key',
});
