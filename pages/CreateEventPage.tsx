import EventioButton from '@/components/EventioButton';
import Input from '@/components/Input';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useColorScheme, View, Text, StatusBar, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

function DefaultUserInfo() {
    return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
    };
}

const CreateEventPage = () => {
    StatusBar.setBarStyle('light-content');
    const [userInfo, setUserInfo] = useState(DefaultUserInfo());
    
    const handleInputChange = (propertyName: any, propertyValue: any) => {
        setUserInfo({
            ...userInfo,
            [propertyName]: propertyValue, // Dynamically update the property
        });
    };
    
    const colorScheme = useColorScheme();
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAwareScrollView 
                id="ScrollableContent" 
                // bottomOffset={0} 
                style={{ padding: 20}}
                contentContainerStyle={styles.scrollContentContainer}
            >
                <Input placeholder="First name" inputValue={userInfo.firstName} onInputChanged={(input) => handleInputChange('firstName', input)} />
                <Input placeholder="Last name" inputValue={userInfo.lastName} onInputChanged={(input) => handleInputChange('lastName', input)} />
                <Input placeholder="Email" inputValue={userInfo.email} onInputChanged={(input) => handleInputChange('email', input)} />
                <Input secureEntry={true} placeholder="Password" inputValue={userInfo.password} onInputChanged={(input) => handleInputChange('password', input)} />
                <Input secureEntry={true} placeholder="Repeat password" inputValue={userInfo.repeatPassword} onInputChanged={(input) => handleInputChange('repeatPassword', input)} />

                {/* Button container should flex to fill remaining space */}
                <View id="buttonContainer" style={styles.buttonContainer}>
                    <EventioButton title="SIGN UP" onPress={() => {}} style={styles.signUpButton} />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContentContainer: {
        flexGrow: 1, // Ensures the scrollview takes up the full height
        justifyContent: 'space-between', // Space between inputs and button
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        flex: 1, // Ensures the button container takes up available space
        // backgroundColor: 'red', // To make it visible
    },
    signUpButton: {
        // Additional button styling here if necessary
    },
});

export default CreateEventPage;