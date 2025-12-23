import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function MenuLayout() {
    const colorScheme = useColorScheme();
  return (
    <Stack screenOptions={{
       headerShown: true,
       title: 'Orders List',
    }}>
      <Stack.Screen name="list"  options={{ headerShown: false }} />
      <Stack.Screen name="[id]"  options={{ title: 'Order Details' }} />
    </Stack>
  )
}