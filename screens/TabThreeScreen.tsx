import { useNavigation } from "@react-navigation/core";
import { getAuth } from "firebase/auth";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabThreeScreen() {
  const auth = getAuth();
  const navigation = useNavigation();

  const handleSignOut = () => {
   auth
   .signOut()
   .then(() => {
    navigation.replace("Root");
   })
   .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
