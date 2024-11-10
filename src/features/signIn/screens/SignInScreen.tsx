import {View,Alert,StyleSheet, KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard} from "react-native";
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

const SignInScreen = () => {
  const { control, handleSubmit, onSubmit, validationErrors, loading } = useSignInScreen()
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <View style={styles.eventioAuthHeader}>
              <EventioAuthHeader title="Sign in to Eventio." subtitle="Enter your details below." />
            </View>
            <View style={styles.inputContainer}>
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
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={validationErrors.email?.message || null}
                    placeholder="Email"
                    inputValue={value}
                    onInputChanged={onChange}
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
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={validationErrors.password?.message || null}
                    placeholder="Password"
                    secureEntry={true}
                    inputValue={value}
                    onInputChanged={onChange}
                  />
                )}
              />
            </View>
          </View>
          <KeyboardAvoidingView keyboardVerticalOffset={22} style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <EventioButton title="SIGN IN" onPress={handleSubmit(onSubmit)} />
            <TextWithLink text="Don't have an account?" linkText="Sign up" onPress={() => {router.replace("/sign-up")}}/>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
     {loading && <Loading/>}
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
});

export default SignInScreen;