import { NextResponse } from "next/server";
import scrapedata from "../../../utils/scrape";

export async function POST(req) {
  const url = await req.json();
  // console.log(6," number line ",data)
  let paras;
  try {
    paras = await scrapedata(url);
  } catch (err) {
    return NextResponse.json({ message:"error" },{status:502});
  }
  return NextResponse.json({ paras },{status:200});
  // const data = json.rss.channel
  // console.log(data[0])
  
  // return ()
}
