import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

function CompanyInfo({
  name,
  desc,
  low,
  high,
  per,
  beta,
  profitMargin,
  industry,
  sector,
  currentPrice,
}) {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ml =
    Math.floor(
      ((currentPrice - low) / (high - low)) * ref2.current?.offsetWidth
    ) -
    ref.current?.offsetWidth / 2;
  return (
    <div className="flex flex-col gap-2 mt-4 py-2 px-4 border-2 border-gray-400 rounded-md">
      <div className="border-b-2 border-gray-400">More about {name}</div>
      <div className="text-[14px]">{desc}</div>
      <div className="flex flex-col sm:flex-row text-[14px] text-white font-semibold sm:font-bold gap-4 mt-2">
        <div className="py-2 px-4 border-2 bg-blue-300 rounded-full">
          Industry: {industry}
        </div>
        <div className="py-2 px-4 border-2 bg-blue-300 rounded-full">
          Sector: {sector}
        </div>
      </div>

      <div className="flex mt-4 items-center gap-2">
        <div className="flex flex-col items-center text-[14px] text-gray-500 font-medium">
          <div>52 week low</div>
          <div>&#36; {low}</div>
        </div>
        <div className="flex flex-col grow">
          <div
            className={` bg-blue-500 text-white text-[12px] p-1 max-w-fit rounded-md`}
            style={{ marginLeft: ml }}
            ref={ref}
          >
            Current Price:
            {currentPrice.split(".")[0] +
              "." +
              currentPrice.split(".")[1].slice(0, 2)}
          </div>
          <input
            ref={ref2}
            id="disabled-range"
            type="range"
            min={low}
            max={high}
            value={currentPrice}
            className="mt-2 grow h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer"
            disabled
          />
        </div>
        <div className="flex flex-col items-center text-[14px] text-gray-500 font-medium">
          <div>52 week high</div>
          <div>&#36; {high}</div>
        </div>
      </div>
      <div className="flex gap-20 mt-4 justify-center">
        <div className="flex flex-col">
          <div className="text-gray-700 text-[16px]">P/E Ratio</div>
          <div className="text-gray-700 text-[14px] font-bold">{per}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-700 text-[16px]">Beta</div>
          <div className="text-gray-700 text-[14px] font-bold">{beta}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-700 text-[16px]">Profit Margin</div>
          <div className="text-gray-700 text-[14px] font-bold">
            {profitMargin}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;
