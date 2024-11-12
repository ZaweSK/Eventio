import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/src/components/useColorScheme';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Colors from '@/src/constants/Colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Fonts from '@/src/constants/Fonts';
import { ColorSchemeName } from 'react-native';


// ===================================== PRIVATE =====================================
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryCLient = new QueryClient();

const mainStackScreenOptions =  (colorScheme: ColorSchemeName) => ({
  headerShown : true,
  headerShadowVisible: false,
  headerStyle: {
      backgroundColor: colorScheme ? Colors[colorScheme].background : 'black',
  },
});

const modalScreenOptions = (colorScheme: ColorSchemeName, title: string) => ({
  presentation: "modal" as "modal",
  title,
  headerStyle: {
    backgroundColor: colorScheme ? 'white' : 'black',
  },
  headerTitleStyle: {
    fontSize: Fonts.size.headerTitle,
    fontFamily: Fonts.family.regular
  },
});

// ===================================== COMPONENT SETUP =====================================

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

  return (
    <QueryClientProvider client={queryCLient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <KeyboardProvider>
      <Stack screenOptions={mainStackScreenOptions(colorScheme)}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }}  />
          <Stack.Screen name="not-found" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />
          <Stack.Screen name="createEvent" options={modalScreenOptions(colorScheme, 'Create new event')} />
      </Stack>
      </KeyboardProvider>
   </ThemeProvider>
  );
}

export {ErrorBoundary} from 'expo-router';
