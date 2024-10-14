import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import EventioButton from '@/components/EventioButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/Input';
import TextWithLink from '@/components/TextWithLink';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    // Handle sign-in logic
    // Example error:
    setErrorMessage("Oops! That email and password combination is not valid.");
  };

  return (
    <SafeAreaView style = {styles.safeArea}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <View style={styles.centeredContent}>
          <Text style={styles.logo}>E.</Text>
          <Text style={styles.title}>Sign in to Eventio.</Text>
          <Text style={styles.subtitle}>Enter your details below.</Text>
          <Input placeholder="Email" inputValue={email} onInputChanged={(input) => {setEmail(input)}}/>
          <Input placeholder="Password"  error = {"fd"} secureEntry ={true} inputValue={password} onInputChanged={(input) => {setPassword(input)}}/>
        </View>

        <KeyboardAvoidingView keyboardVerticalOffset={70} style={styles.keyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
          <EventioButton title="SIGN IN"onPress={handleSignIn} style={styles.signInButton} />
          <TextWithLink text="Don't have an account?" linkText="Sign up" onPress= {() => {}} />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60, 
  },
  logo: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  keyboardAvoidingView: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  signInButton: {
    // backgroundColor: '#28C76F',
    paddingVertical: 15,
    borderRadius: 8,
  },
});

export default SignInScreen;