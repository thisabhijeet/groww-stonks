import axios from "axios";
import React, { useEffect, useState } from "react";

function CompanyHeader({
  name,
  symbol,
  assetType,
  exchange,
  currentPrice,
  changePercentage,
  gain,
}) {
  return (
    <div className="px-4 flex flex-col">
      <div className="flex justify-between gap-2 items-center">
        <div className="flex flex-col">
          <div className="sm:text-[24px] font-bold">{name}</div>
          <div className="text-gray-800 sm:text-[20px] font-medium">
            {symbol}, {assetType}
          </div>
          <div className="text-gray-500 sm:text-[16px]">{exchange}</div>
        </div>
        <div className="flex flex-col items-center sm:text-[20px]">
          <div className="text-[14px] sm:text-[20px] font-bold">
            &#36; {currentPrice}
          </div>
          {gain && (
            <div className="flex gap-2 items-center">
              <div className="text-green-500 sm:text-[12px]">
                +
                {changePercentage.split(".")[0] +
                  "." +
                  changePercentage.split(".")[1].slice(0, 2)}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
                className="w-4 h-4 fill-green-500"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          {!gain && (
            <div className="flex gap-2 items-center">
              <div className="text-red-600 text-[12px]">
                {changePercentage.split(".")[0] +
                  "." +
                  changePercentage.split(".")[1].slice(0, 2)}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                className="w-4 h-4 fill-red-600"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyHeader;
