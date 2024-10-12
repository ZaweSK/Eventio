import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native"

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
    return (
      <View style = {styles.container}>
         <TextInput
          style={styles.input}
          placeholder= {placeholder}
          keyboardType= {keyboardType}
          autoCapitalize="none"
          value={inputValue}
          onChangeText={(text) => onInputChanged(text)}
        />
        <View style = {styles.separator} />
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