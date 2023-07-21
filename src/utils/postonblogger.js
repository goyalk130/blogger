export default async function postonblogger(accessToken,title,blog) {
  console.log(accessToken);
  const response = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/1392779933479218640/posts/`,
    {
        method:"POST",

      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kind: "blogger#post",
        blog: {
          id: "1392779933479218640",
        },
        title: title,
        content: blog,
      }),
    }
  );
  return await response.json();
}
