import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"  options={{ title: 'Menu' }} />
      <Stack.Screen name="[id]"  />
    </Stack>
  )
}