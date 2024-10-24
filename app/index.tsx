import useAuthStore from "@/store/AuthStore";
import { Redirect } from "expo-router";

const InitialRedirect = () => {
    const isAutorised = useAuthStore((state) => state.isAuthorised);

    if (!isAutorised) {
        return <Redirect href="/sign-in" />
    } else {
        return <Redirect href="/(tabs)/events" />
    }     
}

export default InitialRedirect;