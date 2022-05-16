import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

const RootScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => {
    if (user) {
     navigation.replace("BottomTab")
    }
   })

   return unsubscribe
  }, [])

  const handleSignup = () => {
   createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {

     // Registered 

     const user = userCredential.user;
     console.log('Registered with: ', user.email);
   })
   .catch(error => alert(error.message))
  }

  const handleLogin = () => {
   signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {

    // Signed in 

    const user = userCredential.user;
    console.log('Logged in with: ', user.email);
  })
  .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Content</Text>
      <Text style={[styles.title, styles.titleBottom]}>share</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RootScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3E3939",
  },

  title: {
    fontSize: 40,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "700",
    position: "absolute",
    top: "10%",
  },

  titleBottom: {
    top: "15%",
    color: "#77ABB7",
  },

  inputContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    fontSize: 16,
  },

  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#77ABB7",
    borderRadius: 20,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
  },

  buttonText: {
    textTransform: "uppercase",
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },

  buttonOutline: {
    backgroundColor: "none",
    borderColor: "#77ABB7",
    borderWidth: 3,
  },

  buttonOutlineText: {
    color: "#77ABB7",
  },
});