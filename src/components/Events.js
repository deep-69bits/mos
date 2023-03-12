import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { getAuth, signOut } from "firebase/auth";
import { app } from '../firebase'
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs,deleteDoc ,doc } from "firebase/firestore";
import { data } from 'autoprefixer';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  const [eventdata, setEventdata] = useState([])

  useEffect(() => {
    const getevents = async () => {
      const db = await getFirestore(app);
      const auth = await getAuth(app)
      const user = await auth.currentUser
      const eventss = await collection(db, user.email)
      const q = query(collection(db, "cities"), where("type", "==", "event"));
      const data = await getDocs(eventss);
      data.forEach((doc) => {
        setEventdata(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
      });
      
       console.log(eventdata)
     }
    getevents();
  }, [])
 
  return (
    <div>
      <Navbar />
      <Link  to={"/addevent"} >Add Event</Link>
      {
        eventdata.map((item,index)=>{
          if(item?.type=="event"){
            return (
              <div>
              <br />
              <h1>{item.id}</h1>
              <h1>{item.NameOfEvent}</h1>
              <h1>{item.DescriptionOfEvent}</h1>
              <h1>{item.type}</h1>
              <Link to={`/updatedoc?type=event&&id=${item.id}`} >Update</Link>
              <br />
              </div>
              )
            }
        })
      }
    </div>
  )
}

export default Events