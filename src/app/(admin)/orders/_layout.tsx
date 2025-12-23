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
      <Stack.Screen name="(admin)/orders/list"  options={{ headerShown: false }} />
      <Stack.Screen name="(admin)/orders/[id]"  options={{ title: 'Order Details' }} />
    </Stack>
  )
}