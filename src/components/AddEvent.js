import React, { useState } from 'react'
import Navbar from './Navbar'
import { app } from '../firebase'
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const AddEvent = () => {
    const db = getFirestore(app);
    const auth =getAuth(app)
    const user=auth.currentUser

    const [name,setName]=useState(null)
    const [desc,setDesc]=useState(null)
    const [load,setLoad]=useState(true)
 
    const navigate = useNavigate();

     const changeName =(e)=>{
        setName(e.target.value)
        setLoad(!load)
        // console.log(name)
     }
     const changeDesc =(e)=>{
         setDesc(e.target.value)
         setLoad(!load)
     }
     const submitevent= async ()=>{
        try {
            const docRef = await addDoc(collection(db, user.email), {
              NameOfEvent: name,
              DescriptionOfEvent:desc,
              type:"event"
            });
            console.log("Document written with ID: ", docRef.id);
            if(docRef.id!=null){
              navigate("/events");
            }

          } catch (e) {
            console.error("Error adding document: ", e);
          }
     }
  return (
    <div>
    <Navbar/>
    <div className="flex justify-center items-center h-screen w-full ">
    <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Register</h1>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" for="first_name">Name of events</label>
                <input onChange={changeName} required className="border py-2 px-3 text-grey-800" type="text" name="Nameofevent" id="first_name " />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" for="last_name">Description</label>
                <textarea onChange={changeDesc} required cols="30" rows="10" className="border py-2 px-3 text-grey-800" type="text" name="last_name" id="last_name"></textarea>
            </div>
            <button onClick={submitevent} className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Add Event</button>
    </div>
</div>
    </div>
  )
}

export default AddEvent