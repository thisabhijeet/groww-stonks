import Link from "next/link";
import React from "react";

function TickerCard({ ticker, price, change_percentage, gain }) {
  return (
    <Link href={`/${ticker}`}>
      <div className="px-4 py-2 border-2 cursor-pointer rounded-md shadow-sm">
        <div className="text-[20px] font-bold">{ticker}</div>
        <div className="text-[14px] text-gray-600">&#36; {price}</div>
        {gain && (
          <div className="flex gap-2 items-center">
            <div className="text-green-500 text-[12px]">
              +
              {change_percentage.split(".")[0] +
                "." +
                change_percentage.split(".")[1].slice(0, 2)}
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
            <div
              className={
                gain ? "text-green-500 text-[12px]" : "text-red-600 text-[12px]"
              }
            >
              {change_percentage.split(".")[0] +
                "." +
                change_percentage.split(".")[1].slice(0, 2)}
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
    </Link>
  );
}

export default TickerCard;
