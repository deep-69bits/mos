import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Navbar from "./Navbar";
import { app } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
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

const UpdateDoc = () => {
  const navigate = useNavigate();
  const [searchparams, setSearchParms] = useSearchParams();
  const [name, setName] = useState("");
  const [des, setDesc] = useState("");
  const [file, setFile] = useState();
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
      } else {
        console.log("No such document!");
      }
    };
    getdocument();
  }, []);
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
        (e) => {},
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
    } else {
      setDoc(doc(db, user.email, searchparams.get("id")), {
        NameOfEvent: name,
        DescriptionOfEvent: des,
        type: searchparams.get("type"),
      });
      navigate("/events");
    }
  };
  return (
    <div>
      <Navbar />
      <form>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="border-[2px]"
          value={name}
          placeholder="Name of event"
        />
        <input
          type="text"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          className="border-[2px]"
          value={des}
          placeholder="Name of event"
        />
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          name=""
          id=""
        />
        <button
          onClick={async () => {
            navigate("/events");
            const db = await getFirestore(app);
            const auth = await getAuth(app);
            const user = await auth.currentUser;
            await deleteDoc(doc(db, user.email, searchparams.get("id")));
          }}>
          Delete
        </button>
        <br />
        <button onClick={updatedoc}>Update</button>
      </form>
    </div>
  );
};

export default UpdateDoc;
