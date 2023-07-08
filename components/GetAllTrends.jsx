"use client"
import axios from 'axios'
import React, { useState } from 'react'

const GetAllTrends = ({state,setstate}) => {
  
    async function getdata(){

        const res = await axios.get(`/api/trends`)

        console.log((res.data.item))
        setstate(res.data.item)
    }
    console.log(state);
    


  return (
    <div>
    <button onClick={getdata} className='bg-white p-5 text-white'>GET</button>
    Trend</div>
  )
}

export default GetAllTrends