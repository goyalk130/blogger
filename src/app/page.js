"use client";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { getPosts } from "../../utils/blogger";
import fetchLatestSearchTrends, {
  getDailyTrendsForDay,
} from "../../utils/trends";
import GetAllTrends from "../../components/GetAllTrends";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import { useState } from "react";
// import {GoogleSignInButton} from "next-auth/"

export default function Home() {
  function handle() {
    signIn("google");
  }
  const { data: session } = useSession();

  const handleGetPosts = async () => {
    console.log(session);
    if (session && session.accessToken) {
      const posts = await getPosts(session.accessToken);
      console.log(posts); // Use the posts data as needed
    }
  };

  

  const [state, setstate] = useState([]);

  return (
    <div className="bg-black w-full h-screen flex flex-col justify-center items-center text-white">
      
      {session ? (
        <div className="w-full fixed top-0 left-0 flex justify-end bg-gray-800 p-10">
          <p className="mr-10">Welcome, {session?.user?.name}!</p>
          <button className="mr-10" onClick={() => signOut()}>Sign out</button>
          <br />
          <button className="mr-10" onClick={handleGetPosts}>Get Posts</button>
          <br />
          <GetAllTrends state={state} setstate={setstate} />
        </div>
      ):(
        <div className="w-full fixed top-0 left-0 flex justify-end bg-gray-800"><button className="m-10" onClick={handle}>Signin</button></div>
      )
      }
      
      
      <div className="flex flex-col mt-10">
        {state?.map((item, key) => {
          let obj = item["ht:news_item"];
          let title = obj[0]["ht:news_item_title"][0];
          {/* console.log(title); */}

          function decodeEntities(encodedString) {
            const parser = new DOMParser();
            const dom = parser.parseFromString(
              `<!doctype html><body>${encodedString}`,
              "text/html"
            );
            return dom.body.textContent;
          }

          // Example usage
          const decodedString = decodeEntities(title);

          return (
            <div key={key}>
              <h3>{decodedString}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
