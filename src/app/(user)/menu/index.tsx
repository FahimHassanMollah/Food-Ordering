import { View } from '@/components/Themed';
import products from '../../../../assets/data/products';
import ProductListItem from '@/components/ProductListItem';
import { FlatList } from 'react-native';
const product = products[0];

export default function MenuScreen() {
  return (
   <View style={{flex:1,backgroundColor: 'transparent'}}>
     <FlatList
       data={products}
       renderItem={({ item }) => <ProductListItem product={item} />}
       keyExtractor={(item) => item.id.toString()}
       numColumns={2}
       contentContainerStyle={{ padding: 10,gap:10 }}
       columnWrapperStyle={{ gap: 10 }}
     />
   </View>
   
  );
}

