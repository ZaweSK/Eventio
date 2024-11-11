import EventioButton from "@/src/components/EventioButton";
import Input from "@/src/components/Input";
import TextWithLink from "@/src/components/TextWithLink";
import EventioAuthHeader from "@/src/features/signIn/components/EventioAuthHeader";
import { router } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

function DefaultUserInfo() {
    return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
    };
}

const SignUpScreen = () => {
    const [userInfo, setUserInfo] = useState(DefaultUserInfo());
    const handleInputChange = (propertyName: any, propertyValue: any) => {
        setUserInfo({
          ...userInfo,
          [propertyName]: propertyValue, // Dynamically update the property
        });
      };

    return (
        <SafeAreaView style = {styles.safeArea}>
            <View id = "ActualSafeArea" style = {styles.actualSafeArea}>
                <KeyboardAwareScrollView id = "ScrollableContent" bottomOffset={40}  >
                    <View  style = {styles.eventioAuthHeader}>
                        <EventioAuthHeader  title="Get started absolutely free." subtitle="Enter your details below." />
                    </View>
                    <View style = {styles.inputContainer} >
                        <Input textContentType= 'givenName' placeholder="First name" value={userInfo.firstName} onChangeText={(input) => {handleInputChange('firstName', input)}}/>
                        <Input textContentType= 'familyName' placeholder="Last name" value={userInfo.lastName} onChangeText={(input) => {handleInputChange('lastName', input)}}/>
                        <Input textContentType = 'emailAddress' placeholder="Email" value={userInfo.email} onChangeText={(input) => {handleInputChange('email', input)}}/>
                        <Input secureEntry= {true} placeholder="Password" value={userInfo.password} onChangeText={(input) => {handleInputChange('password', input)}}/>
                        <Input secureEntry={true} placeholder="Repeat password" value={userInfo.repeatPassword} onChangeText={(input) => {handleInputChange('repeatPassword', input)}}/>
                    </View>
                </KeyboardAwareScrollView>
                <View id = "FixedContent" style = {styles.signUpContainer}>
                    <EventioButton title="SIGN UP" onPress={() => {}}  />
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
        bottom: 0,
        width: '100%',
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
        // flex: 1,
    },
});

export default SignUpScreen;