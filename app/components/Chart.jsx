import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Chart({ ticker }) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [priceVariationList, setPriceVariationList] = useState([]);
  const [timeline, setTimeline] = useState("1D");
  const [templist, setTemplist] = useState({});
  const [loadState, setLoadState] = useState("Loading");

  useEffect(() => {
    // console.log(templist);
    if (timeline === "1D") {
      const temp = [];
      Object.keys(templist).forEach((key) => {
        const tempObj = {};
        tempObj["time"] = key.split(" ")[1].slice(0, 5);
        tempObj["value"] = templist[key]["4. close"];
        temp.push(tempObj);
      });
      setPriceVariationList(temp);
    } else {
      const temp = [];
      Object.keys(templist).forEach((key) => {
        const tempObj = {};
        tempObj["time"] = key;
        tempObj["value"] = templist[key]["4. close"];
        temp.push(tempObj);
      });
      let deduct = 0;
      if (timeline === "1W") {
        deduct = 518400000;
      } else if (timeline === "1M") {
        deduct = 2505600000;
      } else if (timeline === "3M") {
        deduct = 7689600000;
      } else if (timeline == "6M") {
        deduct = 15465600000;
      } else if (timeline == "1Y") {
        deduct = 31449600000;
      }
      let d = Date.parse(temp[0]["time"]);
      let s = d;
      let e = d - deduct;
      let i = 0,
        j = 0;
      const finalTemp = [];
      while (s >= e) {
        let d1 = Date.parse(temp[j]["time"]);
        if (d1 == s) {
          finalTemp.push(temp[j]);
          j++;
        }
        i++;
        s = d - 86400000 * i;
      }
      setPriceVariationList(finalTemp);
    }
  }, [templist]);

  const fetchInitialList = async () => {
    if (timeline === "1D") {
      const temp = await axios.get(
        // "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${API_KEY}`
      );
      if (temp.data["Time Series (5min)"]) {
        setTemplist(temp.data["Time Series (5min)"]);
      } else {
        setLoadState("Error");
      }
    } else {
      const temp = await axios.get(
        // "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo"
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${API_KEY}`
      );
      if (temp.data["Time Series (Daily)"]) {
        setTemplist(temp.data["Time Series (Daily)"]);
      } else {
        setLoadState("Error");
      }
    }
  };

  useEffect(() => {
    setLoadState("Success");
  }, [priceVariationList]);

  useEffect(() => {
    setLoadState("Loading");
    fetchInitialList();
  }, [timeline]);

  return (
    <div className="max-w-[1026px] mt-4 mx-auto flex flex-col items-center gap-2">
      {loadState == "Loading" && (
        <div className="text-gray-500 text-center font-semibold text-[20px] mt-4">
          Loading Graphical data.
        </div>
      )}
      {loadState == "Success" && (
        <div className="w-full flex flex-col items-center">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={priceVariationList}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                padding={{ left: 10 }}
                angle={-45}
                minTickGap={10}
                height={50}
                reversed
                dataKey="time"
              />
              <YAxis domain={["dataMin-1", "dataMax+1"]} />
              <Tooltip />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-2">
            <div
              className="py-2 px-4 bg-blue-300 rounded-full cursor-pointer"
              onClick={() => {
                setTimeline("1D");
              }}
            >
              1D
            </div>
            <div
              className="py-2 px-4 bg-blue-300 rounded-full cursor-pointer"
              onClick={() => {
                setTimeline("1W");
              }}
            >
              1W
            </div>
            <div
              className="py-2 px-4 bg-blue-300 rounded-full cursor-pointer"
              onClick={() => {
                setTimeline("1M");
              }}
            >
              1M
            </div>
            <div
              className="py-2 px-4 bg-blue-300 rounded-full cursor-pointer"
              onClick={() => {
                setTimeline("3M");
              }}
            >
              3M
            </div>
            <div
              className="py-2 px-4 bg-blue-300 rounded-full cursor-pointer"
              onClick={() => {
                setTimeline("6M");
              }}
            >
              6M
            </div>
            <div
              className="py-2 px-4 bg-blue-300 rounded-full cursor-pointer"
              onClick={() => {
                setTimeline("1Y");
              }}
            >
              1Y
            </div>
          </div>
        </div>
      )}
      {loadState == "Error" && (
        <div className="text-gray-500 text-center font-semibold text-[20px] mt-4">
          Some error occured, try after sometime!
        </div>
      )}
    </div>
  );
}

export default Chart;
