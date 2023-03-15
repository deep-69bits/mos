import React,{useState} from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase'
import { Link } from 'react-router-dom';
const SignUp = () => {
   
	 const [email,setEmail]=useState(null)
	 const [password,setPassword]=useState(null)
	  const [load,setLoad]=useState(true);
	const auth = getAuth(app);
	 
	const signup=()=>{
		const e=email
		const p=password
		createUserWithEmailAndPassword(auth,e,p)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log(user)
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			
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
		<div className="min-h-screen bg-[#02062a] py-6 flex flex-col justify-center sm:py-12">
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				
				<div className="relative px-4 py-10 bg-[#02062a] shadow-lg sm:rounded-3xl sm:p-20">
					<div className="max-w-md mx-auto">
						<div>
							<h1 className="text-2xl w-96 font-semibold">SignUp </h1>
						</div>
						<div className="divide-y divide-gray-200">
					
						<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
						<input  onChange={changeemail} value={email} required autocomplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
						<label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
						</div>
						<div className="relative">
						<input onChange={changepassword} value={password} required autocomplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
						<label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
						</div>
						<div className="relative">
						<button  onClick={signup} className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
						</div>
						<h2 className='text-gray-300'>Already have an account? <Link className='text-white font-bold' to={'/signin'}>Sign In</Link></h2>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUp