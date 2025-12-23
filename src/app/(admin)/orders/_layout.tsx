import { Stack } from 'expo-router';
import React from 'react';

export default function OrdersLayout() {
  return (
    <Stack screenOptions={{
       headerShown: true,
    }}>
      <Stack.Screen 
        name="list" 
        options={{ 
          title: 'Orders List', 
          headerShown: true,
          headerShadowVisible: false,
          headerBlurEffect: 'light',
        }} 
      />
      <Stack.Screen name="[id]"  options={{ title: 'Order Details', headerShown: true }} />
    </Stack>
  )
}