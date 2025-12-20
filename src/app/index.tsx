import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const RootIndex = () => {
  const { session, loading, isAdmin } = useAuth();
  if (loading){
    return <ActivityIndicator />; 
  }
  if (!session){
    return (<Redirect href='/sign-in'/>);
  }
  
  if (!isAdmin){

    return (<Redirect href='/(user)/menu'/>);
  }
  console.log(session?.user?.email,"index");
  const signOut = async () => {
    console.log('sign outing');
    
    await supabase.auth.signOut();


  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)/menu'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)/menu'} asChild>
        <Button text="Admin" />
      </Link>
      {
        session &&  <Button onPress={signOut} text="Sign out" />
       
      }
      {/* <Link href={'/sign-in'} asChild>
        <Button text="Sign in" />
      </Link> */}
    </View>
  );
};

export default RootIndex;