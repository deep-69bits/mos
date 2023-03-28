import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Navbar from "./Navbar";
import { app } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import {
  collection,
  getDoc,
  query,
  setDoc,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { async } from "@firebase/util";
import { upload } from "@testing-library/user-event/dist/upload";
import { Audio, FidgetSpinner, Watch } from 'react-loader-spinner'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateDoc = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [searchparams, setSearchParms] = useSearchParams();
  const [name, setName] = useState("");
  const [des, setDesc] = useState("");
  const [file, setFile] = useState();
  const db = getFirestore(app);
  const auth =  getAuth(app);
  const user = auth.currentUser;
  useEffect(() => {
    const getdocument = async () => {
      const db = await getFirestore(app);
      const auth = await getAuth(app);
      const user = await auth.currentUser;
      const docRef = doc(db, user.email, searchparams.get("id"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setName(docSnap.data().NameOfEvent);
        setDesc(docSnap.data().DescriptionOfEvent);
        setLoading(false)
      }
      else {
        console.log("No such document!");
        setLoading(false)
      }
    };
    getdocument();
  }, []);

  const signout = () => {
    signOut(auth);
    toast("Signed out")
    setTimeout(function(){ navigate("/")}, 2000);
  };

  const updatedoc = async (e) => {
    e.preventDefault();
    const db = await getFirestore(app);
    const auth = await getAuth(app);
    const user = await auth.currentUser;
    const storage = getStorage(app);
    if (file) {
      const fileRef = storageRef(
        storage,
        `/files/${user.email + file.name + Math.random() * 10000}`
      );
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          console.log(progress);
        },
        (e) => { },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDoc(doc(db, user.email, searchparams.get("id")), {
              NameOfEvent: name,
              DescriptionOfEvent: des,
              image: url,
              type: searchparams.get("type"),
            });
            navigate("/events");
          });
        }
      );
    }
    else {
      setDoc(doc(db, user.email, searchparams.get("id")), {
        NameOfEvent: name,
        DescriptionOfEvent: des,
        type: searchparams.get("type"),
      });
      toast("Event updated out")
      setTimeout(function(){ navigate("/events")}, 2000);
    }
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

  return (
    <div className="min-h-screen bg-[#02062a">
    <Sidebar content={items} background="#000000" backdrop={true}>
        {
          loading?<div className="flex flex-col  min-h-screen bg-[#02062a] justify-center items-center my-auto h-full" >
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
          </div> :
          <div className="min-h-screen py-40 bg-[#02062a] ">
          <form className="w-1/2 m-auto">
          <ToastContainer/>
          <h1 className="text-white text-2xl my-5 font-semibold">
          UPDATE EVENT
        </h1>
          <input
          type="text"
          onChange={(e) => {setName(e.target.value);}}
          className="text-black block my-3 sm:w-full  rounded-3xl px-3 py-2 bg-gray-200 border-none"
          value={name}
          placeholder="Name of event"
          />
          <br />
          <input
          type="text"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          className="text-black block my-3 sm:w-full  rounded-3xl px-3 py-2 bg-gray-200 border-none"
          value={des}
          placeholder="Name of event"
        />
        <br />
        <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
          name=""
          id=""
          />
          <br />
          <button
          className="sm:w-full my-4 py-2 bg-black backdrop-blur-2xl bg-opacity-30 border-[1px] rounded-xl"
          onClick={async (e) => {
            e.preventDefault()
            const db = await getFirestore(app);
            const auth = await getAuth(app);
            const user = await auth.currentUser;
            toast("Event Deleted")
            await deleteDoc(doc(db, user.email, searchparams.get("id")));
            // setTimeout(function(){ navigate("/events")}, 2000);
            navigate('/events ')
          }}>
          Delete
          </button>
          <br />
          <button className="sm:w-full my-4 py-2 bg-black backdrop-blur-2xl bg-opacity-30 border-[1px] rounded-xl" onClick={updatedoc}>Update</button>
          </form>
          </div>
        }
        </Sidebar>
    </div>
  );
};

export default UpdateDoc;
