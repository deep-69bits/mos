import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

const Events = () => {
  const db = getFirestore(app);
    const auth =getAuth(app)
    const user=auth.currentUser
  const items = [
    <SidebarItem>Dashboard</SidebarItem>,
    <SidebarItem  > <Link to={'/events'}>Events</Link> </SidebarItem>,
    <SidebarItem  > <Link to={'/commitiemembers'}>Commitie Member</Link> </SidebarItem>,
    <SidebarItem  > <Link to={'/hadid'}>Hadid</Link> </SidebarItem>,
    <SidebarItem  > <button onClick={()=>{signOut(auth)}}>logout</button> </SidebarItem>,
  ];
  const navigate = useNavigate();
  const [eventdata, setEventdata] = useState([]);

  useEffect(() => {
    const getevents = async () => {
      const db = await getFirestore(app);
      const auth = await getAuth(app);
      const user = await auth.currentUser;
      const eventss = await collection(db, user.email);
      const q = query(collection(db, "cities"), where("type", "==", "event"));
      const data = await getDocs(eventss);
      data.forEach((doc) => {
        setEventdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });

    };
    getevents();
  }, []);

  return (
    <div className="bg-[#02062a] min-h-screen">
    <Sidebar content={items} background="#000000" backdrop={true}>
    
    <div className="flex gap-3 flex-wrap ">
    {eventdata.map((item, index) => {
      if (item?.type == "event") {
        return (
          <Card className="min-w-[30%] max-w-[30%]">
          {/* <h1>{item.id}</h1> */}
          {item.image && (
            <img src={item.image} alt="" className="object-cover w-full max-h-[400px]"/>
            )}
            <h1 className="text-3xl">{item.NameOfEvent}</h1>
              <h1 className="text-lg text-gray-500 font-light">
              {item.DescriptionOfEvent}
              </h1>
              {/* <h1>{item.type}</h1> */}
              <Button>
              <Link to={`/updatedoc?type=event&&id=${item.id}`}>Update</Link>
              </Button>
            </Card>
            );
          }
        })}
        </div>
        <Button className='mx-auto'>
        <Link to={"/addevent"}>Add Event</Link>
        </Button>
      </Sidebar>
      </div>
  );
};

export default Events;
