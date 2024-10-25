import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { router, useRouter } from 'expo-router';

const  NewEventButton = () => {
  const router = useRouter();
  return (
      <TouchableOpacity
        style={[styles.defaultStyle]}
        onPress={() => router.push('/createEvent')}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}  // Expands clickable area
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: '#323C46',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,  // Ensure it stays on top
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
    borderRadius: 33,
    width: 66,
    height: 66,
    position: 'absolute',
    bottom: 45,  // Adjust to place it above the tab bar
    left: '50%',
    transform: [{ translateX: -33 }],  // Center horizontally
  },
});

export default NewEventButton;