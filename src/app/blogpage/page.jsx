"use client";
import { useEffect, useState } from "react";
import { getPosts } from "../../utils/blogger";
import useStore from "../../utils/store";
import Blog from "./Blog";

export default function BlogPage() {
  const [state, setstate] = useState(false);
  const blogs = useStore((store) => store.blogs);

  useEffect(() => {
    setstate(true);
  }, []);

  return (
    <div className="flex-grow flex bg-black  flex-row justify-center w-full p-10 pt-32 flex-wrap">
      {state ? (
        blogs?.map((blog) => {
          return (
            <Blog
              title={blog.title}
              name={blog.name}
              blog={blog.blog}
              uploaded={blog.uploaded}
              url={blog.url}
              blogstate={blog.state}
              scrapped={blog.scrapped}
              source={blog.source}
            />
          );
        })
      ) : (
        <h2> Rendering Blogs... </h2>
      )}
    </div>
  );
}
