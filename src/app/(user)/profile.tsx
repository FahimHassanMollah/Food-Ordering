import { View, Text } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import { supabase } from '@/lib/supabase';

export default function ProfileScreen() {
    const signOut = async () => {
        await supabase.auth.signOut();
    }
    return (
        <View>
            <Button onPress={signOut} text="Sign out" />
        </View>
    )
}