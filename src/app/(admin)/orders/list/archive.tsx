import OrderListItem from '@/components/OrderListItem';
import { Stack } from 'expo-router';
// import orders from '../../../../../assets/data/orders';
import { ActivityIndicator, FlatList } from 'react-native';
import { useAdminOrderList } from '@/api/orders';
import { Text } from '@/components/Themed';

export default function ArchiveScreen() {
  const {data:orders, isLoading, error} = useAdminOrderList({ archived: true });
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