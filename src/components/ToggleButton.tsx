import { Image, ImageStyle, Pressable, StyleProp, TextStyle, ViewStyle, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SVGImageName } from "@/assets/svg/SVGImageName";
import { SVGImage } from "@/assets/svg/SVGImage";
import { SvgProps } from "react-native-svg";

interface ToggleButtonProps {
    isActive: boolean;
    onPress: () => void;
    svgImage?: SVGImageName;
    text?: string;
    style: StyleProp<ViewStyle>; 
    svgImageProps?: SvgProps; 
    textStyle?: StyleProp<TextStyle>;
};

const ToggleButton = (props: ToggleButtonProps) => {
    return (
        <Pressable 
            onPress={props.onPress} 
            style={[props.style]}
        > 
            {props.svgImage && 
            <View style = {{position: 'absolute', top: 0, left:0, bottom:0, right:0}}>
                {/* <Image source={props.image} style={[props.imageStyle]} />  */}
                <SVGImage name= {props.svgImage}  {...props.svgImageProps} /> 
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
    centeredText: {
    },

    centeredContent: {
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
    },
});

export default ToggleButton;