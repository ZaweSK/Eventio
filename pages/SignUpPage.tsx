import EventioAuthHeader from "@/components/EventioAuthHeader";
import EventioButton from "@/components/EventioButton";
import Input from "@/components/Input";
import TextWithLink from "@/components/TextWithLink";
import { router } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpPage = () => {

    const [safeAreaSize, setSafeAreaSize] = useState({ width: 0, height: 0 });
    const [eventAuthHeaderSize, setEventAuthHeaderSize] = useState({ width: 0, height: 0 });
    const [userInfoSize, setUserInfoSize] = useState({ width: 0, height: 0 });


    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
      });

      const handleInputChange = (propertyName: any, propertyValue: any) => {
        setUserInfo({
          ...userInfo,
          [propertyName]: propertyValue, // Dynamically update the property
        });
      };
    
    return (
     <KeyboardAwareScrollView style = {styles.page} bottomOffset={20}>
        <SafeAreaView style = {styles.safeArea}>
            <EventioAuthHeader style = {styles.eventioAuthHeader} title="Get started absolutely free." subtitle="Enter your details below." />
            <View style = {styles.userInfo}>
                <Input placeholder="First name" inputValue={userInfo.firstName} onInputChanged={(input) => {handleInputChange('firstName', input)}}/>
                <Input placeholder="Last name" inputValue={userInfo.lastName} onInputChanged={(input) => {handleInputChange('lastName', input)}}/>
                <Input placeholder="Email" inputValue={userInfo.email} onInputChanged={(input) => {handleInputChange('email', input)}}/>
                <Input secureEntry= {true} placeholder="Password" inputValue={userInfo.password} onInputChanged={(input) => {handleInputChange('password', input)}}/>
                <Input secureEntry={true} placeholder="Repeat password" inputValue={userInfo.repeatPassword} onInputChanged={(input) => {handleInputChange('repeatPassword', input)}}/>
            </View>
            <View style = {styles.signUpContainer}>
                <EventioButton title="SIGN UP" onPress={() => {}} style={styles.signUpButton} />
                <TextWithLink text="Already have an account?" linkText="Sign in" onPress= {() => {router.replace('/sign-in');}} />
            </View>


        </SafeAreaView> 
     </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        width: '100%',
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        marginBottom: 0,
        flex: 1,
      },
    page: {
     backgroundColor: 'white',
    },
    safeArea: {
        flex: 1,
    },
    eventioAuthHeader: {
        marginTop: 60,
        flex: 2,
    },
    userInfo : {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
    },

    signUpContainer: {
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
        flex: 1,
    },


    signUpButton: {
        // marginTop: 20,
    },
    
});

export default SignUpPage;