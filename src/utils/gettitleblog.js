export default function gettitleblog(blog, source) {
  console.log(blog);
  let blogStart = blog.indexOf("Introduction:");
  blogStart+=14
  let actualblog = blog.substring(blogStart);
  if (blogStart == -1) {
    blogStart = blog.indexOf("Blog:");
    blogStart+=6
    actualblog = blog.substring(blogStart);
} else {
    blogStart = 0;
    actualblog = blog.substring(blogStart);
}
console.log(blogStart);
let titleindex = blog.indexOf("title:");

let title = blog.substring(6, blogStart);
if (titleindex == -1) {
    title = blog.substring(0, 0);
    blogStart=0
}

actualblog = blog.substring(blogStart);

  actualblog = actualblog.replace("Blog:", "");

  let noteindex = actualblog.indexOf("(Note:");
  noteindex = actualblog.indexOf("Note:");
  if (noteindex != -1) {
    const note = actualblog.substring(noteindex);
    actualblog = actualblog.replace(note, "");
  }
  actualblog = actualblog.replace(/\n/g, "</br>");
  actualblog = actualblog.concat(
    `</br><p style="opacity:0.4">Source: ${source}</p>`
  );
  console.log({ title, blog: actualblog });
  return { title, blog: actualblog };
}
