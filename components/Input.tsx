import { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Keyboard } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface InputProps {
    inputValue: string;
    onInputChanged: (text: string) => void;
    placeholder?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const Input = ({
    placeholder = '',
    keyboardType = 'default',
    inputValue,
    onInputChanged,   
  }
  : InputProps) => {

    var animatedOpacity = useSharedValue(0.2);
    const animatedSeparatorStyle = useAnimatedStyle(() => {
        return { 
          opacity: animatedOpacity.value, 
         }
    })
    const handleOpacityAnimation = (isFocused: boolean) => { 
        animatedOpacity.value = withTiming(isFocused ? 0.9 : 0.2, { duration: 400 });
    }
  

    return (
      <View style = {styles.container}>
         <TextInput
          style={styles.input}
          value={inputValue}
          autoCapitalize="none"
          placeholder= {placeholder}
          keyboardType= {keyboardType}
          onChangeText={(text) => onInputChanged(text)}
          onFocus={() => {
            handleOpacityAnimation(true)}
        }
          onBlur={() => handleOpacityAnimation(false)}
        />



        <Animated.View style = {[styles.separator, animatedSeparatorStyle]} />
      </ View>
  
    ) 
  }

const styles = StyleSheet.create({
    container : {
        width: '100%',
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 20,
    },

    input: {
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
      },

      separator : {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
      }
  })

export default Input;