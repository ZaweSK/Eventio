import Fonts from "@/src/constants/Fonts";
import { TouchableOpacity, StyleSheet, Text, View, ViewStyle } from "react-native";

interface EventioButtonProps {
    onPress: () => void;
    style?: ViewStyle | ViewStyle[];  // Accept custom style for the button
    title: string;  // Button text
    colorOverride?: string; // Optional color override
}

const EventioButton = (props: EventioButtonProps) => {
    const buttonBackgroundColor = props.colorOverride || '#28C76F';

    return (
        <View style={[styles.container, props.style]}>
           <TouchableOpacity style={[styles.button, { backgroundColor: buttonBackgroundColor }]} onPress={props.onPress}>
                <Text style={styles.buttonText}>{props.title}</Text>
           </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 8,           // Rounded corners
        alignItems: 'center',   
        justifyContent: 'center',    // Center the text
        width: '100%',              // Full width of the button
    },
    buttonText: {
        color: 'white',             // White text color
        fontSize: 16,
        fontFamily: Fonts.family.bold,
    },
});

export default EventioButton;