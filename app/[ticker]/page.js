"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "../components/Chart";
import CompanyHeader from "../components/CompanyHeader";
import CompanyInfo from "../components/CompanyInfo";

export default function Page({ params }) {
  const API_KEY = process.env.API_KEY;

  const [currentPrice, setCurrentPrice] = useState("0.0");
  const [changePercentage, setChangePercentage] = useState("0.0");
  const [companyData, setCompanyData] = useState({});
  const [gain, setGain] = useState(true);
  const [loadState, setLoadState] = useState("Loading");
  const [errorMssg, setErrorMssg] = useState("");

  const fetchCompanyData = async () => {
    const data = await axios.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`
      // `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${params.ticker}&apikey=${API_KEY}`
    );
    const data2 = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`
      // `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${params.ticker}&apikey=${API_KEY}`
    );
    // console.log(data);
    if (data.data.Symbol && data2.data["Global Quote"]) {
      setCompanyData(data.data);
      setCurrentPrice(data2.data["Global Quote"]["05. price"]);
      setChangePercentage(data2.data["Global Quote"]["10. change percent"]);
      setLoadState("Success");
    } else {
      // console.log(data.data);
      if (
        Object.keys(data.data).length == 0 ||
        Object.keys(data2.data).length == 0
      ) {
        setErrorMssg("Please try searching for a valid Commodity or Company");
        setLoadState("Error");
      } else {
        setErrorMssg(
          "You have reached the API requests limits. Try after sometime."
        );
        setLoadState("Error");
      }
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  useEffect(() => {
    changePercentage[0] == "-" ? setGain(false) : setGain(true);
  }, [changePercentage]);

  return (
    <div className="max-w-[1026px] mt-4 mb-8 mx-auto">
      {loadState == "Loading" && (
        <div className="text-gray-500 text-center font-semibold text-[20px] mt-4">
          Please wait for a few second we are curating the company profile!
        </div>
      )}
      {loadState == "Success" && (
        <div>
          <CompanyHeader
            name={companyData.Name}
            symbol={companyData.Symbol}
            assetType={companyData.AssetType}
            exchange={companyData.Exchange}
            currentPrice={currentPrice}
            changePercentage={changePercentage}
            gain={gain}
          />
          <Chart ticker={params.ticker} />
          <CompanyInfo
            name={companyData.Name}
            desc={companyData.Description}
            low={companyData["52WeekLow"]}
            high={companyData["52WeekHigh"]}
            beta={companyData.Beta}
            per={companyData.PERatio}
            profitMargin={companyData.ProfitMargin}
            industry={companyData.Industry}
            sector={companyData.Sector}
            currentPrice={currentPrice}
          />
        </div>
      )}
      {loadState == "Error" && (
        <div className="text-gray-500 text-center font-semibold text-[20px] mt-4">
          {errorMssg}
        </div>
      )}
    </div>
  );
}
