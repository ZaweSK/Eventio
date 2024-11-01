import { useEffect } from "react";
import { Alert } from "react-native";

function useErrorAlert({
  isError,
  description,
}: {
  isError: boolean;
  description: string;
}) {
  useEffect(() => {
    if (isError) {
      Alert.alert("Error", description);
    }
  }, [isError, description]);
}

export default useErrorAlert;