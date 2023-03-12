import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { getAuth, signOut } from "firebase/auth";
import { app } from '../firebase'
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { data } from 'autoprefixer';



const Events = () => {
  const db = getFirestore(app);
  const auth = getAuth(app)
  const user = auth.currentUser
  const [eventdata, setEventdata] = useState([])

  return (
    <div>
      <Navbar />
      <a href="/addevent">Add Event</a>
    </div>
  )
}

export default Events