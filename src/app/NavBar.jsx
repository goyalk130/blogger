"use client";
import React from "react";
import useStore from "../utils/store";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import handleGetPosts from "../utils/handlegetposts";
import GetAllTrends from "../components/GetAllTrends";
import decodeEntities from "../utils/decodestrings";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  function handle() {
    signIn("google");
  }
  const addName = useStore((store) => store.addName);
  const trends = useStore((store) => store.trend);

  const { data: session } = useSession();

  function setblogs() {
    trends?.map((item, key) => {
      console.log("statecalled");
      let obj = item["ht:news_item"];
      let title = obj[0]["ht:news_item_title"][0];
      let source = obj[0]["ht:news_item_source"][0];
      let url = obj[0]["ht:news_item_url"][0];
      if (source == "The New York Times") {
        title = obj[1]["ht:news_item_title"][0];
        source = obj[1]["ht:news_item_source"][0];
        url = obj[1]["ht:news_item_url"][0];
      }

      // Example usage
      const decodedtitle = decodeEntities(title);

      addName(decodedtitle, url, source);
      console.log(decodedtitle);
    });
    router.push("/blogpage");
  }

  return (
    <>
      {session ? (
        <div className="w-full z-50 fixed text-white top-0 left-0 flex items-center justify-end bg-gray-900 p-10">
          <p className="mr-10">Welcome, {session?.user?.name}!</p>
          <button className="mr-10" onClick={() => signOut()}>
            Sign out
          </button>
          <br />
          <button
            className="mr-10"
            onClick={() => {
              handleGetPosts(session);
            }}
          >
            Get Posts
          </button>
          <button className="mr-10" onClick={setblogs}>
            Set blogs
          </button>
          <br />
          <GetAllTrends />
        </div>
      ) : (
        <div className="w-full text-white fixed top-0 left-0 flex justify-end bg-gray-800">
          <button className="m-10" onClick={handle}>
            Signin
          </button>
        </div>
      )}
    </>
  );
};

export default NavBar;
