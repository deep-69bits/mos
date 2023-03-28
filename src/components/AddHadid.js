import React, { useState, useEffect } from 'react'
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { getFirestore, setDoc, addDoc } from "firebase/firestore";
import { Audio, FidgetSpinner, Watch } from 'react-loader-spinner'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";


const AddHadid = () => {
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const signout = () => {
    signOut(auth);
    toast("Signed out")
    setTimeout(function () { navigate("/") }, 2000);
  };
  const storage = getStorage(app);

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


  useEffect(() => {



  }, [])
  const [hadid, sethadid] = useState('')
  const [load, setload] = useState(true)
  const [file, setfile] = useState(null);

  const changehadid = (e) => {
    sethadid(e.target.value)
    setload(!load)
  }
  const submithadid = async () => {
    try {
      let docRef;
      if (file) {
        const fileRef = storageRef(storage, `/files/${user.email + file.name + Math.random() * 10000}`);
        const uploadTask = uploadBytesResumable(fileRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {},
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              docRef = addDoc(collection(db, user.email), {
                hadid: hadid,
                image: url,
                type: "hadid",
              });
            });
          }
        );
        console.log("Document written with ID: ", docRef.id);
        if (docRef.id != null) {

         
        }
      } else {
        docRef = await addDoc(collection(db, user.email), {
          hadid: hadid,
          type: "hadid",
        });
        console.log("Document written with ID: ", docRef.id);
        if (docRef.id != null) {
        
        }
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    toast("Hadid Added")
    setTimeout(function () { navigate("/hadid") }, 2000);
  }

  return (
    <div className="bg-[#02062a] text-[#E1C49A] min-h-screen  ">
      <Sidebar content={items} background="#000000" backdrop={true}>

        <div className='flex flex-col justify-center items-center w-full lg:w-4/5 mt-40 m-auto '>
          <ToastContainer />
          <input value={hadid} onChange={changehadid} type="text" className="text-black block  h-52 sm:w-full lg:w-2/3 my-20    rounded-3xl px-3 py-2 bg-gray-200 border-none" />
          <div className="flex flex-col mb-4">
            <label className="text-[10px] font-bold text-[#E1C49A]" for="image">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="mr-auto mt-5"
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
            />
          </div>
          <button onClick={submithadid} className="lg:w-1/2 sm:w-full py-2 bg-black backdrop-blur-2xl bg-opacity-30 border-[1px] rounded-xl">
            Add Hadid
          </button>
        </div>

      </Sidebar>
    </div>
  )
}

export default AddHadid
