"use client"
import { signIn, signOut, useSession, getSession } from 'next-auth/react';
import { getPosts } from '../../utils/blogger';
import fetchLatestSearchTrends, { getDailyTrendsForDay } from '../../utils/trends';
// import {GoogleSignInButton} from "next-auth/"

export default function Home() {
  function handle(){
    signIn("google")
  }
  const {data:session} = useSession();



  const handleGetPosts = async () => {
    console.log(session)
    if (session && session.accessToken) {
      const posts = await getPosts(session.accessToken);
      console.log(posts); // Use the posts data as needed
    }
  };
  return (
    <div className='bg-black w-full h-screen flex justify-center items-center'>
        <button onClick={handle}>Signin</button>
        {session && (
        <div>
          <p>Welcome, {session?.user?.name}!</p>
          <button onClick={() => signOut()}>Sign out</button>
          <br/>
          <button onClick={handleGetPosts}>Get Posts</button>
          <br/>
          <button onClick={()=>{
            getDailyTrendsForDay();
          }}>get trends</button>
        </div>
      )}
    </div>
  )
}
