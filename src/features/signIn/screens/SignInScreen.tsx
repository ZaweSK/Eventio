import {
  View,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import EventioButton from "@/src/components/EventioButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@/src/components/Input";
import TextWithLink from "@/src/components/TextWithLink";
import { router } from "expo-router";
import { Controller } from "react-hook-form";
import Loading from "@/src/components/Loading";
import EventioAuthHeader from "@/src/features/signIn/components/EventioAuthHeader";
import { useSignInScreen } from "@/src/features/signIn/hooks/useSignInScreen";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const SignInScreen = () => {
  const {control,handleSubmit, onSubmit, setFocus,validationErrors,loading,} = useSignInScreen();

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAwareScrollView id="ScrollableContent" bottomOffset={40}>
            <View style={styles.eventioAuthHeader}>
              <EventioAuthHeader title="Sign in to Eventio." subtitle="Enter your details below."/>
            </View>
            <View style={styles.inputContainer}>
            {/* <Input textContentType= 'givenName' placeholder="Email" inputValue={''} onInputChanged={(input) => {}}/>
            <Input textContentType= 'emailAddress' placeholder="Password" inputValue={''} onInputChanged={(input) => {}}/> */}


              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                }}

                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    error={validationErrors.email?.message || null}
                    value={value}
                    placeholder="Email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoComplete="email"
                    onChangeText={onChange}
                    onSubmitEditing={() => setFocus("password")}
                    returnKeyType="next"
                    ref = {ref}

                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    error={validationErrors.password?.message || null}
                    placeholder="Password"
                    textContentType="password"
                    autoComplete="password"
                    secureEntry={true}
                    value={value}
                    onChangeText={onChange}
                    ref={ref}
                  />
                )}
              />
            </View>
          </KeyboardAwareScrollView>

          <View id = "FixedContent" style = {styles.signInContainer}>
            <EventioButton title="SIGN IN" onPress={handleSubmit(onSubmit)} />
            <TextWithLink text="Don't have an account?" linkText="Sign up" onPress={() => {router.replace("/sign-up");}}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  eventioAuthHeader: {
    marginTop: 56,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 24,
  },
  keyboardAvoidingView: {
    width: "100%",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    marginBottom: 0,
  },
  signInContainer: {
    position: 'absolute',
    // bottom: 0,
    bottom: 0,
    width: '100%',
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    // flex: 1,
},
});

export default SignInScreen;
