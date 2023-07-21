import { getPosts } from "./blogger";

const handleGetPosts = async (session) => {
    console.log(session);
    if (session && session.accessToken) {
      const posts = await getPosts(session.accessToken);
      console.log(posts); // Use the posts data as needed
    }
  };

  export default handleGetPosts;