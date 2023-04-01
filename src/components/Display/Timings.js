import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import ReactSimplyCarousel from 'react-simply-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import { app } from '../../firebase';
import { Auth, getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { Audio, FidgetSpinner, Watch } from 'react-loader-spinner'
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const Timings = () => {
  const [searchparams, setSearchParms] = useSearchParams();
  const [email, setEmail] = useState(searchparams.get("email"))
  const [dataa, setdataa] = useState([])
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [Asr, setAsr] = useState('')
  const [Dhuhr, setDhuhr] = useState('')
  const [Fajr, setFajr] = useState('')
  const [Maghrib, setMaghrib] = useState('')
  const [Isha, setIsha] = useState('')

  const [loading, setLoading] = useState(true);
  useEffect(() => {

    axios.get("http://api.aladhan.com/v1/calendarByCity/2023/4?city=Kuala%20Lumpu&country=malaysia&method=2")
      .then(function (response) {
        console.log(response.data.data[0].timings);
        setAsr(response.data.data[0].timings.Asr)
        setDhuhr(response.data.data[0].timings.Dhuhr)
        setFajr(response.data.data[0].timings.Fajr)
        setMaghrib(response.data.data[0].timings.Maghrib)
        setIsha(response.data.data[0].timings.Isha)
        console.log(response)
        setLoading(false)
      })
      .catch(function (error) { console.log(error); })
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

  }, [getAuth, getDocs, collection, getFirestore, dataa])


  const [date, setDate] = useState(new Date());
  function refreshClock() {
    setDate(new Date());

  }
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const Month=[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const isalmicmonth=[
    "Muharram",
    "Safar",
    "Rabi al-Awwal",
    "Rabi al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Shaban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qadah",
    "Dhu al-Hijjah"
  ]
  
  const a=parseInt(Asr)
  const b=parseInt(Asr[3]+Asr[4]);
 
  const c=parseInt(Dhuhr)
  const d=parseInt(Dhuhr[3]+Dhuhr[4])

  const e=parseInt(Fajr)
  const f=parseInt(Fajr[3]+Fajr[4])

  const g=parseInt(Maghrib)
  const h=parseInt(Maghrib[3]+Maghrib[4])

  const i=parseInt(Isha)
  const j=parseInt(Isha[3]+Isha[4])

  const hournow=parseInt(date.getHours())
  const minnow=parseInt(date.getMinutes())
  if(  (hournow===a && (minnow>=b && minnow<=b+20 )) || 
       (hournow===c && (minnow>=d && minnow<=d+20 )) || 
       (hournow===e && (minnow>=f && minnow<=f+20 )) || 
       (hournow===g && (minnow>=h && minnow<=h+20 )) || 
       (hournow===i && (minnow>=j && minnow<=j+20 )) 
   ){
    return(
      <div className='min-h-screen bg-[#02062a] w-full text-[#E1C49A]'>
      <img  className='m-auto' src="./LogoDashMasjid.png" alt="" />
           <h1 className=' text-5xl font-semibold m text-center py-[2%]'>Prayer Going On
          <br /> <br />
           <span className='my-2 block'>
           Please ensure your 
           mobile phone is silent
           </span>
           <br />
           
           in the prayer hall</h1>
      </div>
    )
  }
  var now = new Date()
  var dayOfYear = Math.floor((new Date() - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
  var hijriDate = ((now.getFullYear()-621.5643)*365.24225 + dayOfYear) / 354.36707
  var hijriYear = Math.floor(hijriDate)
  var hijriMonth = Math.ceil((hijriDate - Math.floor(hijriDate)) * 354.36707 / 29.530589)
  var hijriDay = Math.floor((hijriDate - Math.floor(hijriDate)) * 354.36707 % 29.530589)
  return (
    <div className=' min-h-screen bg-[#02062a] text-[#E1C49A] w-full'>
    <Swiper
    spaceBetween={30}
    centeredSlides={true}
    slidesPerView={1}
    autoplay={{
      delay: 4500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    loop={true}
    modules={[Autoplay, Pagination, Navigation]}
    className="mySwiper"
  >
    
       <SwiperSlide >
          
       <div className=' max-h-screen text-center grid grid-cols-2'>
       <div>
       
       <h1 className=" block float-right text-left absolute m-8 mx-20  ">
       <span className="text-7xl font-bold">{date.toLocaleTimeString()}</span>
       <br />
       <span className='text-2xl  text-left font-semibold my-2 block'>
         {weekday[date.getDay()]} <br />
         <span className=''>
         {date.getDate()}  {Month[date.getMonth()]}  {date.getUTCFullYear()}
         </span>
       </span>
      
       <span className='text-2xl  text-left font-semibold my-2 block'>
        
         <span className=''>
         {hijriDay}  {isalmicmonth[hijriMonth-1]}   {hijriYear}
         </span>
       </span>
       </h1>
        <img className='my-52 ml-20' src="./LogoDashMasjid.png" alt="" />


       </div>

      
       <div className='mx-20'>
       
       <div className=' mt-52 text-4xl font-semibold mr-20  text-[#E1C49A]'>
       <h1 className='flex justify-between my-10'><span className='text-5xl font-bold'>Fajr</span> <span>{Fajr.split("",5)}</span></h1>
       <h1 className='flex justify-between my-10'><span className='text-5xl font-bold'>Dhuhr</span> <span>{Dhuhr.split("",5)}</span></h1>
       <h1 className='flex justify-between my-10'><span className='text-5xl font-bold'>Asr</span> <span>{Asr.split("",5)}</span></h1>
       <h1 className='flex justify-between my-10'><span className='text-5xl font-bold'>Maghrib</span> <span>{Maghrib.split("",5)}</span></h1>
       <h1 className='flex justify-between my-10'><span className='text-5xl font-bold'>Isha</span> <span>{Isha.split("",5)}</span></h1>
       </div>
       </div>
     
      </div>
       </SwiperSlide>
        {
          dataa.map((item, index) => {
            if (item.type === "event") {
              return (
                <SwiperSlide className=' max-h-screen text-center'>
                <h1 className=" block float-right text-left absolute m-8 mx-20  ">
                <span className="text-7xl font-bold">{date.toLocaleTimeString()}</span>
                <br />
                <span className='text-2xl  text-left font-semibold my-2 block'>
                  {weekday[date.getDay()]} <br />
                  <span className=''>
                  {date.getDate()}  {Month[date.getMonth()]}  {date.getUTCFullYear()}
                  </span>
                </span>
               
                <span className='text-2xl  text-left font-semibold my-2 block'>
                 
                  <span className=''>
                  {hijriDay}  {isalmicmonth[hijriMonth-1]}   {hijriYear}
                  </span>
                </span>
                </h1>
                  <h1 className='text-4xl py-20 font-semibold'>{item.NameOfEvent}</h1>
                  <img className='m-auto  max-w-2/3  max-h-[400px] mt-20 rounded-xl' src={item.image} alt="" />
                  <h1 className='py-10 text-xl font-semibold'>{item.DescriptionOfEvent}</h1>
                </SwiperSlide>
              )
            }
          })
        }
       

        {
          dataa.map((item, index) => {
            if (item.type === "hadid") {
              return (
                <SwiperSlide className='max-h-screen   text-center   text-xl '>
                <h1 className=" block float-right text-left absolute m-8 mx-20  ">
                <span className="text-7xl font-bold">{date.toLocaleTimeString()}</span>
                <br />
                <span className='text-2xl  text-left font-semibold my-2 block'>
                  {weekday[date.getDay()]} <br />
                  <span className=''>
                  {date.getDate()}  {Month[date.getMonth()]}  {date.getUTCFullYear()}
                  </span>
                </span>
               
                <span className='text-2xl  text-left font-semibold my-2 block'>
                 
                  <span className=''>
                  {hijriDay}  {isalmicmonth[hijriMonth-1]}   {hijriYear}
                  </span>
                </span>
                </h1>
                  <h1 className='text-4xl py-20 font-semibold '>Hadid of the day</h1>
                  {
                    item.image?
                    <img  className='m-auto w-2/3 mt-20 rounded-xl h-[400px]' src={item.image} alt="" />
                    :
                    ""
                  }
                  {
                    item.image?
                    <h2 className='py-10 text-4xl   px-40 text-center  font-semibold'>
                    {item.hadid}
                    </h2>:
                    <h2 className=' text-4xl py-40  px-40 text-center  font-semibold'>
                    {item.hadid}
                    </h2>

                  }
                </SwiperSlide>
              )
            }
          })
        }
        <SwiperSlide className='max-h-screen'>
        <h1 className=" block float-right text-left absolute m-8 mx-20  ">
        <span className="text-7xl font-bold">{date.toLocaleTimeString()}</span>
        <br />
        <span className='text-2xl  text-left font-semibold my-2 block'>
          {weekday[date.getDay()]} <br />
          <span className=''>
          {date.getDate()}  {Month[date.getMonth()]}  {date.getUTCFullYear()}
          </span>
        </span>
       
        <span className='text-2xl  text-left font-semibold my-2 block'>
         
          <span className=''>
          {hijriDay}  {isalmicmonth[hijriMonth-1]}   {hijriYear}
          </span>
        </span>
        </h1>
        <div className='  text-center text-xl px-40 '>
       
          <h1 className='text-4xl py-20 font-semibold'>Member of the day</h1>
          <div className='grid grid-flow-row grid-cols-2 gap-x-20 gap-y-10' >
            {
              dataa.map((item, index) => {
                if (item.type === "member") {
                  return (
                    <div className='bg-white transition-all my-5 duration-500 hover:scale-105 rounded-lg text-black '>
                      <h1 className='text-2xl text-black font-bold my-2'>{item.name}</h1>
                      <h3 className='text-2xl text-black font-semibold my-2'>{item.position}</h3>
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Timings