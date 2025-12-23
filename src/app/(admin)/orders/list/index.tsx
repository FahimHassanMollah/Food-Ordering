import OrderListItem from '@/components/OrderListItem';
// import orders from '../../../../../assets/data/orders';
import { useAdminOrderList } from '@/api/orders';
import { Text } from '@/components/Themed';
import { ActivityIndicator, FlatList } from 'react-native';

export default function OrdersScreen() {
  const {data:orders, isLoading, error} = useAdminOrderList({ archived: false });
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