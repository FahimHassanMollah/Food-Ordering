import { FontAwesome5 } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function OrdersListTabLayout() {
    const insets = useSafeAreaInsets()
    return (
        <View style={{ flex: 1, marginTop: -insets.top }}>
        <Tabs screenOptions={{
            headerShown: false,
            tabBarPosition: 'top',
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Order List',
                    tabBarLabel: 'Current Orders',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="clipboard-list" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="archive"
                options={{
                    title: 'Order Archive',
                    tabBarLabel: 'Archived Orders',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="archive" color={color} size={size} />,
                }}
            />
        </Tabs>
        </View>
    )
}