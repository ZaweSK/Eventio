import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import { ColorSchemeName, View } from 'react-native';
import NewEventButton from '@/src/components/NewEventButton';
import Animated, { Easing, SlideInDown } from 'react-native-reanimated';
import useAuthStore from '@/src/store/useAuthStore';
import TabBarIcon from '@/src/components/TabBarIcon';
import Fonts from '@/src/constants/Fonts';

// ===============================  PRIVATE ===============================
const getScreenOptions = (colorScheme: ColorSchemeName) => ({
  tabBarShowLabel: false,
  tabBarActiveTintColor: Colors[colorScheme ?? "light"].tabIconSelected,
  headerShown: false,
  headerTitleStyle: {
    fontSize: Fonts.size.headerTitle,
    fontFamily: Fonts.family.regular,
  },
  headerStyle: {
    backgroundColor: Colors[colorScheme ?? "light"].background,
    shadowOpacity: 0,
  },
  tabBarStyle: {
    height: 130,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 5,
  },
});

// Tab options for each specific tab
const getTabOptions = ({headerShown, title, colorScheme}: {headerShown: boolean, title: string, colorScheme: ColorSchemeName}) => {
  const headerBackground = colorScheme ? Colors[colorScheme].background : 'white';
  return {
    headerShown: headerShown,
    title: title, 
    headerStyle: {
      shadowOpacity: 0,
      backgroundColor: headerBackground,
    },
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
      <TabBarIcon
        svgImage={title === 'Events' ? 'calendar' : 'profile'}
        color={color}
        size={focused ? 35 : 30}
      />
    ),
  };
};


//================================================= COMPONENT =================================================
export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const isAuthorized = useAuthStore((state) => state.isSignedIn);
  if (!isAuthorized) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Tabs screenOptions={getScreenOptions(colorScheme)}>
        <Tabs.Screen name="events" options={getTabOptions({headerShown: false, title: 'Events', colorScheme })} />
        <Tabs.Screen name="profile" options={getTabOptions({headerShown: true, title: 'Profile', colorScheme})} />
      </Tabs>
      <Animated.View entering={SlideInDown.duration(1000).easing(Easing.out(Easing.back(0.5)))}>
        <NewEventButton />
      </Animated.View>
    </View>
  );
}