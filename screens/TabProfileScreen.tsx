import { useNavigation } from "@react-navigation/core";
import { getAuth } from "firebase/auth";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import { getFirestore, addDoc, collection } from 'firebase/firestore';

export default function TabProfileScreen() {
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

  const firestore = getFirestore();

  const createProfile = async (type: string) => {
    if(auth.currentUser)
    {
      const uid = auth.currentUser.uid;
      await addDoc(collection(firestore, uid), {
        type: type,
        twitch: '',
        youtube: '',
        schedule: [],
        games: [],
        genre: []
      })
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut} style={styles.buttonTextContainer}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
      <Button 
        onPress={() => createProfile('personal')}
        label={'Create profile'}
        outline={false}
      />
      <Button 
        onPress={() => createProfile('fan')}
        label={'Create fan profile'}
        outline={true}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#3E3939'
  },

  buttonTextContainer: {
    position: 'absolute',
    top: 10,
    left: 10
  },

  buttonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: 'white'
  },

  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
