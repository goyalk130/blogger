"use client";
import { getPosts } from "../utils/blogger";
import GetAllTrends from "../components/GetAllTrends";

import { useEffect, useState } from "react";
import useStore from "../utils/store";
import Blog from "./blogpage/Blog";
import decodeEntities from "../utils/decodestrings";
// import {GoogleSignInButton} from "next-auth/"

export default function Home() {
  const trends = useStore((store) => store.trend);

  const [state, setstate] = useState(false);

  useEffect(() => {
    setstate(true);
  }, []);

  return (
    <div className="bg-black w-full  flex flex-col gap-5 justify-center items-center text-white pt-32">
      <div className="flex flex-col mt-10">
        {state ? (
          trends?.map((item, key) => {
            let obj = item["ht:news_item"];
            let title = obj[0]["ht:news_item_title"][0];

            // Example usage
            const decodedString = decodeEntities(title);

            return (
              <div key={key}>
                <h3>{decodedString}</h3>
              </div>
            );
          })
        ) : (
          <h2>No data available</h2>
        )}
      </div>
    </div>
  );
}
