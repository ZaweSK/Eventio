import { Redirect, Tabs, useRouter } from 'expo-router';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { EventsTabOptions } from '@/components/tabs/EventsTabOptions';
import { ProfileTabOptions } from '@/components/tabs/ProfileTabOptions';
import { View, } from 'react-native';
import NewEventButton from '@/components/NewEventButton';
import Animated, { Easing, SlideInDown } from 'react-native-reanimated';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const isSignedIn = false;

  if (!isSignedIn) {

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
            fontFamily: 'Inter',
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
        <Tabs.Screen  name = "index"  options = {EventsTabOptions} />
        <Tabs.Screen  name = "profile" options = {ProfileTabOptions} />
      </Tabs>

      <Animated.View 
        entering={SlideInDown.duration(1000).easing(Easing.out(Easing.back(0.5)))}> 
          <NewEventButton/> 
      </Animated.View>
    </View>
  );
}