import { Image, ImageProps, ImageStyle, Pressable, StyleProp, TextStyle, ViewStyle, StyleSheet, Text } from "react-native"


interface ToggleButtonProps {
    isActive: boolean;
    onPress: () => void;
    image?: any;
    text?: string;
    style: StyleProp<ViewStyle>; 
    imageStyle?: StyleProp<ImageStyle>; 
    textStyle?:  StyleProp<TextStyle>;
};

const ToogleButton = (props: ToggleButtonProps) => {
    

    return (
        <Pressable 
            onPress = {props.onPress} 
            style = {[defaultStyles.pressableContainer, props.style]}
        > 
            {props.image && <Image source = {props.image} style = {[props.imageStyle, defaultStyles.cenntereContent]} /> }
            {props.text && <Text style = {[props.textStyle, defaultStyles.cenntereContent]}>{props.text}</Text>}   
        </Pressable>
    );
}

// Styles applied to components in case of both active and inactive states
const defaultStyles = StyleSheet.create({
    pressableContainer: {
        // flex: 1,
    },
    cenntereContent: {
        position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: [{ translateX: '-50%' }, { translateY: '-50%' }], // Percentage-based centering
      }
})

export default ToogleButton;