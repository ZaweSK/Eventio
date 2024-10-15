
export const createAuthSlice = (set: any) => ({
    authToken: null,
    isAuthorised: false,
    
    login: (token: string) => set(() => ({
      authToken: token,
      isAuthorised: true,
    })),
    
    logout: () => set(() => ({
      authToken: null,
      isAuthorised: false,
    })),
  });