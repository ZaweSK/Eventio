import React, { useEffect, useState, forwardRef } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity, Text, TextInputProps } from "react-native";
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Fonts from "@/src/constants/Fonts";

const focusedSeparatorOpacity = 0.9;
const notFocusedSeparatorOpacity = 0.2;

interface InputProps extends TextInputProps {
  secureEntry?: boolean;
  error?: string | null;
}

const Input = forwardRef<TextInput, InputProps>((
  {
    secureEntry = false,
    error,
    ...textInputProps // Collect remaining props passed to TextInput
  },
  ref
) => {
  
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(secureEntry);

  // Separator opacity animation
  const animatedOpacity = useSharedValue(notFocusedSeparatorOpacity);
  const animatedSeparatorStyle = useAnimatedStyle(() => ({
      opacity: animatedOpacity.value,
  }));

  useEffect(() => { 
    animatedOpacity.value = withTiming(isFocused || error != null ? focusedSeparatorOpacity : notFocusedSeparatorOpacity, { duration: 400 });
  }, [error, isFocused]);
  
  const toggleSecureEntry = () => {
      setSecureText(!secureText);
  };

  // Separator color based on error state
  const separatorColor = error ? styles.separatorErrorColor : styles.separatorDefaultColor;

  return (
    <View style={styles.container}>
       <TextInput
        ref={ref}
        style={[styles.input, textInputProps.style]} // Apply passed-in style along with default styles
        secureTextEntry={secureText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...textInputProps} // Spread remaining TextInput props here
      />
      
      <Animated.View style={[styles.separator, separatorColor, animatedSeparatorStyle]} />
      
      {error && (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.errorContainer}>
             <Text style={styles.error}>{error}</Text>
          </Animated.View>
      )} 
      
      {secureEntry && (
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.secureTextButton}>
           <Ionicons name={secureText ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
      )}
    </View>
  );
})

const styles = StyleSheet.create({
    container : {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 20,
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 5,
        borderColor: '#ddd',
        borderRadius: 8,
        fontSize: 16,
        marginHorizontal: 20,
        marginLeft: 20,
        fontFamily: Fonts.family.regular,
    },
    separator: {
        width: '100%',
        height: 1,
    },
    separatorDefaultColor: {
        backgroundColor: 'black',
    },
    separatorErrorColor: {
        backgroundColor: '#F40000',
    },
    secureTextButton: {
        opacity: 0.5,
        position: 'absolute',
        width: 24,
        height: 24,
        right: 25,
        top: 10,
    },
    errorContainer: {
        position: 'absolute',
        bottom: -21,
        width: '100%',
    },
    error: {
        fontSize: 12,
        color: '#F40000',
        width: '100%',
        textAlign: 'left',
        opacity: 0.85,
        fontFamily: Fonts.family.regular,
    },
});

export default Input;