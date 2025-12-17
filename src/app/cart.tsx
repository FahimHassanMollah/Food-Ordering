import Button from '@/components/Button';
import CartListItem from '@/components/CartListItem';
import { Text } from '@/components/Themed';
import { useCart } from '@/providers/CartProvider';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function Cart() {
    const router = useRouter();
    const { items, total, checkout } = useCart();

    return (
        <View >
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ padding: 16, gap: 10 }}
            />
            <Text>
                Total: ${total}
            </Text>
            <Button onPress={checkout} text="Checkout" />
            {/* <View style={styles.content}>
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
                <Text style={styles.subText}>Add items from the menu to get started</Text>
            </View>
            <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <FontAwesome name="arrow-left" size={20} color="#007AFF" />
                <Text style={styles.backButtonText}>Back to Menu</Text>
            </Pressable> */}
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        marginBottom: 40,
    },
    emptyCartText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    subText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    backButtonText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '500',
    },
});