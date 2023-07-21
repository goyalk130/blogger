import { create } from "zustand";
import { persist } from "zustand/middleware";
import joinScrapeData from "./joinscrapedata";
import { makecall } from "./chatgpt";

const useStore = create(
  persist(
    (set) => ({
      blogs: [],
      trend: [],
      addName: (name, url, source) =>
        set((store) => {
          console.log(name);
          return {
            blogs: store.blogs.some((eachblog) => eachblog.name == name)
              ? store.blogs
              : [
                  
                  {
                    name,
                    source,
                    url,
                    title: " ",
                    blog: " ",
                    uploaded: false,
                    state: "scrape",
                    scrapped: " ",
                  },
                  ...store.blogs,
                ],
          };
        }),
      settrends: (trends) => set((store) => ({ trend: trends })),
      settitle: (name, title) =>
        set((store) => ({
          blogs: store.blogs.map((blog) => {
            return { ...blog, title: blog.name == name ? title : blog.title };
          }),
        })),
      setblog: (name, newblog) =>
        set((store) => ({
          blogs: store.blogs.map((blog) => {
            return { ...blog, blog: blog.name == name ? newblog : blog.blog };
          }),
        })),
        settitleblog:(name,data)=>(set((store)=>({
          blogs:store.blogs.map(blog=>{
              if(blog.name==name){
                return {...blog,title:data.title,blog:data.blog}
              }else{
                return blog
              }
          })
        }))),
      setupload: (name) =>
        set((store) => ({
          blogs: store.blogs.map((blog) => {
            return {
              ...blog,
              uploaded: blog.name == name ? true : blog.uploaded,
            };
          }),
        })),
      setScarping: (name) =>
        set((store) => ({
          blogs: store.blogs.map((blog) => {
            return {
              ...blog,
              state:
                blog.name == name ? (blog.state = "scrapping") : blog.state,
            };
          }),
        })),
      setScarpedData: (name, data) =>
        set((store) => ({
          blogs: store.blogs.map((blog) => {
            let joineddata = "";
            if (blog.name == name) {
              console.log(data);
              joineddata = joinScrapeData(data.paras.paragraphs);
              console.log(joineddata);
            }
            return {
              ...blog,
              scrapped:
                blog.name == name
                  ? (blog.scrapped = joineddata)
                  : blog.scrapped,
              state: blog.name == name ? (blog.state = "Get Blog") : blog.state,
            };
          }),
        })),
      setScrape: (name) =>
        set((store) => ({
          blogs: store.blogs.map((blog) => ({
            ...blog,
            state: blog.name == name ? (blog.state = "Scrape") : blog.state,
          })),
        })),
    }),

    { name: "blogs" }
  )
);

export default useStore;
