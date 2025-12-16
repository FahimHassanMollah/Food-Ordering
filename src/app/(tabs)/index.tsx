import { View } from '@/components/Themed';
import products from '../../../assets/data/products';
import ProductListItem from '@/components/ProductListItem';
const product = products[0];

export default function MenuScreen() {
  return (
   <View>
     <ProductListItem product={product} />
     <ProductListItem product={products[1]} />
   </View>
   
  );
}

