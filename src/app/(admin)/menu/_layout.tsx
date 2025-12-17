import { Pressable, useColorScheme } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors';

export default function MenuLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack screenOptions={{

    }}>
      <Stack.Screen name="index" options={{
        title: 'Menu', headerRight: () => (
          <Link href="(admin)/menu/create" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="plus"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }} />
     
      <Stack.Screen name="create" options={{ title: 'Create Product' }} />
    </Stack>
  )
}