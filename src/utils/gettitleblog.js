export default function gettitleblog(blog,source) {
  console.log(blog);
  let blogStart = blog.indexOf("Introduction:");
  if (blogStart == -1) {
    let blogStart = blog.indexOf("Blog:");
  }
  console.log(blogStart);
  let title = blog.substring(6, blogStart);
  let actualblog = blog.substring(blogStart + 14);

  actualblog = actualblog.replace("Blog:", "");

  let noteindex = actualblog.indexOf('(Note:');
  noteindex = actualblog.indexOf("Note:");
  if (noteindex != -1) {
    const note = actualblog.substring(noteindex);
    actualblog = actualblog.replace(note, "");
  }
  actualblog=actualblog.replace(/\n/g,"</br>")
  actualblog=actualblog.concat(`</br><p style="opacity:0.4">Source: ${source}</p>`)
  console.log({ title, blog: actualblog });
  return { title, blog: actualblog };

}

