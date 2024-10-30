import { GestureResponderEvent, ImageStyle, StyleProp, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";


interface ImageButtonProps {
    imageSource: any; // Can be a URI or a require() asset
    imageStyle?: StyleProp<ImageStyle>; // Optional custom style for the image
    onPress: (event: GestureResponderEvent) => void; // Function to handle the press event
  }
  
  export default function ImageButton(props: ImageButtonProps) {
    return (
    <View>
        <TouchableOpacity onPress={props.onPress}>
            <Image source = {props.imageSource} style={props.imageStyle} />
        </TouchableOpacity>
    </View>
    );
  }