import { Redirect, Tabs, usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import { View, } from 'react-native';
import NewEventButton from '@/src/components/NewEventButton';
import Animated, { Easing, SlideInDown } from 'react-native-reanimated';
import useAuthStore from '@/src/store/useAuthStore';
import TabBarIcon from '@/src/components/TabBarIcon';
import Fonts from '@/src/constants/Fonts';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const path = usePathname();
  console.log("🟣 ~ file: _layout.tsx:17 ~ path:", path)
  

  const isAutorised = useAuthStore((state) => state.isSignedIn);
  if (!isAutorised) {
    return <Redirect href="/sign-in" />
  }

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tabIconSelected,
          headerShown: useClientOnlyValue(false, true),
          // headerShown: false,
          headerTitleStyle: {
            fontSize: Fonts.size.headerTitle,
            fontFamily: Fonts.family.regular
          },

          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
            shadowOpacity: 0, // Header background color
          },
          tabBarStyle: {
            height: 130,
            shadowColor: "#000", // Black shadowsla
            shadowOffset: { width: 0, height: -2 }, // Offset to make shadow appear above
            shadowOpacity: 0.2, // Adjust shadow transparency
            shadowRadius: 30, // Spread of shadow
            elevation: 5, // For Android (sets the shadow)
          },
        }}
      >

        <Tabs.Screen
          name="events"
          options={{
            headerShown: false,
            tabBarIcon: ({color,focused,}: {color: string;focused: boolean;}) => (
              <TabBarIcon
                image={require("@/assets/images/tabIcon_events.png")}
                color={color}
                size={focused ? 35 : 30}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerStyle: {
              shadowOpacity: 0,
              backgroundColor: colorScheme ? Colors[colorScheme].background : 'black',
        
            },
            
            tabBarIcon: ({color,focused,}: {color: string; focused: boolean}) => (
              <TabBarIcon
                image={require("@/assets/images/tabIcon_profile.png")}
                color={color}
                size={focused ? 35 : 30}
              />
            ),
          }}
        />
      </Tabs>

      <Animated.View
        entering={SlideInDown.duration(1000).easing(
          Easing.out(Easing.back(0.5))
        )}
      >
        <NewEventButton />
      </Animated.View>
    </View>
  );
}