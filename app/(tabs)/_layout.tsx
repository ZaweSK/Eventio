import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import TabBarIcon from '@/components/TabBarIcon';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import { EventsTabOptions } from '@/components/tabs/EventsTabOptions';
import { ProfileTabOptions } from '@/components/tabs/ProfileTabOptions';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { Button, View, StyleSheet, Text } from 'react-native';
import NewEventButton from '@/components/NewEventButton';
import Animated, { Easing, FadeIn, SlideInDown, SlideInLeft, SlideInUp } from 'react-native-reanimated';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style = { {flex: 1}}>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: 'red',
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'Inter',
          },
          tabBarStyle: {
            height: 130, 
            shadowColor: '#000', // Black shadow
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