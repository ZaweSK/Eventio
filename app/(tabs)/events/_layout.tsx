import { Stack } from "expo-router";

export default function EventsTabLayout() {
    return (
      <Stack>
        <Stack.Screen
          name="index" // Default Testers List screen (testers/index.tsx)
          options={{ title: 'Testers List', headerShown: true }}
        />

    <Stack.Screen name="[id]" options={{ 
            headerShown: true,
            headerTintColor: '#000',
            headerBackTitleVisible: false, 
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