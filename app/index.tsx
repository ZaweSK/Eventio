import useAuthStore from "@/src/store/useAuthStore";
import { Redirect } from "expo-router";

const InitialRedirect = () => {
    const isAutorised = useAuthStore((state) => state.isSignedIn);
    if (!isAutorised) {
        return <Redirect href="/sign-in" />
    } else {
        return <Redirect href="/(tabs)/events" />
    }     
}

export default InitialRedirect;