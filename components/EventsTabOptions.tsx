import TabBarIcon from '@/components/TabBarIcon';
import React, { useState } from 'react';
import { View } from 'react-native';
import ImageButton from '@/components/ImageButton';


export const EventsTabOptions = {
    title: 'Evessnts',
    headerStyle: {
      shadowOpacity: 0,
    },
    tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="code" color={color} />,
    headerRight: () => (
      <View style = {{ flexDirection: 'row', paddingRight: 20}}> 
        <ImageButton
          imageSource={require('@/assets/images/cellsLayout_1.png')} // Local image from the assets folder
          onPress={() => console.log('1')}
          imageStyle={{ width: 25, height: 25, marginRight: 10, tintColor: 'black' }
          }
        />
        <ImageButton
          imageSource={require('@/assets/images/cellsLayout_1.png')} // Local image from the assets folder
          onPress={() => console.log('1')}
          imageStyle={{ width: 25, height: 25, tintColor: 'black', opacity: 0.2 }
          }
        />
      </View>
    ),
}