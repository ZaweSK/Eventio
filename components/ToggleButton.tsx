import { Image, ImageStyle, Pressable, StyleProp, TextStyle, ViewStyle, StyleSheet, Text, View } from "react-native";
import React from "react";

interface ToggleButtonProps {
    isActive: boolean;
    onPress: () => void;
    image?: any;
    text?: string;
    style: StyleProp<ViewStyle>; 
    imageStyle?: StyleProp<ImageStyle>; 
    textStyle?: StyleProp<TextStyle>;
};

const ToggleButton = (props: ToggleButtonProps) => {
    return (
        <Pressable 
            onPress={props.onPress} 
            style={[props.style]}
        > 
            {props.image && 
            <View style = {{position: 'absolute', top: 0, left:0, bottom:0, right:0}}>
                <Image source={props.image} style={[props.imageStyle]} /> 
            </View>
            }
            {props.text && 
                <View style = {[{position: 'absolute', top: 0, left:0, bottom:0, right:0}, defaultStyles.centeredContent]}>
                    <Text style={[props.textStyle]}>{props.text}  </Text>
                </View>
            }
        </Pressable>
    );
}

// Styles applied to components in case of both active and inactive states
const defaultStyles = StyleSheet.create({
    // pressableContainer: {
    //     // justifyContent: 'center', // Center items vertically
    //     // alignItems: 'center', // Center items horizontally
    //     backgroundColor: 'green',
    // },

    centeredText: {
        // textAlign: 'center', // Center text horizontally
        // textAlignVertical: 'center', // For Android, center text vertically
    },

    centeredContent: {
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
    },
});

export default ToggleButton;