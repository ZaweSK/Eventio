import { Redirect, Tabs, usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import { View, } from 'react-native';
import NewEventButton from '@/src/components/NewEventButton';
import Animated, { Easing, SlideInDown } from 'react-native-reanimated';
import useAuthStore from '@/src/store/useAuthStore';
import { EventsTabOptions } from '@/src/features/events/EventsTabOptions';
import { ProfileTabOptions } from '@/src/features/profile/ProfileTabOptions';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const path = usePathname();
  console.log("🟣 ~ file: _layout.tsx:17 ~ path:", path)
  

  const isAutorised = useAuthStore((state) => state.isSignedIn);
  if (!isAutorised) {
    return <Redirect href="/sign-in" />
  }

  return (
    <View style = { {flex: 1}}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
          headerShown: useClientOnlyValue(false, true),
          // headerShown: false,
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'Hind-Regular',
          },

          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background, 
            shadowOpacity: 0// Header background color
          },
          tabBarStyle: {
            height: 130, 
            shadowColor: '#000', // Black shadowsla
            shadowOffset: { width: 0, height: -2 }, // Offset to make shadow appear above
            shadowOpacity: 0.2, // Adjust shadow transparency
            shadowRadius: 30, // Spread of shadow
            elevation: 5, // For Android (sets the shadow)
          },
        }}>
                  {/* <Tabs.Screen  name = "index" /> */}
        <Tabs.Screen  name = "events" options = {EventsTabOptions}/>
        <Tabs.Screen  name = "profile" options = {ProfileTabOptions} />

      </Tabs>

      <Animated.View 
        entering={SlideInDown.duration(1000).easing(Easing.out(Easing.back(0.5)))}> 
          <NewEventButton/> 
      </Animated.View>
    </View>
  );
}