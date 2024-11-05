import Fonts from "@/src/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { TextInput, View, StyleSheet, Keyboard, TouchableOpacity, Text } from "react-native"
import Animated, { FadeIn, FadeInDown, FadeInUp, SlideInDown, SlideInUp, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface InputProps {
    inputValue: string;
    onInputChanged: (text: string) => void;
    onFocus?: () => void;
    placeholder?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    secureEntry?: boolean;
    error?: string | null;
}

const focusedSeparatorOpacity = 0.9;
const notFocusedSeparatoOpacity = 0.2;

const Input = ({
    keyboardType = 'default',
    secureEntry = false,
    placeholder = '',
    onInputChanged,
    inputValue,
    error,
    onFocus = () => {} 
  }
  : InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
  
    // Separator opacity animation
    var animatedOpacity = useSharedValue(notFocusedSeparatoOpacity);
    const animatedSeparatorStyle = useAnimatedStyle(() => {
        return { 
          opacity: animatedOpacity.value, 
         }
    })

    useEffect(() => { 
      animatedOpacity.value = withTiming(isFocused || error != null ? focusedSeparatorOpacity : notFocusedSeparatoOpacity, { duration: 400 });
    }, [error, isFocused])
  
    // Secure text entry
    const [secureText, setSecureText] = useState(secureEntry);
    const toggleSecureEntry = () => {
        setSecureText(!secureText);
    };

    // Separator color
    const separatorColor = error ? styles.separatorErrorColor : styles.separatorDefaulColor;

    return (
      <View style = {styles.container}>
         <TextInput
          style={styles.input}
          value={inputValue}
          autoCapitalize="none"
          placeholder= {placeholder}
          keyboardType= {keyboardType}
          secureTextEntry= {secureText}
          onChangeText={(text) => onInputChanged(text)}
          onFocus={() => {
            setIsFocused(true);
            onFocus();
          }}
          onBlur={() => {
            setIsFocused(false);
        }}
          textContentType= "oneTimeCode"
          autoComplete= "off"
          autoCorrect= {false}
          spellCheck={false}
        />
        
        <Animated.View style = {[styles.separator, separatorColor, animatedSeparatorStyle]} />
        {error && (
            <Animated.View entering={FadeInUp.duration(500)} style = {styles.errorContainer}>
               <Text style = {styles.error}>{error}</Text>
            </Animated.View>
            
        )} 
        {secureEntry && (
            <TouchableOpacity onPress={toggleSecureEntry} style={styles.secureTextButton}>
             <Ionicons name={secureText ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
        )}
      </ View>

    ) 
  }

const styles = StyleSheet.create({
    container : {
        width: '100%',
        // paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 20,
    },

    input: {
        // backgroundColor: 'lightgray',
        width: '100%',
        height: 40,
        marginBottom: 5,
        // borderWidth: 1,
    //   padding: 15,
      // borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      // marginBottom: 10,
      fontSize: 16,
      marginHorizontal: 20,
      marginLeft: 20,
      fontFamily: Fonts.family.regular
      },

      separator : {
        width: '100%',
        height: 1,
      },
      separatorDefaulColor: {
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
        // marginTop: 8,
        width: '100%',
      },
      error: {
        fontSize: 12,
        color: '#F40000',
        width: '100%',
        textAlign: 'left',
        opacity: 0.85,
        fontFamily: Fonts.family.regular
      }
  })

export default Input;