import { Image, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Product } from '@/types';
import { Link, useSegments } from 'expo-router';
import RemoteImage from './RemoteImage';
export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';
const ProductListItem = ({ product }: { product: Product }) => {
  const segments = useSegments();  
  
  return (
    <Link href={`${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage path={product.image} fallback={defaultPizzaImage} resizeMode='contain' style={styles.image} />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
}
export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    maxWidth: '50%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: Colors.light.tint,
  },
  image : {
    width: '100%',
    aspectRatio: 1,
  }
 
});
