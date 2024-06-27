
import firebase_app from './firebaseConfig';
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebase_app);

export const signoutfunc = async()=> {
  try {
    await signOut(auth);
    return True;
  } catch (error) {
    return 'Error: ' + error.message;
  }
  }