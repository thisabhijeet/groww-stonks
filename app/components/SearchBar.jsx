"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function SearchBar() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [searchInput, setSearchInput] = useState("");
  const [relatedItems, setRelatedItems] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [chip, setChip] = useState("All");
  const [loadState, setLoadState] = useState("");
  const [errorMssg, setErrorMssg] = useState("");

  const fetchRelatedItems = async () => {
    const data = await axios.get(
      // `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo`
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchInput}&apikey=${process.env.API_KEY}`
    );
    // console.log(data);
    if (data.data.bestMatches) {
      setRelatedItems(data.data.bestMatches);
    } else {
      setErrorMssg(
        "You have reached the API requests limits. Try after sometime."
      );
      setLoadState("Error");
    }
  };

  useEffect(() => {
    // console.log(relatedItems);
    if (chip == "All") {
      setRenderList(relatedItems);
      setLoadState("Success");
    } else if (chip == "Stocks") {
      setRenderList(
        relatedItems?.filter(
          (item) => item["3. type"].toLowerCase().slice(0, 5) == "stock"
        )
      );
      setLoadState("Success");
    } else if (chip == "Etfs") {
      setRenderList(
        relatedItems?.filter(
          (item) => item["3. type"].toLowerCase().slice(0, 3) == "etf"
        )
      );
      setLoadState("Success");
    } else if (chip == "Equity") {
      setRenderList(
        relatedItems?.filter(
          (item) => item["3. type"].toLowerCase().slice(0, 6) == "equity"
        )
      );
      setLoadState("Success");
    }
  }, [relatedItems, chip]);

  useEffect(() => {
    if (searchInput != "") {
      setLoadState("Loading");
      fetchRelatedItems();
    } else {
      setLoadState("");
    }
  }, [searchInput]);

  return (
    <div className="max-w-[1536px] text-white bg-blue-300 py-2 mx-auto">
      <div className="max-w-[1026px] mx-auto flex flex-col gap-4 sm:flex-row sm:gap-8 sm:px-4 items-center">
        <Link href="/">
          <div className="flex items-center gap-2 font-bold text-[20px]">
            GrowwStonks
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </div>
        </Link>

        <div
          className={
            loadState == ""
              ? "relative flex grow gap-4 px-4 py-2 bg-white border rounded-full"
              : "relative flex grow gap-4 px-4 py-2 bg-white border-t rounded-t-full"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="gray"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            className="grow outline-none text-gray-600 font-medium"
            type="text"
            value={searchInput}
            placeholder="Search stocks & etfs"
            onChange={(e) => {
              setSearchInput(() => {
                return e.target.value;
              });
            }}
          />
          {loadState == "Loading" && (
            <div className="text-gray-500 text-[14px] font-medium z-50 absolute pt-2 pl-14 left-0 w-full top-[40px] bg-white border-b rounded-b-lg sm:border-b sm:rounded-b-full">
              Searching for Related Suggestions!
            </div>
          )}
          {loadState == "Error" && (
            <div className="text-gray-500 text-[14px] font-medium z-50 absolute pt-2 pl-14 left-0 w-full top-[40px] bg-white border-b rounded-b-lg sm:border-b sm:rounded-b-full">
              {errorMssg}
            </div>
          )}
          {loadState == "Success" && (
            <div className="z-50 flex flex-col absolute left-0 w-full top-[40px] text-blue-500 bg-white">
              <div className="flex gap-4 px-4 py-2 border-x font-medium text-[14px] sm:text-[16px]">
                <div
                  className={
                    chip == "All"
                      ? "text-white font-medium border-2 py-1 px-2 rounded-full cursor-pointer bg-blue-300"
                      : "text-gray-500 font-medium border-2 py-1 px-2 rounded-full cursor-pointer"
                  }
                  onClick={() => {
                    setChip("All");
                  }}
                >
                  All
                </div>
                <div
                  className={
                    chip == "Stocks"
                      ? "text-white font-medium border-2 py-1 px-2 rounded-full cursor-pointer bg-blue-300"
                      : "text-gray-500 font-medium border-2 py-1 px-2 rounded-full cursor-pointer"
                  }
                  onClick={() => {
                    setChip("Stocks");
                  }}
                >
                  Stocks
                </div>
                <div
                  className={
                    chip == "Etfs"
                      ? "text-white font-medium border-2 py-1 px-2 rounded-full cursor-pointer bg-blue-300"
                      : "text-gray-500 font-medium border-2 py-1 px-2 rounded-full cursor-pointer"
                  }
                  onClick={() => {
                    setChip("Etfs");
                  }}
                >
                  Etfs
                </div>
                <div
                  className={
                    chip == "Equity"
                      ? "text-white font-medium border-2 py-1 px-2 rounded-full cursor-pointer bg-blue-300"
                      : "text-gray-500 font-medium border-2 py-1 px-2 rounded-full cursor-pointer"
                  }
                  onClick={() => {
                    setChip("Equity");
                  }}
                >
                  Equity
                </div>
              </div>
              {renderList.length == 0 && (
                <div className="px-4 py-2 border-x font-medium text-[14px] sm:text-[16px]">
                  No items Found! Try to search for some other keyword.
                </div>
              )}
              {renderList?.map((item, i) => {
                return (
                  <Link
                    key={i}
                    href={`/${item["1. symbol"]}`}
                    onClick={() => {
                      setSearchInput("");
                    }}
                  >
                    <div
                      className={
                        i == relatedItems.length - 1
                          ? "flex justify-between px-4 py-2 border-x font-medium text-[14px] sm:text-[16px] border-b rounded-b-lg sm:border-b sm:rounded-b-full"
                          : "flex justify-between px-4 py-2 border-x font-medium text-[14px] sm:text-[16px]"
                      }
                    >
                      <div>{item["2. name"]}</div>
                      <div>{item["1. symbol"]}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
