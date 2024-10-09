import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import TabBarIcon from '@/components/TabBarIcon';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import { EventsTabOptions } from '@/components/tabs/EventsTabOptions';
import { ProfileTabOptions } from '@/components/tabs/ProfileTabOptions';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Inter',
        },
      }}>
      <Tabs.Screen  name = "index"  options = {EventsTabOptions} />
      <Tabs.Screen  name = "profile" options = {ProfileTabOptions} />
    </Tabs>
  );
}