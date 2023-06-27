import { getPosts } from '../../../utils/blogger';

export default function Blog() {
  // const [session] = useSession();

  // if (!session) {
  //   return <div>Please sign in to access the blog.</div>;
  // }

  return (
    <div>
      <h1>Welcome to the Blog</h1>
      {/* {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))} */}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   let posts = [];

//   if (session && session.accessToken) {
//     posts = await getPosts(session.accessToken);
//   }

//   return {
//     props: {
//       posts,
//     },
//   };
// }
