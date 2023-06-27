import axios from 'axios';

export const getPosts = async (accessToken) => {
  console.log(accessToken)
  const response = await axios.get(
    `https://www.googleapis.com/blogger/v3/users/self/blogs`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};
