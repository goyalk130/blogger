"use client";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../../utils/store";
import scrapedata from "../../utils/scrape";
import joinScrapeData from "@/utils/joinscrapedata";
import { makecall } from "@/utils/chatgpt";
import axios from "axios";
import { useSession } from "next-auth/react";
import gettitleblog from "@/utils/gettitleblog";
import postonblogger from "@/utils/postonblogger";

const Blog = ({
  name,
  title,
  blog,
  uploaded,
  url,
  blogstate,
  scrapped,
  source,
}) => {
  const { data: session } = useSession();

  const button = useRef();
  if (uploaded) {
    button.disabled = true;
  }

  const setpost = useStore((store) => store.setupload);
  const setScarping = useStore((store) => store.setScarping);
  const setScarpedData = useStore((store) => store.setScarpedData);
  const settitleblog = useStore((store) => store.settitleblog);
  const settitle = useStore((store) => store.settitle);
  const setblog = useStore((store) => store.setblog);

  const [state, setstate] = useState(false);
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    setstate(true);
  }, []);
  console.log(scrapped);
  if (state) {
    return (
      <div className="flex flex-col text-white relative w-1/4 p-4 m-10 bg-slate-900">
        <button
          className="absolute top-0 right-0 m-6 bg-green-500 text-white p-1 px-2 rounded-md  "
          onClick={async () => {
            if (blogstate == "scrape") {
              setScarping();
              let data;
              try {
                data = await fetch("/api/scrape", {
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  method: "POST",
                  body: JSON.stringify(url),
                });
              } catch (err) {
                prompt("error oocured");
              }

              const scrppeddata = await data.json();
              try {
                const arr = scrppeddata.paras.paragraphs;
                if (arr.length) {
                  setScarpedData(name, scrppeddata);
                } else {
                  alert("No Scarped data");
                }
              } catch (err) {
                alert("Error while Scrapping");
              }
            } else {
              const res = await fetch("/api/chatgpt", {
                headers: {
                  "Content-Type": "Application/json",
                },
                method: "POST",
                body: JSON.stringify({
                  topic: name,
                  paras: scrapped,
                }),
              });
              const chatgptblog = await res.json();
              let actualblog = chatgptblog.state.choices[0].message.content;

              const readyblog = gettitleblog(actualblog, source);
              settitleblog(name, readyblog);
            }
          }}
        >
          {blogstate}
        </button>
        <h2 className="py-5 w-1/2">{name}</h2>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            name="name"
            className=" bg-black border-2 p-2 rounded-lg border-white border-solid"
            value={name}
          />
          <input
            className="bg-black border-2 p-2 rounded-lg border-white border-solid"
            type="text"
            name="title"
            onChange={(e) => {
              const title = e.target.value;
              settitle(name, title);
            }}
            value={title}
          />
          <textarea
            className="w-full h-60 bg-black border-2 p-2 rounded-lg border-white border-solid"
            name="blog"
            onChange={(e) => {
              const newblog = e.target.value;
              setblog(name, newblog);
            }}
            value={blog}
          />
          <button
            ref={button}
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              let res;
              try {
                res = await postonblogger(session.accessToken, title, blog);
                if(res.status=="LIVE"){ setpost(name)};
              } catch (err) {
                alert("error");
              }
            }}
          >
            {uploaded ? "Posted" : "Post"}
          </button>
        </form>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Blog;
