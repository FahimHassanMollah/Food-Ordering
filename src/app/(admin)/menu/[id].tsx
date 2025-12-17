import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '../../../../assets/data/products';
import { useCart } from '@/providers/CartProvider';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const { id } = useLocalSearchParams();
  const product = products.find(p => p.id.toString() === id);
 
  return (
    <View style={styles.container}>
       <Stack.Screen options={{
        title: product?.name || 'Product Details',
        headerRight: () => (
          <Link href={`/(admin)/menu/create?id=${id}`} asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="edit"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }} />
      {/* <Stack.Screen options={{ title: product?.name }} /> */}
      <Image source={{ uri: product?.image }} style={styles.image} />
      
      <Text style={styles.price}>${product?.price}</Text>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});