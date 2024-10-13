import { TouchableOpacity, StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";

interface EventioButtonProps {
    onPress: () => void;
    style?: ViewStyle | ViewStyle[];  // Accept custom style for the button
    title: string;  // Button text
  }

const EventioButton = (props: EventioButtonProps) => {
    return (
        <View style = {[styles.container, props.style]}>
           <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>{props.title}</Text>
           </TouchableOpacity>
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    button: {
      flex : 1,
      backgroundColor: '#28C76F', // Green background
      borderRadius: 8,           // Rounded corners
      alignItems: 'center',   
      justifyContent: 'center',    // Center the text
      width: '100%',              // Full width of the button
    },
    buttonText: {
      color: 'white',             // White text color
      fontWeight: 'bold',         // Bold font
      fontSize: 16,               // Font size
    },
  });

export default EventioButton;