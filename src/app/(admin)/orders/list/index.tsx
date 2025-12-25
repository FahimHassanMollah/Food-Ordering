import OrderListItem from '@/components/OrderListItem';
// import orders from '../../../../../assets/data/orders';
import { useAdminOrderList } from '@/api/orders';
import { Text } from '@/components/Themed';
import { ActivityIndicator, FlatList } from 'react-native';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSubscription } from '@/api/orders/subscriptions';

export default function OrdersScreen() {
  const {data:orders, isLoading, error} = useAdminOrderList({ archived: false });
  useInsertOrderSubscription()
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <FlatList
      data={orders}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      renderItem={({ item }) => <OrderListItem order={item} />}
    />
  );
}