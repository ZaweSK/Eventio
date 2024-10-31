import ToggleButton from "@/src/components/ToggleButton";
import Colors from "@/src/constants/Colors";
import useEventsStore from "@/src/store/useEventsStore";
import { Stack } from "expo-router";
import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";

export default function EventsTabLayout() {
    const cellLayout = useEventsStore(state => state.eventsLayout);
    const setCellLayout = useEventsStore(state => state.setEventsLayout);
    const colorScheme = useColorScheme();


    return (
      <Stack>
        <Stack.Screen
          name="index" // Default Testers List screen (testers/index.tsx)
          options={{ 
            headerShown: true,
            title: 'Events',
            headerShadowVisible: false,
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: colorScheme ? Colors[colorScheme].background : 'black',
            },
           headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'Hind-Regular',
            },
            headerRight: () => (
                <View style = {styles.headerRightContainer}>
                 <ToggleButton
                      isActive={cellLayout === 'default'}
                      onPress={() => setCellLayout('default')}
                      image={require('@/assets/images/cellsLayout_1.png')}
                      style= {[styles.toggleButton, {marginRight: 10}]}
                      imageStyle={[styles.toggleButtonImage, cellLayout === 'default' ? styles.toggleButtonImageActive : styles.toggleButtonImageInactive]}
                    />
                  <ToggleButton
                      isActive={cellLayout === 'compact'}
                      onPress={() => setCellLayout('compact')}
                      image={require('@/assets/images/cellsLayout_2.png')}
                      style= {styles.toggleButton}
                      imageStyle={[styles.toggleButtonImage, cellLayout === 'compact' ? styles.toggleButtonImageActive : styles.toggleButtonImageInactive]}
                    />
               </ View>
              )
             }}
        />

    <Stack.Screen name="[id]" options={{ 
            headerShown: true,
            headerTintColor: '#000',
            headerBackTitleVisible: false, 
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colorScheme ? Colors[colorScheme].background : 'black',
            },
            title: 'Event Detail',
            headerTitleStyle: {
              fontSize: 18,
              fontFamily: 'Hind-Regular',
            },
            headerBackImageSource: require('@/assets/images/backButton.png'),
        
          }} />
     </Stack>
    );
  }


//   return
const styles = StyleSheet.create({
    headerRightContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: 20,
    },
    toggleButton: {
      width: 25,
      height: 25,
    },
    toggleButtonImage: {
      width: 25,
      height: 25,
      tintColor: 'black',
    },
    toggleButtonImageInactive: {
      opacity: 0.2,
    },
    toggleButtonImageActive: {
      opacity: 1, 
    },
  });
//    {
//     title: 'Events',
//     tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => <TabBarIcon image={require('@/assets/images/tabIcon_events.png')} color={color} size={focused ? 35 : 30}/>,
//     headerRight: () => (
//       <View style = {styles.headerRightContainer}>
//        <ToggleButton
//             isActive={cellLayout === 'default'}
//             onPress={() => setCellLayout('default')}
//             image={require('@/assets/images/cellsLayout_1.png')}
//             style= {[styles.toggleButton, {marginRight: 10}]}
//             imageStyle={[styles.toggleButtonImage, cellLayout === 'default' ? styles.toggleButtonImageActive : styles.toggleButtonImageInactive]}
//           />
//         <ToggleButton
//             isActive={cellLayout === 'compact'}
//             onPress={() => setCellLayout('compact')}
//             image={require('@/assets/images/cellsLayout_2.png')}
//             style= {styles.toggleButton}
//             imageStyle={[styles.toggleButtonImage, cellLayout === 'compact' ? styles.toggleButtonImageActive : styles.toggleButtonImageInactive]}
//           />
//      </ View>
//     )
//   }