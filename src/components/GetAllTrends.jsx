"use client";
import axios from "axios";
import React, { useState } from "react";
import useStore from "../utils/store";
import { useRouter } from "next/navigation";

const GetAllTrends = () => {
  const settrends = useStore((store) => store.settrends);
  const router = useRouter()

  async function getdata() {
    const res = await axios.get(`/api/trends`);

    console.log(res.data.item);
    settrends(res.data.item);
    router.push("/")
  }

  return (
    <div>
      <button onClick={getdata} className=" p-5 text-white">
        GET Trend
      </button>
    </div>
  );
};

export default GetAllTrends;
