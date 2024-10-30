import useAuthStore from "@/src//store/AuthStore";
import { Redirect } from "expo-router";

const InitialRedirect = () => {
    const isAutorised = useAuthStore((state) => state.isAuthorised);
    console.log('InitialRedirect isAutorised:', isAutorised);
    

    if (!isAutorised) {
        return <Redirect href="/sign-in" />
    } else {
        return <Redirect href="/(tabs)/events" />
    }     
}

export default InitialRedirect;