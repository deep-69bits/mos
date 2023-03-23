import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Audio,FidgetSpinner,Watch } from 'react-loader-spinner'

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  
  const navigate = useNavigate();
  const signout = () => {
    signOut(auth);
    navigate("/");
  };
  

  const [date, setDate] = useState(new Date());
  function refreshClock() {
    setDate(new Date());
  }

  const [Asr, setAsr] = useState('')
  const [Dhuhr, setDhuhr] = useState('')
  const [Fajr, setFajr] = useState('')
  const [Maghrib, setMaghrib] = useState('')
  const [Isha, setIsha] = useState('')

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
          setLoading(false)
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false)
        })
        .finally(function () { });
    };
    func();
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const items = [
    <SidebarItem>
      <Link to={"/"}> <img src="./LogoDashMasjid.png" className="w-[50px] inline-block" alt="" /> Dashboard</Link>
    </SidebarItem>,
    <SidebarItem>
      <Link to={"/events"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" inline-block mt-[-5px] mx-4 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
        Events
      </Link>
    </SidebarItem>,
    <SidebarItem>
      <Link to={"/committeemembers"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block mt-[-5px] mx-4 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
        Committee Member</Link>
    </SidebarItem>,
    <SidebarItem>
      <Link to={"/hadid"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block mt-[-5px] mx-4 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        Hadid
      </Link>
    </SidebarItem>,
    <SidebarItem>
      <button onClick={signout}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block mt-[-5px] mx-4 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
        Logout</button>
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
        {
          loading ? <div className="flex flex-col justify-center items-center my-auto h-full" >
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
            <div className="text-white">
              <h1 className="text-center block float-right mt-[-130px] m-8">
                <span className="text-7xl">{date.toLocaleTimeString()}</span>
                <br />
                <span>
                  {weekday[date.getDay()]} <span> </span>
                  {date.getDate()}.{date.getMonth()}.{date.getUTCFullYear()}
                </span>
              </h1>
              <div className="ml-[26%] mt-40 scale-130 w-fit">
                <div className="flex m-10 gap-4">
                  <div className="border mt-12 border-gray-500 pl-4 w-48 rounded-xl h-48 bg-gradient-to-tl from-green-600 to-green-800">
                    <svg className="bi bi-sunrise p-2 mt-[-20px] border border-separate border-green-900 rounded-2xl bg-yellow-400 fill-green-800" width="60" height="60" fill="currentColor" viewBox="0 0 16 16"> <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7zm3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/> </svg>
                    <h1 className="capitalize text-2xl font-bold">FAJR</h1>
                    <h1 className="text-6xl">{Fajr.split("",5)}</h1>
                    <div className="bg-yellow-400 h-4 w-36 mt-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-200"></div>
                  </div>
                  <div className="border border-gray-500 rounded-xl h-60 w-48 pl-4 bg-gradient-to-tl from-green-600 to-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" className="bi bi-sunrise pb-2 mt-[-20px] border border-green-900 rounded-2xl bg-yellow-400 fill-green-800" viewBox="0 0 48 48"><path d="M34.345,42.61l-9.473-5.523V34.861l7.756-4.575a.5.5,0,0,0,.206-.627l-.451-1.06,1.207-.929A3.453,3.453,0,0,0,34.834,25.8l.582-2.273a4.033,4.033,0,0,0,0-1.944l-.161-.63a.465.465,0,0,0-.061-.143.629.629,0,0,0-.545-.293.636.636,0,0,0-.545.345l-1.158,2.3c-.007.016-.016.031-.024.046.053-.2.094-.347.111-.4a.8.8,0,0,0-.424-.952.825.825,0,0,0-1.046.3c-.161.232-1.114,1.527-1.124,1.541a1.591,1.591,0,0,0-.288.913v.959l-3.91,3.305-1.049-5.2a.509.509,0,0,0-.131-.25L23.7,22.015v-.832l.84.292a1,1,0,0,0,1.322-.939V18.875l.257-.079a.5.5,0,0,0,.308-.27.5.5,0,0,0,0-.41l-.85-1.924V14.9a2.92,2.92,0,0,0-1.129-2.345,4.485,4.485,0,0,0-2.754-.849,4.54,4.54,0,0,0-2.889,1.174A2.309,2.309,0,0,0,18,14.647v3.107a4.981,4.981,0,0,0,1.127,2.524v.472l-1.718,1.812a6.377,6.377,0,0,0-1.759,4.407V37.8a.5.5,0,1,0,1,0V26.969a5.38,5.38,0,0,1,1.484-3.719l1.856-1.957a.5.5,0,0,0,.137-.344V20.1a.5.5,0,0,0-.114-.319A4.487,4.487,0,0,1,19,17.754v-2.1l3.67-1.576a.5.5,0,1,0-.394-.919l-3.267,1.4a1.3,1.3,0,0,1,.446-.915,3.558,3.558,0,0,1,2.24-.935,3.517,3.517,0,0,1,2.155.649,1.92,1.92,0,0,1,.728,1.545V16.3a.5.5,0,0,0,.042.2l.666,1.506-.073.022a.5.5,0,0,0-.353.478l.007,2.025-1.5-.524a.5.5,0,0,0-.664.472V21.5l-1.526-.559a.5.5,0,1,0-.344.938l2.09.766,1.323,1.364L25.427,29.9a.5.5,0,0,0,.813.283l4.729-4c.007-.006.01-.014.016-.02a.537.537,0,0,0,.067-.084.561.561,0,0,0,.045-.067.469.469,0,0,0,.033-.118.363.363,0,0,0,.013-.064c0-.012.007-.022.007-.033V24.61a.589.589,0,0,1,.1-.334s.271-.368.55-.75L31.517,24.6a.5.5,0,0,0,.764.542l.522-.354a3.042,3.042,0,0,0,1.034-1.166l.684-1.362a3,3,0,0,1-.075,1.024l-.579,2.264a2.445,2.445,0,0,1-.882,1.324l-1.008.775-.291-.683a.5.5,0,0,0-.92.393l.976,2.288L24.516,33.91l-2.725-3.894a.5.5,0,0,0-.82.573l2.9,4.144v2.641a.5.5,0,0,0,.248.432l9.721,5.668A1.892,1.892,0,0,1,32.889,47H20.162l2.065-2.438h3.825a.5.5,0,1,0,0-1H20.968a4.323,4.323,0,0,1-4.319-4.318.5.5,0,0,0-1,0,5.315,5.315,0,0,0,2.381,4.427,2.236,2.236,0,0,0-.763.408l-.954.792L13.473,46.2a.945.945,0,0,0,.4,1.8H32.889a2.892,2.892,0,0,0,1.456-5.39ZM16.8,45.75a.551.551,0,0,0,.108-.069l1-.832a1.246,1.246,0,0,1,.794-.287h2.218L18.851,47H14.122Z"/></svg>
                    <h1 className="capitalize text-2xl font-bold">Prayer Times:</h1>
                    <h1 className="text-6xl">{Isha.split("",5)}</h1>
                    <div className="bg-yellow-400 h-4 w-36 mt-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-200"></div>
                  </div>
                  <div className="border mt-12 border-gray-500 pl-4 w-48 rounded-xl h-48 bg-gradient-to-tl from-green-600 to-green-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green"  width="60" height="60" className="bi bi-sunrise pb-2 mt-[-20px] border border-green-900 rounded-2xl bg-yellow-400 fill-green-800">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                    <h1 className="capitalize text-2xl font-bold">Dhuhr:</h1>
                    <h1 className="text-6xl">{Dhuhr.split("",5)}</h1>
                    <div className="bg-yellow-400 h-4 w-36 mt-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-200"></div>
                  </div>
                </div>
                <div className="flex m-10 gap-4">
                  <div className="border border-gray-500 pl-4 w-48 rounded-xl h-48 bg-gradient-to-tl from-green-600 to-green-800">
                    <svg enable-background="new -1.147 -22.185 141.732 141.732" viewBox="-1.147 -22.185 141.732 141.732" className="bi bi-sunrise pb-2 mt-[-20px] border border-green-900 rounded-2xl bg-yellow-400 fill-green-800" width="60" height="60" ><path d="M50.209,40.638c-5.234-3.909-11.73-6.227-18.771-6.227C14.076,34.413,0,48.506,0,65.889   C0,83.221,13.992,97.276,31.284,97.36v0.004h94.162v-0.007c6.791-0.154,12.251-5.771,12.251-12.677   c0-7.005-5.613-12.686-12.538-12.686c-0.272,0-0.549,0.015-0.819,0.029c-2.615-7.32-9.604-12.559-17.816-12.559   c-2.301,0-4.506,0.41-6.545,1.164c-2.501-14.88-15.423-26.22-30.997-26.22C61.944,34.413,55.448,36.729,50.209,40.638    M126.257,68.376c2.513,0,4.847,0.747,6.808,2.031c0.998-1.729,0.396-3.938-1.354-4.937l-9.533-5.441   c-0.966-0.551-2.075-0.616-3.053-0.277c2.859,2.196,5.077,5.19,6.316,8.652C125.709,68.388,125.981,68.376,126.257,68.376    M64.901,27.427l-9.533-5.442c-1.756-1.002-3.999-0.406-5.014,1.328c-1.016,1.733-0.412,3.954,1.345,4.956l7.698,4.395   c2.322-0.841,4.771-1.414,7.312-1.686C66.871,29.586,66.206,28.17,64.901,27.427 M78.371,16.697l-5.505-9.426   c-1.014-1.734-3.258-2.33-5.012-1.328c-1.756,1.002-2.357,3.222-1.344,4.956l5.504,9.426c1.014,1.735,3.258,2.329,5.012,1.328   C78.782,20.651,79.385,18.433,78.371,16.697 M78.862,24.795c-2.823,1.61-5.213,3.678-7.146,6.042   c14.833,0.767,26.943,11.82,29.354,26.178c2.04-0.753,4.245-1.165,6.546-1.165c2.639,0,5.15,0.543,7.432,1.521   c3.345-7.223,3.226-15.878-1.1-23.277C106.856,21.943,91.147,17.781,78.862,24.795 M96.142,14.512V3.628   C96.142,1.624,94.5,0,92.474,0c-2.027,0-3.67,1.624-3.67,3.628v10.886c0,2.003,1.643,3.628,3.67,3.628   C94.5,18.14,96.142,16.515,96.142,14.512 M117.332,11.63c1.016-1.732,0.412-3.951-1.343-4.953   c-1.756-1.004-3.999-0.407-5.014,1.325l-5.504,9.428c-1.016,1.733-0.412,3.952,1.344,4.956c1.754,1.002,3.998,0.404,5.013-1.328   L117.332,11.63z M133.081,23.229c-0.254-0.438-0.586-0.799-0.969-1.083c-1.141-0.856-2.736-1.006-4.055-0.253l-9.535,5.439   c-1.754,1.002-2.355,3.223-1.342,4.956c0.254,0.438,0.586,0.799,0.969,1.083c1.142,0.856,2.736,1.007,4.056,0.254l9.532-5.44   C133.493,27.183,134.095,24.964,133.081,23.229 M139.438,46.77c0-2.004-1.646-3.628-3.668-3.628h-11.01   c-2.025,0-3.672,1.624-3.672,3.628s1.646,3.628,3.672,3.628h11.01C137.796,50.397,139.438,48.773,139.438,46.77"/></svg>
                    <h1 className="capitalize text-2xl font-bold">Ase</h1>
                    <h1 className="text-6xl">{Asr.split("",5)}</h1>
                    <div className="bg-yellow-400 h-4 w-36 mt-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-200"></div>
                  </div>
                  <div className="border border-gray-500 pl-4 w-48 rounded-xl h-48 bg-gradient-to-tl from-green-600 to-green-800">
                    <svg className="bi bi-sunrise pb-2 mt-[-20px] border border-green-900 rounded-2xl bg-yellow-400 fill-green-800" width="60" height="60" viewBox="0 0 512 512"><path d="M139.7469025,326.0671082c11.5529022,0,22.6884003-2.4421082,32.9447937-6.9425964   c0.1240082-0.0500183,0.2556-0.0395203,0.3774109-0.0991211c0.0807953-0.039978,0.1274872-0.1152039,0.2050934-0.1576843   c7.8430023-3.5155945,15.1763-8.2070923,21.6934052-14.1325989c15.1696014,13.7937012,34.5816956,21.3320007,55.2179871,21.3320007   c22.2089996,0,43.3050995-8.9454956,58.7597198-24.7362976c8.2817993,8.4604797,18.2124023,14.8800964,29.036377,19.0871887   c0.0403137,0.021698,0.0620117,0.0614929,0.1028137,0.0820007c0.4533997,0.2326965,0.9248047,0.3725891,1.4003906,0.4656067   c8.9482117,3.2789917,18.4599915,5.1015015,28.2225952,5.1015015c24.2138977,0,47.1058044-10.6322937,62.803009-29.1755066   c1.8911133-2.2351074,1.6142883-5.5773926-0.6207886-7.4709167c-2.2272949-1.8832703-5.5801086-1.6142883-7.466095,0.6206055   c-13.6821289,16.1632996-33.625,25.4295959-54.7161255,25.4295959c-6.789978,0-13.4291992-1.0578003-19.8104858-2.9000854   c5.5614929-12.6601868,8.3837891-26.1499023,8.3837891-40.1931152c0-55.292984-44.9841003-100.2797852-100.2797852-100.2797852   c-55.2954102,0-100.2825012,44.9868011-100.2825012,100.2797852c0,13.5686035,2.6381989,26.6467285,7.8500977,38.9614258   c-7.5559082,2.6654968-15.5617065,4.1317749-23.821701,4.1317749c-19.0270996,0-36.9570999-7.388092-50.483902-20.8089905   c-2.0799026-2.0646973-5.4380035-2.0541992-7.4919968,0.0307007c-2.0617065,2.074707-2.046402,5.4326172,0.0309982,7.4916992   C97.3262024,317.5871887,117.9055023,326.0671082,139.7469025,326.0671082z M256.0010071,182.6941071   c49.452179,0,89.6835938,40.2318878,89.6835938,89.6835785c0,12.7956238-2.6223145,25.0720215-7.7778015,36.5742188   c-9.4641113-4.3395996-17.9956055-10.7346191-24.9182129-18.910614c-2.0126953-2.3798828-6.0739746-2.3693848-8.0867004,0   c-13.6820984,16.1632996-33.625,25.4295959-54.7162933,25.4295959c-19.5131989,0-37.7717896-7.7398987-51.4152985-21.7975769   c-0.998291-1.0295105-2.3694-1.6087952-3.8026886-1.6087952c-1.4334106,0-2.8045044,0.5792847-3.8003082,1.6087952   c-5.285202,5.444397-11.2761993,9.9133911-17.7507935,13.3796997c-4.621109-10.9712219-7.1018066-22.5825195-7.1018066-34.6753235   C166.3146973,222.9259949,206.5467072,182.6941071,256.0010071,182.6941071z"/><path d="M422.4236145,340.6366882c-13.6821289,16.1631165-33.625,25.429718-54.7161255,25.429718   c-21.0912781,0-41.0340881-9.2666016-54.7189026-25.429718c-2.0126953-2.3800964-6.0739746-2.3695984-8.0867004,0   c-13.6820984,16.1631165-33.625,25.429718-54.7162933,25.429718c-19.5131989,0-37.7717896-7.7402039-51.4152985-21.797821   c-0.998291-1.0292969-2.3694-1.6091919-3.8026886-1.6091919c-1.4334106,0-2.8045044,0.579895-3.8003082,1.6091919   c-13.6463013,14.0576172-31.9073029,21.797821-51.4203949,21.797821c-19.0270996,0-36.9570999-7.3883972-50.483902-20.8096008   c-2.0799026-2.064209-5.4380035-2.0484924-7.4919968,0.0310059c-2.0617065,2.0749817-2.046402,5.4328918,0.0309982,7.4919739   c15.5242004,15.4026184,36.1035004,23.8826294,57.9449005,23.8826294c20.6362,0,40.0482941-7.5384216,55.2207031-21.3321228   c15.1696014,13.7937012,34.5816956,21.3321228,55.2179871,21.3321228c22.2089996,0,43.3050995-8.9456177,58.7597198-24.7364197   c15.4565735,15.790802,36.5534973,24.7364197,58.7621765,24.7364197c24.2138977,0,47.1058044-10.6324158,62.803009-29.1753235   c1.8911133-2.2353821,1.6142883-5.5776978-0.6207886-7.4711914   C427.6624146,338.1325989,424.3096008,338.4016113,422.4236145,340.6366882z"/><path d="M422.4236145,391.2319031c-13.6821289,16.1633911-33.625,25.4295044-54.7161255,25.4295044   c-21.0912781,0-41.0340881-9.2661133-54.7189026-25.4295044c-2.0126953-2.3797913-6.0739746-2.3695984-8.0867004,0   c-13.6820984,16.1633911-33.625,25.4295044-54.7162933,25.4295044c-19.5131989,0-37.7717896-7.7400208-51.4152985-21.7973938   c-0.998291-1.0298157-2.3694-1.6089172-3.8026886-1.6089172c-1.4334106,0-2.8045044,0.5791016-3.8003082,1.6089172   c-13.6463013,14.057373-31.9073029,21.7973938-51.4203949,21.7973938c-19.0270996,0-36.9570999-7.3882141-50.483902-20.8091125   c-2.0799026-2.0644836-5.4380035-2.0491028-7.4919968,0.0310059c-2.0617065,2.074707-2.046402,5.4325867,0.0309982,7.4916992   c15.5242004,15.4025879,36.1035004,23.8825989,57.9449005,23.8825989c20.6362,0,40.0482941-7.5380859,55.2207031-21.3317871   c15.1696014,13.7937012,34.5816956,21.3317871,55.2179871,21.3317871c22.2089996,0,43.3050995-8.9455872,58.7597198-24.7363892   c15.4565735,15.790802,36.5534973,24.7363892,58.7621765,24.7363892c24.2138977,0,47.1058044-10.6323853,62.803009-29.175293   c1.8911133-2.2354126,1.6142883-5.5773926-0.6207886-7.4711914   C427.6624146,388.7278137,424.3096008,388.9967957,422.4236145,391.2319031z"/><path d="M256.0010071,142.1309052c2.9259949,0,5.2982788-2.3699036,5.2982788-5.298111V90.0402985   c0-2.9284973-2.3722839-5.2978973-5.2982788-5.2978973c-2.9258118,0-5.2978058,2.3694-5.2978058,5.2978973v46.7924957   C250.7032013,139.7610016,253.0751953,142.1309052,256.0010071,142.1309052z"/><path d="M173.7597961,167.7209015c1.0348969,1.0346985,2.3901062,1.552002,3.746109,1.552002   c1.3551941,0,2.7108917-0.5173035,3.7455902-1.552002c2.0696106-2.069809,2.0696106-5.4223022,0-7.4918976l-33.0868988-33.0869064   c-2.069397-2.0695953-5.4221039-2.0695953-7.4916992,0c-2.0695953,2.069603-2.0695953,5.4220963,0,7.4917068   L173.7597961,167.7209015z"/><path d="M334.4938965,169.2729034c1.3554993,0,2.7109985-0.5173035,3.7459106-1.552002l33.0892944-33.0870972   c2.0696106-2.0696106,2.0696106-5.4221039,0-7.4917068c-2.0693054-2.0695953-5.421814-2.0695953-7.491394,0l-33.0895996,33.0869064   c-2.0696106,2.0695953-2.0696106,5.4220886,0,7.4918976C331.7827148,168.7556,333.1382141,169.2729034,334.4938965,169.2729034z"/><path d="M377.9363098,220.2097015h46.7948914c2.9260864,0,5.2980957-2.3699036,5.2980957-5.2980957   c0-2.9282074-2.3720093-5.298111-5.2980957-5.298111h-46.7948914c-2.9259949,0-5.2980957,2.3699036-5.2980957,5.298111   C372.6382141,217.839798,375.0103149,220.2097015,377.9363098,220.2097015z"/><path d="M87.2710037,220.2097015h46.7925034c2.9257965,0,5.2980957-2.3699036,5.2980957-5.2980957   c0-2.9282074-2.3722992-5.298111-5.2980957-5.298111H87.2710037c-2.9260025,0-5.2981033,2.3699036-5.2981033,5.298111   C81.9729004,217.839798,84.3450012,220.2097015,87.2710037,220.2097015z"/></svg>
                    <h1 className="capitalize text-2xl font-bold">Magrib</h1>
                    <h1 className="text-6xl">{Maghrib.split("",5)}</h1>
                    <div className="bg-yellow-400 h-4 w-36 mt-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-200"></div>
                  </div>
                  <div className="border border-gray-500 pl-4 w-48 rounded-xl h-48 bg-gradient-to-tl from-green-600 to-green-800">
                  <svg className="bi bi-sunrise p-2 mt-[-20px] border border-green-900 rounded-2xl bg-yellow-400 fill-green-800" width="60" height="60" enable-background="new 0 0 141.732 141.732" viewBox="0 0 141.732 141.732"><path d="M89.546,3.171C83.01,1.112,76.057,0,68.844,0C30.822,0,0,30.822,0,68.844c0,9.009,1.734,17.612,4.879,25.5   c2.566-2.708,6.137-4.437,10.104-4.565c3.338-7.685,10.966-12.752,19.409-12.752c1.753,0,3.488,0.214,5.171,0.636   c0.47-2.009,1.115-3.938,1.91-5.779c-0.044-1.006-0.065-2.023-0.065-3.044C41.406,38.037,61.642,11.958,89.546,3.171    M140.635,85.496c0-16.583-13.453-30.08-29.988-30.08c-6.509,0-12.698,2.059-17.901,5.946l-1.162,0.87l-1.163-0.87   c-5.204-3.888-11.396-5.946-17.9-5.946c-14.698,0-27.134,10.537-29.57,25.059l-0.388,2.311l-2.195-0.812   c-1.909-0.706-3.919-1.064-5.974-1.064c-7.276,0-13.817,4.616-16.273,11.488l-0.492,1.374l-1.456-0.093   c-0.281-0.021-0.508-0.025-0.71-0.025c-5.953,0-10.795,4.919-10.795,10.966c0,5.911,4.733,10.823,10.547,10.96l0.308,0.007h94.428   l0.843-0.004C127.247,115.491,140.635,101.999,140.635,85.496"/></svg>
                    <h1 className="capitalize text-2xl font-bold">isha</h1>
                    <h1 className="text-6xl">{Isha.split("",5)}</h1>
                    <div className="bg-yellow-400 h-4 w-36 mt-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-200"></div>
                  </div>
                </div>
              </div>
            </div>
        }
      </Sidebar>
    </div>
  );
};

export default HomePage;
