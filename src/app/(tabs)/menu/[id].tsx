import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

export default function ProductDetailsScreen() {
    const {id} = useLocalSearchParams();
    console.log(id);
    
  return (
    <View>
      <Stack.Screen options={{title: `Product ${id}`}} />
      <Text>ProductDetailsScreen</Text>
    </View>
  )
}