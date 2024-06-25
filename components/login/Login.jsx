'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { ClosedEye, OpenEye, Product } from '../Gloabals/globals';
import axios from 'axios';


const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [Email, setEmail] = React.useState('');
  const [ErrorMessage, setErrorMessage] = React.useState('');

  const [Password, setPassword] = React.useState('');
  const router = useRouter()

  const loginUser = async ( e) => {
    e.preventDefault();
    setIsLoading(true);
   
    try {
      console.log('sending request', {
        Password,
        Email
      });
      // const data = await axios.get(`http://localhost:3000/api/fetchUserInfo`,{ Email: Email, Password: Password });
      fetch(`http://localhost:3000/api/fetchUserInfo?Email=${Email}&Password=${Password}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

      
  
        //  router.push('/');
      } catch (error) {
        // Handle error (e.g., show error message to user)
         console.error('Registration failed:', error);
         setErrorMessage(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
  };

  
  return (
    <div className="h-screen w-full flex justify-center flex-col items-center  gap-y-2">
    <Product/>

      <h1 className='text-4xl font-bold text-white'>Login</h1>
      <div className="flex flex-row text-white text-base font-semibold justify-start items-center gap-x-2">
  <p>Don&#8217;t have an account yet?</p>
  <Link href="/signup" className="rounded-lg underline  duration-900">
    Sign up
  </Link>
    </div>
      <form onSubmit={loginUser} className=" max-w-[500px] flex flex-col gap-y-4 w-full">
       
      <div className="w-full flex flex-col gap-y-2">
        <label htmlFor="Email" className="text-base md:text-lg font-medium text-white">
          E-mail
        </label>
        <input
          id="Email"
          name="Email"
          type="email"
          required
          placeholder="Enter your E-mail"
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg h-10 font-bold  p-2 bg-black"
        />
      </div>

      
      <div className="w-full flex flex-col gap-y-2 relative">
  <label htmlFor="password" className="text-base md:text-lg font-medium text-white">
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
        
        <div className="w-full flex-col justify-end">
          <p className="text-sm md:text-base font-medium text-red-500">
          {ErrorMessage}  
          </p>
          
        </div>

        <p className='text-gray-300 hover:text-gray-400 w-fit md:text-base text-xs'>By logging in, you agree to our <a href='/privacy-and-policy' className='underline'>privacy and policy</a></p>
        
        <button role='submit' className=' mt-[-8px] text-lg font-bold rounded-lg p-2 text-zinc-900 border border-2 bg-slate-200 hover:bg-zinc-300 duration-900'
          
          disabled={isLoading}>
          {isLoading ?
          'processing...':'Login'}
          </button>
    </form>
      
    </div>

  );
};

export default Login;