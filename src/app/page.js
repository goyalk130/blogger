"use client";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { getPosts } from "../../utils/blogger";
import fetchLatestSearchTrends, {
  getDailyTrendsForDay,
} from "../../utils/trends";
import GetAllTrends from "../../components/getalltrends";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import { useState } from "react";
import { scrapeWebsite } from "../../utils/webscrapper";
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

  async function makecall() {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Tell me something interesting today" },
      ],
    });
    console.log(completion);
  }

  const [state, setstate] = useState([]);

  return (
    <div className="bg-black w-full h-screen flex flex-col justify-center items-center text-white">
      <button onClick={handle}>Signin</button>
      {session && (
        <div>
          <p>Welcome, {session?.user?.name}!</p>
          <button onClick={() => signOut()}>Sign out</button>
          <br />
          <button onClick={handleGetPosts}>Get Posts</button>
          <br />
          <button
            onClick={() => {
              getDailyTrendsForDay();
            }}
          >
            get trends
          </button>
        </div>
      )}
      <GetAllTrends state={state} setstate={setstate} />
      <div className="w-full h-1/2 bg-slate-400">
        <button className="text-xl" onClick={makecall}>
          FETCH
        </button>
      </div>
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

          scrapeWebsite("https://www.usatoday.com/story/entertainment/movies/2023/07/07/pierce-brosnan-adam-devine-talk-the-out-laws-netflix/70380780007/")
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
