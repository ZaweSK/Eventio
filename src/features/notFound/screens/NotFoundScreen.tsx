import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import EventioButton from '@/src/components/EventioButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SVGImage } from '@/src/components/SVGImage';
import Fonts from '@/src/constants/Fonts';
import Ionicons from '@expo/vector-icons/build/Ionicons';

const NotFoundScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
          <Ionicons name='alert-circle-outline' size={50} color="gray" />
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.subtitle}>Something went wrong, please try again</Text>
        <EventioButton style={styles.button} title="Try again" onPress={() => {}}  colorOverride='#323C46'/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  button: {
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20, 
    textAlign: 'center',
    color: Fonts.color.primary,
    fontFamily: Fonts.family.regular
  },
  subtitle: {
    fontSize: 16,
    color: Fonts.color.secondary,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: Fonts.family.regular

  }
});

export default NotFoundScreen;