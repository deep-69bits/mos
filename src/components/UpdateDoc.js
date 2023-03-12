import React,{useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import Navbar from './Navbar';
import { app } from '../firebase';
import { getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { collection,getDoc,query,setDoc, where, getDocs,deleteDoc ,doc } from "firebase/firestore";
import { async } from '@firebase/util';
const UpdateDoc = () => {
  const navigate = useNavigate();

    const [searchparams,setSearchParms]=useSearchParams();
      const [name,setName]=useState("")
      const [des,setDesc]=useState("")
    useEffect(()=>{
        const getdocumnet=async()=>{
            const db = await getFirestore(app);
            const auth = await getAuth(app)
            const user = await auth.currentUser
            const docRef = doc(db, user.email,searchparams.get('id'));
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setName(docSnap.data().NameOfEvent)
                setDesc(docSnap.data().DescriptionOfEvent)
              } 
            else {
                console.log("No such document!");
              }
        } 
        getdocumnet()
    },[])
    const upadatedoc=async(e)=>{
        e.preventDefault();
        const db = await getFirestore(app);
        const auth = await getAuth(app)
        const user = await auth.currentUser
        await setDoc(doc(db, user.email,searchparams.get('id') ), {
            NameOfEvent: name,
            DescriptionOfEvent: des,
            type: searchparams.get('type')
        });
        navigate("/events"); 
    }
  return (
    <div>
    <Navbar/>
     <form> 
       <input type="text" onChange={(e)=>{setName(e.target.value)}} className='border-[2px]' value={name} placeholder="Name of event" />
       <input type="text" onChange={(e)=>{setDesc(e.target.value)}} className='border-[2px]' value={des} placeholder="Name of event" />
       <button onClick={ async()=>
        {
            navigate("/events"); 
          const db = await getFirestore(app);
          const auth = await getAuth(app)
          const user = await auth.currentUser
          await deleteDoc(doc(db, user.email,searchparams.get('id') ));
        }
        } >
        delete
      </button>
      <br />
      <button onClick={upadatedoc}>update</button>
     </form>
    </div>
  )
}

export default UpdateDoc