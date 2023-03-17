import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import { app } from '../../firebase';
import { Auth,getAuth } from 'firebase/auth';
import { collection,getFirestore } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
const Timings = () => {
  const [searchparams, setSearchParms] = useSearchParams();
  const [email,setEmail]=useState(searchparams.get("email"))
   const [dataa,setdataa]=useState([])
  useEffect(()=>{
  
    axios.get("http://api.aladhan.com/v1/calendarByCity/2023/4?city=Kuala%20Lumpu&country=malaysia&method=2")
    .then(function (response) {console.log(response)})
    .catch(function (error) {console.log(error);})
    .finally(function () { });

    const getevents = async () => {
        const db = await getFirestore(app);
        const auth = await getAuth(app);
        const user = await auth.currentUser;
        const eventss = await collection(db, email);
        const data = await getDocs(eventss);
        await data.forEach((doc) => {
          setdataa(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
         console.log(dataa)
      };
     getevents();
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
     
    },[getAuth,getDocs,collection,getFirestore,dataa])
    
     
    const [date, setDate] = useState(new Date());
       function refreshClock() {
        setDate(new Date());
      
  }
  return (
    <div className='text-white min-h-screen bg-[#02062a] w-full'>
    <Carousel autoPlay={true} infiniteLoop={true} thumbWidth={0} swipeable={true} stopOnHover={false} showThumbs={false}>
    <div>
        <div className='h-screen w-full bg-[#02062a]'>
         <h1 className='text-white text-7xl'> <span className="text-3xl">{date.toLocaleTimeString()}</span></h1>
        </div>
    </div>
    <div>
    <div className='h-screen w-full bg-[#02062a]'>
     <h1>EVENTS</h1>
     <div className='grid grid-flow-row grid-cols-3'>
     {
         dataa.map((item)=>{
             return(
                 <div>
                 <img src={item.image} alt="" />
                 {item.NameOfEvent}
                 <br />
                  {item.DescriptionOfEvent}
                 </div>
                 )
                })
            }
    </div>
    </div>
    </div>
    
   </Carousel>
    </div>
  )
}

export default Timings