import SignUp from './components/SignUp';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import SignIn from './components/SignIn';
import { app } from './firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from './components/HomePage';
import Events from './components/Events';
import AddEvent from './components/AddEvent';
import Commitie from './components/Commitie';



function App() {

    const auth =getAuth(app)  
     const [loged,setLoged]=useState(false)
    useEffect(()=>{
         onAuthStateChanged(auth,user=>{
          if(user){setLoged(true)}
          else{
           setLoged(false);
          }
         })
    },[])
    
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            loged?<Route path="/" element={<HomePage/>}/>:<Route path="/" element={<SignIn />} />
          }
          <Route path="/signup" element={<SignUp />} />
          <Route path="/events" element={<Events />} />
          <Route path="/addevent" element={<AddEvent/>} />
          <Route path="/commitiemembers" element={<Commitie/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
