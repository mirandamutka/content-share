import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import Button from "../components/Button";
import { Context } from "../context/Context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const auth = getAuth();
  const navigation = useNavigation();
  const context = useContext(Context);

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => {
    if (user) {
     navigation.replace("BottomTab")
     context?.setCurrentUser(auth.currentUser?.uid)
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
        <Button 
          onPress={handleLogin}
          label={'Login'}
          outline={false}
        />
        <Button
          onPress={handleSignup}
          label={'Register'}
          outline={true}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

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
    position: "absolute",
    top: "10%",
    fontFamily: 'Inter-Bold'
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
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },

  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
