import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import firebase_app from '@/lib/firebaseConfig';
const db = getFirestore(firebase_app);


export const searchByUniversityID = async (universityID) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("UniversityID", "==", universityID));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return false;
  }return true;
};

