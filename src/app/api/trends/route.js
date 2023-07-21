import { NextResponse } from "next/server";
import { getDailyTrendsForDay } from "../../../utils/trends";

export async function GET(req) {
  const json = await getDailyTrendsForDay();
  const data = json.rss.channel;
  console.log(data[0]);
  return NextResponse.json({ ...data[0] });
  // return ()
}
