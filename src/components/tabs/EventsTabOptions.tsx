import TabBarIcon from '@/src/components/TabBarIcon';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ImageButton from '@/src/components/ImageButton';
import ToggleButton from '@/src/components/ToggleButton'; // Add this line
import { CellLayout } from '@/src/constants/CellLayout';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import useEventsStore from '@/src/store/useEventsStore';


export const EventsTabOptions = () => {
  const cellLayout = useEventsStore(state => state.eventsLayout);
  const setCellLayout = useEventsStore(state => state.setEventsLayout);

  return { 
    headerShown: false,
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => <TabBarIcon image={require('@/assets/images/tabIcon_events.png')} color={color} size={focused ? 35 : 30}/>
  }
  
  return {
    title: 'Events',
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => <TabBarIcon image={require('@/assets/images/tabIcon_events.png')} color={color} size={focused ? 35 : 30}/>,
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
  }
}

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
