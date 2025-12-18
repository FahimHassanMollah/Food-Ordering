import { View, Text, Pressable, useColorScheme } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors';

export default function MenuLayout() {
    const colorScheme = useColorScheme();
  return (
    <Stack screenOptions={{
       
    }}>
      <Stack.Screen name="(user)/orders/index"  options={{ title: 'Orders' }} />
      <Stack.Screen name="(user)/orders/[id]"  />
    </Stack>
  )
}