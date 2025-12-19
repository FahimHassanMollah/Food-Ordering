import { useAuth } from '@/providers/AuthProvider';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AuthLayout() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session, router]);

  return <Stack />;
};