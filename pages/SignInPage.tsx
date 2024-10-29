import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, ActivityIndicator } from 'react-native';
import EventioButton from '@/components/EventioButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/Input';
import TextWithLink from '@/components/TextWithLink';
import { router } from 'expo-router';
import EventioAuthHeader from '@/components/EventioAuthHeader';
import useAuthStore from '@/store/AuthStore';

const SignInScreen = () => {
  // const [email, setEmail] = useState('brucebanner@strv.com');
  // const [password, setPassword] = useState('kill3r');

  const [email, setEmail] = useState('steverogers@strv.com');
  const [password, setPassword] = useState('am3riCa');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = useAuthStore((state) => state.signIn);
  const handleSignIn = async () => {
    setLoading(true);
    console.log('Signing in...');
    try {
      await signIn(email, password);  // Call signIn with username and password
      console.log('Sign-in successful');
      setLoading(false)
      router.replace('/(tabs)/events');
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  return (
    <SafeAreaView style = {styles.safeArea}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style = {styles.container}>
        <View>
          <View style = {styles.eventioAuthHeader}>
              <EventioAuthHeader  title="Sign in to Eventio." subtitle="Enter your details below." />
          </View>
          <View style={styles.inputContainer}>
            <Input placeholder="Email" inputValue={email} onInputChanged={(input) => {setEmail(input)}}/>
            <Input placeholder="Password" secureEntry ={true} inputValue={password} onInputChanged={(input) => {setPassword(input)}}/>
          </View>
        </View>
        <KeyboardAvoidingView keyboardVerticalOffset={70} style={styles.keyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
          <EventioButton title="SIGN IN" onPress={() => {
            handleSignIn()}}  />
          <TextWithLink text="Don't have an account?" linkText="Sign up" onPress= {() => {router.replace('/sign-up');}} />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
    {loading && (
      <View style = {{position: 'absolute', top:0, bottom:0, left: 0, right: 0,  justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size= 'large'/>
    </View>
    )}
    
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
  eventioAuthHeader: {
    marginTop: 56
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30, 
    paddingHorizontal: 24,
  },
  logo: {
    width: 40,
    height: 40,
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
 
  keyboardAvoidingView: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
});

export default SignInScreen;