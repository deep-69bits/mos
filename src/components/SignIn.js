import React,{useState} from 'react'
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase'
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const SignIn = () => {
   
	 const [email,setEmail]=useState(null)
	 const [password,setPassword]=useState(null)
	  const [load,setLoad]=useState(true);
	const auth = getAuth(app);
	const navigate = useNavigate();
	const signup=()=>{
		const e=email
		const p=password
		signInWithEmailAndPassword(auth,e,p)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log(user)
			navigate('/')

		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log("password didnt matched")
		});
	}
		const changeemail =(e)=>{
			setEmail(e.target.value)
			setLoad(!load)
		}
		const changepassword=(e)=>{
			setPassword(e.target.value)
			setLoad(!load)
		}
	
	return (
		<div className="min-h-screen bg-[#02062a]  py-6 flex flex-col justify-center sm:py-12">
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				
				<div className=" px-4 py-10  shadow-lg sm:rounded-3xl sm:p-20">
					<div className="max-w-md mx-auto">
						<div>
							<h1 className="text-3xl  w-96 font-semibold text-white">Welcome, to DashMasjid</h1>
							<h1 className="  w-96 font-semibold text-white">Please enter your details</h1>
						</div>
						<div className="divide-y divide-gray-200">
					
						<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<label htmlFor="email" className='text-white'>Email Adresss</label>
						 <input type="email" required value={email} onChange={changeemail} name="email" placeholder='Email Adress'  className='w-full px-2 py-2   rounded-2xl border-none' />
						 <br />
						 <label htmlFor="email" className='text-white mt-2'>Password</label>
						 <input type="email" required value={password} onChange={changepassword} name="email" placeholder='Password'  className='w-full px-2 py-2   rounded-2xl border-none' />
						
						<button  onClick={signup} className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
						<h2 className='text-gray-300'>Don't have an account? <Link className='text-white font-bold' to={'/signup'}>Sign up for free</Link></h2>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignIn