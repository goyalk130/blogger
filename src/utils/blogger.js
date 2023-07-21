
export const getPosts = async (accessToken) => {
  console.log(accessToken)
  const response = await fetch(
    `https://www.googleapis.com/blogger/v3/users/self/blogs`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};
