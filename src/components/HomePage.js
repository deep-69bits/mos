import React,{useEffect, useState} from 'react'
import { getAuth,signOut } from "firebase/auth";
import { app } from '../firebase'
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import Navbar from './Navbar';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    useEffect(()=>{
       
      const func=async()=>{
        axios.get('http://api.aladhan.com/v1/calendarByCity/2023/4?city=Kuala%20Lumpu&country=malaysia&method=2')
        .then(function (response) {
          console.log(response.data.data[0].timings);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });
      }
      func()
       
    },[])

   
    const items = [
      <SidebarItem>Dashboard</SidebarItem>,
      <SidebarItem  > <Link to={'/events'}>Events</Link> </SidebarItem>,
      <SidebarItem  > <Link to={'/commitiemembers'}>Commitie Member</Link> </SidebarItem>,
      <SidebarItem  > <Link to={'/hadid'}>Hadid</Link> </SidebarItem>,
      <SidebarItem  > <button onClick={()=>{signOut(auth)}}>logout</button> </SidebarItem>,
    ];
  return (
    <div className='h-screen bg-[#02062a]'>
    
    <Sidebar content={items} background="#000000" backdrop={true}>
    <div className='text-white'>

    </div>
    </Sidebar>
    </div>
  )
}

export default HomePage