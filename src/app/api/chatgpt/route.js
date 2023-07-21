import { makecall } from "@/utils/chatgpt";
import { NextResponse } from "next/server";

export async function POST(req){
    const data = await req.json()
    const res = await makecall(data.topic,data.paras)
    console.log( res)
    return NextResponse.json({state:res},{status:200})
}