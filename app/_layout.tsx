import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
// import { KeyboardProvider } from '@/store/RootStore';


import useRootStore from '@/store/RootStore';
import EventsPage from '@/pages/EventsPage';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Colors from '@/constants/Colors';
import React from 'react';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   // initialRouteName: '(tabs)',

//   initialRouteName: 'sign-in',

  
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Hind-Bold': require('@/assets/fonts/Hind-Bold.ttf'),
    'Hind-Light': require('@/assets/fonts/Hind-Light.ttf'),
    'Hind-Medium': require('@/assets/fonts/Hind-Medium.ttf'),
    'Hind-Regular': require('@/assets/fonts/Hind-Regular.ttf'),
    'Hind-SemiBold': require('@/assets/fonts/Hind-SemiBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return <RootLayoutNav />;
}

function RootLayoutNav() {

  const colorScheme = useColorScheme();
  const navigation = useNavigation()
  useEffect(()=>{
    console.log(JSON.stringify(navigation.getState(), null, 2))
  }, [navigation])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <KeyboardProvider>
      <Stack screenOptions={{
        headerShown : true,
        headerShadowVisible: false,
        headerStyle: {
            backgroundColor: colorScheme ? Colors[colorScheme].background : 'black',
        },}}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />
          <Stack.Screen name="createEvent" options={{ presentation: 'modal' }} />

      </Stack>
      </KeyboardProvider>
   </ThemeProvider>
  );
}
