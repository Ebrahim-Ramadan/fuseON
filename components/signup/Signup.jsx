'use client'
import React from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";  
import { ClosedEye, Loader, OpenEye, Product } from '../Gloabals/globals';
import axios from 'axios';



const Signup = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [Email, setEmail] = React.useState('');
  const [UniversityID, setUniversityID] = React.useState('');
  const [UserName, setUserName] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [ErrorMessage, setErrorMessage] = React.useState('');
  const router = useRouter()
   const registerUser = async ( e) => {
     e.preventDefault();
     setIsLoading(true);
     try {
    const { data } = await axios.post(`http://localhost:3000/api/addUser`, {
      UniversityID,
      UserName,
      Password,
      Email
    });
      
       

       router.push('/login');
    } catch (error) {
      // Handle error (e.g., show error message to user)
       console.error('Registration failed:', error);
       setErrorMessage(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };
   

  
   
  return (
    <div className="flex justify-center flex-col items-center gap-y-2 h-screen w-full">
  <Product/>
      <h1 className='text-4xl font-bold text-white'>Sign Up</h1>
      <div className="flex flex-row text-white text-base font-semibold justify-start items-center gap-x-2">
  <p >Already have an account?</p>
  <Link href="/login" className="rounded-lg  underline  duration-900">
    Log in
  </Link>
    </div>
    <form onSubmit={registerUser} className="md:p-0 p-4 max-w-[500px] flex flex-col gap-y-6 w-full">
      <div className="w-full flex flex-col gap-y-2">
        <label htmlFor="Email" className="text-lg md:text-xl font-medium text-white">
          E-mail
        </label>
        <input
          id="Email"
          name="Email"
          type="email"
          required
          placeholder="Enter your E-mail"
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg h-10 font-bold text-md p-2 bg-black"
        />
      </div>

      <div className="w-full flex flex-col gap-y-2 relative">
  <label htmlFor="password" className="text-lg md:text-xl font-medium text-white">
    Password
  </label>
  <div className="flex flex-col gap-y-4">
    <input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      required
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      className="rounded-lg h-10 font-bold text-md p-2 bg-black"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-2 top-11"
    >
      {showPassword ? (
        <ClosedEye/>
      ) : (
        <OpenEye/>
      )}
    </button>
  </div>
</div>

      <div className="w-full flex flex-col gap-y-2">
        <label htmlFor="UniversityID" className="text-lg md:text-xl font-medium text-white">
          University ID
        </label>
        <div className="flex flex-col gap-y-4">
          <input
            id="UniversityID"
            name="UniversityID"
            type="UniversityID"
            required
            onChange={(e) => setUniversityID(e.target.value)}
            placeholder="Enter your UniversityID"
            className="rounded-lg h-10 font-bold text-md p-2 bg-black"
          />
          
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-2">
        <label htmlFor="UserName" className="text-lg md:text-xl font-medium text-white">
          User Name
        </label>
        <div className="flex flex-col gap-y-4">
          <input
            id="UserName"
            name="UserName"
            type="UserName"
            required
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your UserName"
            className="rounded-lg h-10 font-bold text-md p-2 bg-black"
          />
          
        </div>
      </div>
        <div className="w-full flex-col justify-end">
          <p className="text-sm md:text-base font-medium text-red-500">
          {ErrorMessage}  
          </p>
          <div className="text-gray-200 text-xs">
          make sure to enter your data carefully, as you will not be able to change it afterwards
        </div>
        </div>
       
        <button role='submit' className='text-lg font-bold rounded-lg p-2 text-zinc-900 border border-2 bg-slate-200 hover:bg-zinc-300 duration-900' disabled={isLoading}>
          {isLoading ?
            'processing...' : 'Signup'}
          {isLoading && <Loader/> }
          </button>
    </form>
    
  </div>
  )
}

export default Signup