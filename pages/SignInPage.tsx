import Input from "@/components/Input";
import { useState } from "react";
import { View, StyleSheet, Image, Text, SafeAreaView, TextInput } from "react-native";


const SingInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
  }

  return (
    <SafeAreaView style={styles.safeArea}>

    <View style = {styles.page}>
        <Image source={require('@/assets/images/appLogo.png')} style = {styles.logoImage}  /> 
        <Text style={styles.title}>Sign in to Eventio.</Text>
        <Text style={styles.subtitle}>Enter your details below.</Text>
        <Input placeholder="Email" inputValue={email} onInputChanged={(input) => {setEmail(input)}}/>
        <Input placeholder="Password" inputValue={password} onInputChanged={(input) => {setPassword(input)}} />

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // Set background to white
  },

    page : {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoImage: {
      width: 40,
      height: 40,
    },
    title: {
      marginTop: 50,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: 'gray',
      marginBottom: 20,
      textAlign: 'center',
    },
    
    input: {
      width: '90%',
      padding: 15,
      // borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      // marginBottom: 10,
      fontSize: 16,
      marginHorizontal: 20,
      marginLeft: 20,
    },

})


export default SingInPage;