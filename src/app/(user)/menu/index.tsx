import { Text, View } from '@/components/Themed';
// import products from '../../../../assets/data/products';
import ProductListItem from '@/components/ProductListItem';
import { ActivityIndicator, FlatList } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useProductList } from '@/api/products';
// const product = products[0];

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();
  if (isLoading) {
    return <View>
      <ActivityIndicator />
    </View>;
  }
  if (error) {
    return <View>
      <Text>Error loading products</Text>
    </View>;
  }

 
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>

  );
}

