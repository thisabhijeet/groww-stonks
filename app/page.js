"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import TickerCard from "./components/TickerCard";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [gainerList, setGainerList] = useState([]);
  const [loserList, setLoserList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [currentTab, setCurrentTab] = useState("TopGainers");
  const [loadState, setLoadState] = useState("Loading");
  const [errorMssg, setErrorMssg] = useState("");

  const fetchStockList = async () => {
    const data = await axios.get(
      // `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo`
      `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`
    );
    if (data.data.top_gainers) {
      setGainerList(data.data.top_gainers);
      setLoserList(data.data.top_losers);
    } else {
      setErrorMssg(
        "You have reached the API requests limits. Try after sometime."
      );
      setLoadState("Error");
    }
  };

  useEffect(() => {
    setRenderList(gainerList?.slice(0, 15));
    setLoadState("Success");
  }, [gainerList]);

  useEffect(() => {
    setRenderList(
      currentTab == "TopGainers"
        ? gainerList?.slice(0, 15)
        : loserList?.slice(0, 15)
    );
  }, [currentTab]);

  useEffect(() => {
    fetchStockList();
  }, []);

  const handleLoadMore = () => {
    const newSize = renderList.length + 15;
    console.log(currentTab);
    setRenderList(
      currentTab == "TopGainers"
        ? gainerList.slice(0, newSize)
        : loserList.slice(0, newSize)
    );
  };

  return (
    <div className="max-w-[1026px] flex flex-col items-center mx-auto mt-4 px-4 mb-4">
      <div className="flex gap-8 font-medium w-full">
        <div
          className={
            currentTab === "TopGainers"
              ? "px-4 cursor-pointer border-b-4 border-blue-400 rounded-md"
              : "px-4 cursor-pointer"
          }
          onClick={() => {
            setCurrentTab("TopGainers");
          }}
        >
          Top Gainers
        </div>
        <div
          className={
            currentTab === "TopLosers"
              ? "px-4 cursor-pointer border-b-4 border-blue-400 rounded-md"
              : "px-4 cursor-pointer"
          }
          onClick={() => {
            setCurrentTab("TopLosers");
          }}
        >
          Top Losers
        </div>
      </div>
      {loadState == "Loading" && (
        <div className="text-gray-500 text-center font-semibold text-[20px] mt-4 w-full">
          Stay excited as the list of {currentTab} get Loaded!
        </div>
      )}
      {loadState == "Success" && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {renderList?.map((e, i) => {
            return (
              <TickerCard
                key={i}
                ticker={e.ticker}
                price={e.price}
                change_percentage={e.change_percentage}
                gain={currentTab == "TopGainers" ? true : false}
              />
            );
          })}
        </div>
      )}
      {loadState == "Success" && renderList.length < gainerList.length && (
        <div
          className="text-gray-500 w-[150px] font-bold mt-4 text-center px-2 py-3 border-2 shadow-md cursor-pointer rounded-full"
          onClick={handleLoadMore}
        >
          Load More
        </div>
      )}
      {loadState == "Error" && (
        <div className="text-gray-500 text-center font-semibold text-[20px] mt-4 w-full">
          {errorMssg}
        </div>
      )}
    </div>
  );
}
