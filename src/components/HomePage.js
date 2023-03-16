import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const signout = () => {
    signOut(auth);
    navigate("/");
  };
  const func = async () => {
    try {
      const docRef = await addDoc(collection(db, `${user.email}\Events`), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const [date, setDate] = useState(new Date());
  function refreshClock() {
    setDate(new Date());
  }
  
  const [Asr,setAsr]=useState('')
  const [Dhuhr,setDhuhr]=useState('')
  const [Fajr,setFajr]=useState('')
  const [Maghrib,setMaghrib]=useState('')
  const [Isha,setIsha]=useState('')

  useEffect(() => {
    const func = async () => {
      axios
        .get(
          "http://api.aladhan.com/v1/calendarByCity/2023/4?city=Kuala%20Lumpu&country=malaysia&method=2"
        )
        .then(function (response) {
          console.log(response.data.data[0].timings);
          setAsr(response.data.data[0].timings.Asr)
          setDhuhr(response.data.data[0].timings.Dhuhr)
          setFajr(response.data.data[0].timings.Fajr)
          setMaghrib(response.data.data[0].timings.Maghrib)
          setIsha(response.data.data[0].timings.Isha)
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
    };
    func();
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const items = [
    <SidebarItem>
      <Link to={"/"}>Dashboard</Link>
    </SidebarItem>,
    <SidebarItem>
      <Link to={"/events"}>Events</Link>
    </SidebarItem>,
    <SidebarItem>
      <Link to={"/committeemembers"}>Committee Member</Link>
    </SidebarItem>,
    <SidebarItem>
      <Link to={"/hadid"}>Hadid</Link>
    </SidebarItem>,
    <SidebarItem>
      <button onClick={signout}>Logout</button>
    </SidebarItem>,
  ];

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="min-h-screen bg-[#02062a]">
      <Sidebar content={items} background="#000000" backdrop={true}>
        <div className="text-white">
          <h1 className="text-center mt-2">
            <span className="text-3xl">{date.toLocaleTimeString()}</span>
            <br />
            <span>
              {weekday[date.getDay()]} <span> </span>
              {date.getDate()}.{date.getMonth()}.{date.getUTCFullYear()}
            </span>
          </h1>

          <h1>
           <h1>Fajr:{Fajr}</h1>
           <h1>Asr:{Asr}</h1>
           <h1>Dhuhr:{Dhuhr}</h1>
           <h1>Magrib:{Maghrib}</h1>
           <h1>Isha:{Isha }</h1>
           </h1>
        </div>
      </Sidebar>
    </div>
  );
};

export default HomePage;
