'use client'
import React from 'react'
import { Loader, Product } from './globals';
import { signoutfunc } from '@/lib/signout'
import { useRouter } from 'next/navigation';
import { getUserByAccessToken } from '@/lib/getUserByAccessToken';
import { Notify } from 'notiflix';

export const Header = () => {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    const fetchUser = async () => {
      const storedUserName = localStorage.getItem("useremail");
      setLoading(true);
      try {
        const User = await getUserByAccessToken(storedUserName);
        console.log('User', User);
        if (User) {
          localStorage.setItem('User', JSON.stringify(User));
          setUsername(User.username);
          setLoggedIn(true);
        } else {
          await signoutfunc();
          // router.push('/login');
        }
      } catch (error) {
        console.log('getUserByAccessToken error', error);
      }
      setLoading(false);
    };

    const StoredUserData = localStorage.getItem('User');
    if (!StoredUserData) {
      fetchUser();
    } else {
      const parsedUserData = JSON.parse(StoredUserData);
      setUsername(parsedUserData.username);
      setLoggedIn(true);
    }
  }, [router]);

  const handleSignOut = async () => {
    await signoutfunc();
    localStorage.clear();
    router.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 200);
    Notify.info('signed out', {
      position: 'center-top',
    });
  };

  return (
    <div className='p-2 md:px-40 bg-black/10 backdrop-blur-3xl fixed top-0 left-0 z-50 flex w-full items-center justify-between'>
      <div>
        <Product />
      </div>
      <div className='flex flex-col items-center px-2'>
        {!loggedIn && (
          <div className='font-bold flex flex-row items-center gap-2 mr-2'>
            <a href="/login" className="text-indigo-200 py-3 text-center hover:text-indigo-600">
              Log in
            </a>
            <a href="/signup" className="text-white p-2 font-medium text-center text-white bg-indigo-500 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline">
              Sign Up
            </a>
          </div>
        )}
        {loggedIn && (
          <span className='text-white flex flex-row items-center gap-2'>
            {loading ?
              <Loader /> :
              <span>{username}</span>
              
          }
            <button onClick={handleSignOut} className='ml-4 p-2 bg-red-500 rounded'>
              Sign Out
            </button>
          </span>
        )}
      </div>
    </div>
  );
};
