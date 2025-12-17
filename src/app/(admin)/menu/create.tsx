import { View, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { Text } from '@/components/Themed';
import { defaultPizzaImage } from '@/components/ProductListItem';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function CreateProductScreen() {
    const { id } = useLocalSearchParams();
    const isUpdating = !!id;
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const resetFields = () => {
        setName('');
        setPrice('');
    }

  const pickImage = async () => {
   
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
    const validateInput = () => {
        if (!name.trim()) {
            setError('Name is required');
            return false;
        }
        if (!price.trim() || isNaN(Number(price))) {
            setError('Valid price is required');
            return false;
        }
        setError('');
        return true;
    }
    const onCreate = () => {
        if (!validateInput()) return;
        // Handle product creation logic here
        resetFields();
    }
    const onsubmit = () => {
        if (isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    }
    const onUpdate = () => {
        if (!validateInput()) return;
        // Handle product update logic here
    }
    const confirmDelete = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this product?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: onDelete },
            ]
        );
    }
    const onDelete = () => {
        // Handle product deletion logic here
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />
            <Image source={{uri: image ||defaultPizzaImage}} style={styles.image} />
            <Text style={styles.textButton} onPress={pickImage}>Select Image</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput placeholder="Product Name" style={styles.input} value={name} onChangeText={setName} />
            {error && <Text style={{color: 'red'}}>{error}</Text>}
            <Text style={styles.label}>Price</Text>
            <TextInput placeholder="Product Price" style={styles.input} keyboardType="numeric" value={price} onChangeText={setPrice} />
            {error && <Text style={{color: 'red'}}>{error}</Text>}
            <Button text={isUpdating ? "Update" : "Create"} onPress={onsubmit} />
            {
                isUpdating && (<Text style={[styles.textButton, {color: 'red'}]} onPress={confirmDelete}>Delete Product</Text>)
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'gray',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    image : {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        color: Colors.light.tint,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    }

});

