import { NextResponse } from "next/server";
import { getDailyTrendsForDay } from "../../../../utils/trends";


export async function GET(req){
    const json = await getDailyTrendsForDay();
    return NextResponse.json(json)
}