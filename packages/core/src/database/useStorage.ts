import { useMMKVBoolean, useMMKVObject, useMMKVString } from "react-native-mmkv";
import { storage } from "./initStorage";

export const useStorageBoolean = (key: string) => useMMKVBoolean(key, storage);

export const useStorageString = (key: string) => useMMKVString(key, storage);

export const useStorageObject = <T>(key: string) => useMMKVObject<T>(key, storage);
