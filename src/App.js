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
import AddCommitteeMember from "./components/AddCommitteeMember";
import UpdateDoc from "./components/UpdateDoc";

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
    <div className="App">
      <BrowserRouter>
        <Routes>
          {logged ? (
            <Route path="/" element={<HomePage />} />
          ) : (
            <Route path="/" element={<SignIn />} />
          )}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/events" element={<Events />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/committeemembers" element={<Committee />} />
          <Route path="/AddCommitteeMember" element={<AddCommitteeMember />} />
          <Route path="/updatedoc" element={<UpdateDoc />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
