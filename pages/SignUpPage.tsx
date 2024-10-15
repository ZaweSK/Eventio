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

      console.log(safeAreaSize, eventAuthHeaderSize, userInfoSize)
    
    return (
        <SafeAreaView style = {styles.safeArea}>
            <View id = "ActualSafeArea" style = {styles.actualSafeArea}>
                <KeyboardAwareScrollView id = "ScrollableContent" bottomOffset={40}  >
                    <View  style = {styles.eventioAuthHeader}>
                        <EventioAuthHeader  title="Get started absolutely free." subtitle="Enter your details below." />
                    </View>
                    <View style = {styles.inputContainer} >
                        <Input placeholder="First name" inputValue={userInfo.firstName} onInputChanged={(input) => {handleInputChange('firstName', input)}}/>
                        <Input placeholder="Last name" inputValue={userInfo.lastName} onInputChanged={(input) => {handleInputChange('lastName', input)}}/>
                        <Input placeholder="Email" inputValue={userInfo.email} onInputChanged={(input) => {handleInputChange('email', input)}}/>
                        <Input secureEntry= {true} placeholder="Password" inputValue={userInfo.password} onInputChanged={(input) => {handleInputChange('password', input)}}/>
                        <Input secureEntry={true} placeholder="Repeat password" inputValue={userInfo.repeatPassword} onInputChanged={(input) => {handleInputChange('repeatPassword', input)}}/>
                    </View>
                </KeyboardAwareScrollView>
                <View id = "FixedContent" style = {styles.signUpContainer}>
                    <EventioButton title="SIGN UP" onPress={() => {}} style={styles.signUpButton} />
                    <TextWithLink text="Already have an account?" linkText="Sign in" onPress= {() => {router.replace('/sign-in');}} />
                </View>
            </View>
     </SafeAreaView> 
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
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    actualSafeArea: {
        flex: 1,
    },
    eventioAuthHeader: {
        marginTop: 56,
    },
    inputContainer : {
        padding: 24,
    },

    signUpContainer: {
        position: 'absolute',
        // bottom: 0,
        bottom: 24,
        width: '100%',
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
        // flex: 1,
    },


    signUpButton: {
        // marginTop: 20,
    },
    
});

export default SignUpPage;