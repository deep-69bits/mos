import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Audio, FidgetSpinner, Watch } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [navbar, setNavbar] = useState(false);
  const [masjids, setMasjids] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const navigate = useNavigate();
  useEffect(() => {
    const Allmasjids = async () => {
      console.log("nnnwfw");
      const db = await getFirestore(app);
      const auth = await getAuth(app);
      const data = await getDocs(collection(db, "Users"));
      data.forEach((doc) => {
        setMasjids(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      setLoading(false);
      console.log(masjids);
    };
    Allmasjids();
  }, []);

  return (
    <div className="bg-[#02062a] h-screen">
      <div className="w-full min-h-screen bg-[#02062a]">
        <nav className="w-full">
          <div className="justify-between lg:px-20 sm:px-2 mx-  md:items-center md:flex md:px-8">
            <div>
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                <a href="javascript:void(0)">
                  <h2 className=" font-bold text-white text-xl mx-5 mt-[-20px]">
                    <img
                      src="./LogoDashMasjid.png"
                      className="inline-block mx-2 w-[50px]"
                      alt=""
                    />
                    <Link  className="text-[#E1C49A]" to={"/"}>DASHMASJID</Link>
                  </h2>
                </a>
                <div className="md:hidden">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}>
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <div className="text-[#E1C49A] px-3 py-2 rounded-md bg-black mx-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-white inline-block"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                        <h1 className="inline-block">Filter</h1>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  ${
                  navbar ? "block" : "hidden"
                }`}>
                <ul className="items-center translate-x-[500px] justify-center space-y-8 my-8 md:flex md:space-x-6 md:space-y-0">
                  <li className="text-black px-5 bg-blue-600  rounded-md first: py-2 ">
                    <Link className="text-white font-bold" to={"/signin"}>
                      SIGN IN
                    </Link>
                  </li>
                  <li className="text-black px-5 bg-blue-600 rounded-md first: py-2 ">
                    <Link className="text-white font-bold" to={"/signup"}>
                      SIGN UP
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden space-x-2 md:inline-block"></div>
          </div>
        </nav>
        <div className="grid grid-flow-row lg:grid-cols-2 sm:grid-cols-1 mx-40 my-40 justify-between px-10">
          <div>
            <h1 className="text-[#E1C49A] font-bold text-7xl">
              {" "}
              The Solution to all <br /> your problems
            </h1>
            <h2 className="text-[#E1C49A] my-5 text-xl">
              Elegent-designed and user-friendly mosque dashboard. <br />{" "}
              Suitable to any type of mosque and can be acces anywhere
            </h2>
            {loading ? (
              <div className="text-center justify-center items-center  w-2/3">
                <div className="inline-block mx-auto  my-5 ">
                  <Watch
                    className="mx-auto"
                    height="30"
                    width="40"
                    radius="48"
                    color="#ffffff"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              </div>
            ) : (
              <div className="w-2/3">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#E1C49A]">
                  Select an option
                </label>
                <select
                  onChange={(e) => {
                    // console.log(e.target.value)
                    if (e.target.value != undefined) {
                      navigate(`/masjid?${e.target.value}`);
                    }
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected className="">Choose a Masjid</option>
                  {masjids.map((item, index) => {
                    return (
                      <option className="text-[#E1C49A]" value={"email="+item.email+"&region="+item.region}>{item.MasjidName}</option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
          <div>
            <img  className="mx-auto mt-[-20px]" src="./LogoDashMasjid.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
