import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { Audio, FidgetSpinner, Watch } from "react-loader-spinner";
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
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Events = () => {
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const signout = () => {
    signOut(auth);
    toast("Signed out")
    setTimeout(function(){ navigate("/")}, 2000);
  };
  const items = [
    <SidebarItem>
      <Link className="text-[#E1C49A] hover:text-white" to={"/"}> <img src="./LogoDashMasjid.png" className="w-[50px] inline-block" alt="" /> Dashboard</Link>
    </SidebarItem>,
    <SidebarItem>
      <Link className="text-[#E1C49A] hover:text-white" to={"/events"}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" inline-block mt-[-5px] mx-4 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
      Events
      </Link>
    </SidebarItem>,
    <SidebarItem>
    <Link className="text-[#E1C49A] hover:text-white" to={"/addevent"}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" inline-block mt-[-5px] mx-4 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
     Add  Event
    </Link>
  </SidebarItem>,
    <SidebarItem>
      <Link className="text-[#E1C49A] hover:text-white" to={"/committeemembers"}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block mt-[-5px] mx-4 w-6 h-6">
       <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
      Committee Member</Link>
    </SidebarItem>,
    <SidebarItem>
      <Link  className="text-[#E1C49A] hover:text-white" to={"/addcommitie"}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block mt-[-5px] mx-4 w-6 h-6">
       <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
     Add  Member</Link>
    </SidebarItem>,
    <SidebarItem>
      <Link className="text-[#E1C49A] hover:text-white"  to={"/hadid"}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block mt-[-5px] mx-4 w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
     </svg>
      Hadid
      </Link>
    </SidebarItem>,
    <SidebarItem>
  <Link className="text-[#E1C49A] hover:text-white" to={"/addhadid"}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block mt-[-5px] mx-4 w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
   Add Hadid
  </Link>
 </SidebarItem>,
    <SidebarItem>
      <button className="text-[#E1C49A]" onClick={signout}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block mt-[-5px] mx-4 w-6 h-6">
     <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
     </svg>
      Logout</button>
    </SidebarItem>,
  ];


  const [eventdata, setEventdata] = useState([]);

  useEffect(() => {
    const getevents = async () => {
      const db = await getFirestore(app);
      const auth = await getAuth(app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const retdata=async()=>{
            const user = await auth.currentUser;
            const eventss = await collection(db, user.email);
            ;
            const data = await getDocs(eventss);
            data.forEach((doc) => {
              setEventdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
            setLoading(false);
          }
          retdata()
        } else {
         
        }
      });
     
    };
    getevents();
  }, []);

  return (
    <div className="bg-[#02062a] min-h-screen text-[#E1C49A]">
      <Sidebar content={items} background="#000000" backdrop={true}>
        {loading ? (
          <div className="flex flex-col justify-center items-center my-auto h-full">
            <Watch
              height="80"
              width="80"
              radius="48"
              color="#ffffff"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        ) : (
          <div className="flex gap-3 flex-wrap">
            {eventdata.map((item, index) => {
              if (item?.type == "event") {
                return (
                  <Card className="lg:min-w-[30%] lg:max-w-[30%] max-w-[90%] min-w-[90%]">
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="object-cover pb-4 rounded-t-3xl"
                      />
                    )}
                    <h1 className="text-3xl">{item.NameOfEvent}</h1>
                    <h1 className="text-lg text-gray-500 font-light">
                      {item.DescriptionOfEvent}
                    </h1>
                    {/* <h1>{item.type}</h1> */}
                    <Button className="lg:w-1/2 sm:w-full py-2 bg-black backdrop-blur-2xl bg-opacity-30 border-[1px] rounded-xl">
                      <Link to={`/updatedoc?type=event&&id=${item.id}`}>
                        Update
                      </Link>
                    </Button>
                  </Card>

                  );
                }
              })}
             
              </div>
       
                
          
        )}
        <div className="flex">
         
        </div>

      </Sidebar>
    </div>
  );
};

export default Events;
