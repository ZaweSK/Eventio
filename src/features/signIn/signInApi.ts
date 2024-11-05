import { api } from "@/src/api/apiClient";
import { useMutation } from "@tanstack/react-query";

const useSignInMutation = () => {
    return useMutation({
      mutationKey: ['signIn'],
      mutationFn: async ({ email, password }: {email: string, password: string}) => {
        const data = {
          email: email,
          password: password
        };
        
        const response = await api.post('/auth/native', data);
        return response;
      },
    });
  };


export const signInApi = {
    useSignInMutation
}