import React from "react";
import { makecall } from "../utils/chatgpt";

const blogpost = () => {
  return (
    <div>
      <div className="w-full h-1/2 bg-slate-400">
        <button className="text-xl" onClick={makecall}>
          FETCH
        </button>
      </div>
    </div>
  );
};

export default blogpost;
