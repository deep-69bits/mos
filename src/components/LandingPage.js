import React,{useState} from 'react'
import { Link } from 'react-router-dom';
const LandingPage = () => {
    const [navbar, setNavbar] = useState(false);
  return (
    <div className='w-full h-screen bg-[#02062a]'>
    <nav className="w-full  ">
    <div className="justify-between lg:px-20 sm:px-2 mx-  md:items-center md:flex md:px-8">
      <div>
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <a href="javascript:void(0)">
            <h2 className=" font-bold text-white text-xl mx-5 mt-[-20px]"> <img src="./LogoDashMasjid.png" className='w-[50px] inline-block' alt="" /> DASHMASJID</h2>
          </a>
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <div className='text-white px-3 py-2 rounded-md bg-black mx-5'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <h1 className='inline-block'>Filter</h1>
                </div>

              )}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  ${navbar ? "block" : "hidden"
            }`}
        >
          <ul className="items-center justify-center space-y-8 my-8 md:flex md:space-x-6 md:space-y-0">
            
            <li className="text-black px-5 bg-blue-600  rounded-md first: py-2 ">
              <Link className='text-white font-bold' to={'/signin'}>SIGN IN</Link>
            </li>
            <li className="text-black px-5 bg-blue-600 rounded-md first: py-2 ">
            <Link className='text-white font-bold' to={'/signin'}>SIGN UP</Link>
            </li>

          </ul>

        </div>
      </div>
      <div className="hidden space-x-2 md:inline-block">

      </div>
    </div>
  </nav>
      <div className='grid grid-flow-row lg:grid-cols-2 sm:grid-cols-1 mx-40 my-40 justify-between px-10'>
         <div>
          <h1 className='text-white font-bold text-7xl'> The Solution to all <br /> your problems</h1>
          <h2 className='text-white my-5 text-xl'>Elegent-designed and user-friendly mosque dashboard. <br /> Suitable to any type of mosque and can be acces anywhere</h2>
         </div>
          <div>
            <img src="./LogoDashMasjid.png" alt="" />
          </div>
      </div>
    </div>
  )
}

export default LandingPage