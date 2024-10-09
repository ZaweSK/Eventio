import TabBarIcon from '@/components/TabBarIcon';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ImageButton from '@/components/ImageButton';
import ToggleButton from '@/components/ToggleButton'; // Add this line
import { CellLayout } from '@/constants/CellLayout';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


export const EventsTabOptions = () => {
  
  const [cellLayout, setCellLayout] = useState<CellLayout>('default');
  const chaneLayout = (cellLayout: CellLayout) => {
    setCellLayout(cellLayout);
  }

  return {
    title: 'Evessnts',
    headerStyle: {
      shadowOpacity: 0,
    },
    tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="code" color={color} />,
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

