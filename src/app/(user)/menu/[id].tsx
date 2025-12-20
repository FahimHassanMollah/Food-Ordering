import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '../../../../assets/data/products';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { useProduct } from '@/api/products';
const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: product, isLoading, error } = useProduct(Number(id));
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>(sizes[0]);
  const { addItem } = useCart();
  const addToCart = () => {
    addItem(product!, selectedSize);
    router.push('/cart');
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <View>
      <Text>Error loading product</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image source={{ uri: product?.image }} style={styles.image} />
      <Text>Select size:</Text>
      <View style={styles.sizes}>
        {
          sizes.map(size => (
            <Pressable style={[styles.size, selectedSize === size && { backgroundColor: 'gainsboro', }]} key={size} onPress={() => setSelectedSize(size)}>
              <Text style={[styles.sizeText, selectedSize === size && { fontWeight: '900', color: 'gray' }]}>{size}</Text>
            </Pressable>
          ))
        }
      </View>
      <Text style={styles.price}>${product?.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />

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
    marginTop: 'auto'
  },
  sizes: {
    flexDirection: 'row',
    marginVertical: 8,
    gap: 10,
    justifyContent: 'space-around',
  },
  size: {
    borderColor: 'gray',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  sizeText: {
    fontSize: 18,
    color: 'black',
  },
});