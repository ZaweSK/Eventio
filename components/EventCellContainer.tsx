import React from "react"
import { View, StyleSheet, Pressable } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface EventCellContainerProps {
    onPress?: () => void;
    children: React.ReactNode;
}

const EventCellContainer: React.FC<EventCellContainerProps> = (props: EventCellContainerProps) => {
    const animatedScale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {  transform: [{scale: animatedScale.value }]  }
    })
    const animateScale = (isPressed: boolean) => { 
        if (props.onPress === undefined) return;
        animatedScale.value = withTiming(isPressed ? 0.985 : 1, { duration: 100 });
    }

    return (
        <Pressable onPress={props.onPress} onPressIn={() => animateScale(true)} onPressOut={() => {animateScale(false)}}>
            <Animated.View style={[styles.cell, animatedStyle] }>
                {props.children}
            </Animated.View>
        </Pressable>
    )    
}

const styles = StyleSheet.create({
    cell: {
        padding: 20,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 8,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        // Shadow for Android
        elevation: 3, 
        
        transform: [{scale: 1.05}],
    }
})

export default EventCellContainer;