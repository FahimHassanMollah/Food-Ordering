import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'

export default function OrdersListTabLayout() {
    return (
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
    )
}