import OrderListItem from '@/components/OrderListItem';
import { supabase } from '@/lib/supabase';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useMyOrderList } from '@/api/orders';
import { Text } from '@/components/Themed';

export default function OrdersScreen() {
 
 const {data:orders, isLoading, error} = useMyOrderList();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Orders' }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}