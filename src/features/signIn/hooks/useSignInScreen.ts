import { EventioApiError } from "@/src/api/ApiError/EventioApiError";
import { signInApi } from "@/src/features/signIn/signInApi";
import { storage } from "@/src/storage/Storage";
import { getAlertMessage } from "@/src/utils/functions/getAlertMessage";
import storeAccessToken from "@/src/utils/functions/storeAccessToken";
import { AxiosResponse, AxiosResponseHeaders } from "axios";
import { router } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

// ================================ PRIVATE  ============================= 
type FormFields = {
    email: string;
    password: string;
};

function storeRefreshToken(response: AxiosResponse) {
    const { headers } = response;
    const axiosHeaders = headers as AxiosResponseHeaders;
    const refreshToken = axiosHeaders.get('Refresh-Token');
  
    if (!refreshToken) {
        console.error('Missing refresh token in sing-in response');
        return;
    }
    if (typeof refreshToken === 'string') storage.setRefreshToken(refreshToken);
  }
  
  function storeUserId(response: AxiosResponse) {
    const { data: body } = response;
    if (!body?.id) {
        console.error('Missing user id in sing-in response');
        return;
    }
    if (body?.id) storage.setUserId(body.id);
  }

// =============================== HOOK SETUP =================================
export const useSignInScreen = () => {
    const {control,handleSubmit, setError, setFocus, formState: { errors: validationErrors = {} } } = useForm<FormFields>({
      defaultValues: {
          email: "brucebanner@strv.com",
          password: "kill3r",
      },
  });
    const { mutate: signIn, isPending: loading, error } = signInApi.useSignInMutation();
  
    const onSubmit = async (data: FormFields) => {    
        signIn({ email: data.email, password: data.password}, {
          onSuccess: (response) => {
            storeRefreshToken(response)
            storeAccessToken(response)
            storeUserId(response)
            router.replace("/events");
          }
        })
    };

    useEffect(() => {
      if (error) {
        if (error instanceof EventioApiError && error.status === 404) {
          setError("email", {message: " "});
          setError("password", {message: "Oops! That email and password combination is not valid."});
        } else {
          Alert.alert("Error", getAlertMessage(error))
        }
      }
    }, [error])

    return { control, handleSubmit, onSubmit, setFocus, validationErrors, loading }
}