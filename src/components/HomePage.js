import React,{useState} from 'react'
import { getAuth,signOut } from "firebase/auth";
import { app } from '../firebase'
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import Navbar from './Navbar';



const HomePage = () => {
    const db = getFirestore(app);
    const auth =getAuth(app)
    const user=auth.currentUser
    
    const func = async ()=>{
    try {
            const docRef = await addDoc(collection(db, `${user.email}\Events` ), {
              first: "Ada",
              last: "Lovelace",
              born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
   
 
  return (
    <div>
    <Navbar/>
    
     <h1>{user.email}</h1>
     <button onClick={()=>{signOut(auth)}}>logout</button>
    </div>
  )
}

export default HomePage