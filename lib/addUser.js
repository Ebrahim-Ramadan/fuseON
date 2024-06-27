import firebase_app from '@/lib/firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const handleCreateUser = async (username, uid, UniversityID) => {
    
    const credentials ={
        username,
        uid,
        UniversityID,
        payment:[]
      }
    try {
        const usersCollection = collection(db, 'users');
        await addDoc(usersCollection, credentials);
      console.log('User created successfully');
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };