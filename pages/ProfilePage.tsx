import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import useAuthStore from '@/store/AuthStore';
import { router } from 'expo-router';

export default function ProfilePage() {
  const singOut = useAuthStore((state) => state.signOut);
  const handleSingOut = async () => {
    console.log('Signing out...');
    await singOut();
    router.replace('/sign-in');
  }

  return (
    <View style={styles.container}>
      <Button onPress ={handleSingOut} title="SIGN OUT"/> 
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
