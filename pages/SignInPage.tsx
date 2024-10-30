import {View,Alert,StyleSheet, KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard} from "react-native";
import EventioButton from "@/components/EventioButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@/components/Input";
import TextWithLink from "@/components/TextWithLink";
import { router } from "expo-router";
import EventioAuthHeader from "@/components/EventioAuthHeader";
import useAuthStore from "@/store/AuthStore";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Loading from "@/components/Loading";
import getUserFriendlyError from "@/utils/getUserFriendlyError";

const SignInScreen = () => {
  const {control,handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({defaultValues: {email: "brucebanner@strv.com", password: "kill3r"}});
  const signIn = useAuthStore((state) => state.signIn);

  const onSubmit = async (data: { email: string; password: string; }) => {
    try {
      const result = await signIn(data.email, data.password);
      if (result.type === "error") {
        if (result.userFriendlyMessage === "404") {
          setError("email", {message: " "});
          setError("password", {message: "Oops! That email and password combination is not valid."});
        } else {
          Alert.alert("Error", result.userFriendlyMessage);
        }
      }
      router.replace("/events");
    } catch (error) {
      const userFriendly = getUserFriendlyError(error);
      Alert.alert("Error", userFriendly.userFriendlyMessage);
    } 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <View style={styles.eventioAuthHeader}>
              <EventioAuthHeader
                title="Sign in to Eventio."
                subtitle="Enter your details below."
              />
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
                    error={errors.email?.message || null}
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
                    error={errors.password?.message || null}
                    placeholder="Password"
                    secureEntry={true}
                    inputValue={value}
                    onInputChanged={onChange}
                  />
                )}
              />
            </View>
          </View>
          <KeyboardAvoidingView
            keyboardVerticalOffset={70}
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <EventioButton title="SIGN IN" onPress={handleSubmit(onSubmit)} />
            <TextWithLink
              text="Don't have an account?"
              linkText="Sign up"
              onPress={() => {
                router.replace("/sign-up");
              }}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
     {isSubmitting && <Loading/>}
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
    marginBottom: 24,
  },
});

export default SignInScreen;