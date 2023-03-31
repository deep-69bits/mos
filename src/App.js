import SignUp from "./components/SignUp";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import SignIn from "./components/SignIn";
import { app } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./components/HomePage";
import Events from "./components/Events";
import AddEvent from "./components/AddEvent";
import Committee from "./components/Committee";

import UpdateDoc from "./components/UpdateDoc";
import LandingPage from "./components/LandingPage";
import Timings from "./components/Display/Timings";
import Hadid from "./components/Hadid";
import AddHadid from "./components/AddHadid";
import Updatehadid from "./components/Updatehadid";
import AddCommitteMember from "./components/AddCommitteMember";
import Updatemember from "./components/Updatemember";
import ForgotPasswrod from "./components/ForgotPasswrod";
function App() {
  const auth = getAuth(app);
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  }, []);

  return (
    <div className="App text-white">
      <BrowserRouter>
        <Routes>
          {logged ? (
            <Route path="/" element={<HomePage />} />
          ) : (
            <Route path="/" element={<LandingPage/>} />  
          )}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/events" element={<Events />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/committeemembers" element={<Committee />} />
          <Route path="/updatedoc" element={<UpdateDoc />} />
          <Route path="/masjid" element={<Timings />} />
          <Route path="/hadid" element={<Hadid />} />
          <Route path="/addhadid" element={<AddHadid />} />
          <Route path="/updatehadid" element={<Updatehadid />} />
          <Route path="/addcommitie" element={<AddCommitteMember />} />
          <Route path="/updatemember" element={<Updatemember />} />
          <Route path="/forgot-password" element={<ForgotPasswrod />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
