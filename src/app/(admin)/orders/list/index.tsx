import OrderListItem from '@/components/OrderListItem';
// import orders from '../../../../../assets/data/orders';
import { useAdminOrderList } from '@/api/orders';
import { Text } from '@/components/Themed';
import { ActivityIndicator, FlatList } from 'react-native';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';

export default function OrdersScreen() {
  const {data:orders, isLoading, error} = useAdminOrderList({ archived: false });
  const { refetch } = useAdminOrderList({});
  const queryClient = useQueryClient();
  useEffect(() => {
  const orders = supabase
    .channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      (payload) => {
        console.log('Change received!', payload);
        // refetch();
        queryClient.invalidateQueries({ queryKey: ['orders'] });
      }
    )
    .subscribe();
  return () => {
    orders.unsubscribe();
  };
}, []);
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