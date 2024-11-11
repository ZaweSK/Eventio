import React, { useEffect, useState, forwardRef } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Fonts from "@/src/constants/Fonts";
import { TextContentType } from "@/src/types/TextContentType";

interface InputProps {
    inputValue: string;
    onInputChanged: (text: string) => void;
    onSubmitEditing?: () => void;
    onFocus?: () => void;
    placeholder?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    secureEntry?: boolean;
    error?: string | null;
    textContentType?: TextContentType;
}

// Define the props type with ref support
type RefInputProps = InputProps & React.RefAttributes<TextInput>;

const focusedSeparatorOpacity = 0.9;
const notFocusedSeparatorOpacity = 0.2;

const Input = forwardRef<TextInput, InputProps>((
  {
    keyboardType = 'default',
    secureEntry = false,
    placeholder = '',
    onInputChanged,
    inputValue,
    error,
    onFocus = () => {},
    onSubmitEditing = () => {},
    textContentType = 'oneTimeCode',
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Separator opacity animation
  const animatedOpacity = useSharedValue(notFocusedSeparatorOpacity);
  const animatedSeparatorStyle = useAnimatedStyle(() => ({
      opacity: animatedOpacity.value,
  }));

  useEffect(() => { 
    animatedOpacity.value = withTiming(isFocused || error != null ? focusedSeparatorOpacity : notFocusedSeparatorOpacity, { duration: 400 });
  }, [error, isFocused]);
  
  // Secure text entry
  const [secureText, setSecureText] = useState(secureEntry);
  const toggleSecureEntry = () => {
      setSecureText(!secureText);
  };

  // Separator color
  const separatorColor = error ? styles.separatorErrorColor : styles.separatorDefaultColor;

  return (
    <View style={styles.container}>
       <TextInput
        ref={ref} // Forward the ref here
        style={styles.input}
        value={inputValue}
        autoCapitalize="none"
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureText}
        onChangeText={onInputChanged}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => {
          setIsFocused(true);
          onFocus();
        }}
        onBlur={() => setIsFocused(false)}
        textContentType={textContentType}
        autoComplete="off"
        autoCorrect={false}
        spellCheck={false}
        returnKeyType="next"
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
}) as (props: RefInputProps) => JSX.Element; // This allows the type to support ref

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