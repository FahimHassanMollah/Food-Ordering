import { View, Text, StyleSheet, Pressable, Platform } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';

export default function Cart() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

            <View style={styles.content}>
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
                <Text style={styles.subText}>Add items from the menu to get started</Text>
            </View>
            <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <FontAwesome name="arrow-left" size={20} color="#007AFF" />
                <Text style={styles.backButtonText}>Back to Menu</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
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