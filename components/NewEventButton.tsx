import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const  NewEventButton = () => {
  return (
      <TouchableOpacity
        style={[styles.defaultStyle]}
        onPress={() => console.log('FAB Pressed')}
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
    borderRadius: 40,
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: 40,  // Adjust to place it above the tab bar
    left: '50%',
    transform: [{ translateX: -40 }],  // Center horizontally
  },
});

export default NewEventButton;