# [Groww-stonk](https://groww-stonks-thisabhijeet.vercel.app/)

This project is revolves around the concept of Stock Market data. The API that has been used is:
https://www.alphavantage.co/

## Important

- We can only hit the API 5 times/minute and 100 times/day. Please keep this in mind while using the app or else erros might occur.
- Approches have been adopted to make sure that you get to know when the limit has been hit.

## Installation

- Clone this repo using git
- Run "npm i" on the root folder
- Create a .env.local file on the root folder and put in your free API_KEY by the name "NEXT_PUBLIC_API_KEY"
- Run "npm run dev" on the root folder

## Features

Explore page:

- A page with Top gainers and Losers section
- When a Gainer or Loser card is clicked it routes the user to the product page of the same stocks/etfs.
- A CTA to load more Gainer or Loser stocks
- Cross platform

Product Page:

- A page of stocks/etfs showing basic information about it and line graph of prices.

Search Bar:

- Each page contains a common header showing application name and a search bar.
- This search bar should show suggested stocks when user types in it.

General:

- Fully responsive design for small & large screens
- Handling Loading/Error/Empty state for all the cases
- Deployed over Vercel
- Categorize searches in chips as “All”, “Stocks”, “Etfs” and filter the response to show only selected chip’s items in the search bar.

## Tech Stack

- Based on React & NextJS 13 with App Router
- Tailwind CSS for styling
- Axios
- Recharts for LineChart configurations

## API Reference

#### Get Top Gainers & Top Losers

```http
  GET https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo
```

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `apikey`   | `string` | **Required**. Your API key              |
| `function` | `string` | **Required**. Defines the data required |

#### Get Related Items for Search Bar Input

```http
  GET https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo
```

| Parameter  | Type     | Description                                                     |
| :--------- | :------- | :-------------------------------------------------------------- |
| `apikey`   | `string` | **Required**. Your API key                                      |
| `function` | `string` | **Required**. Defines the data required                         |
| `keywords` | `string` | **Required**. This is the basis for a list of related responses |

#### Get Intraday transaction values for LineGraph 1Day selection

```http
  GET https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo
```

| Parameter    | Type     | Description                                                    |
| :----------- | :------- | :------------------------------------------------------------- |
| `apikey`     | `string` | **Required**. Your API key                                     |
| `function`   | `string` | **Required**. Defines the data required                        |
| `symbol`     | `string` | **Required**. Represents the ticker symbol for a company/stock |
| `outputsize` | `string` | **Required**. How much data is required                        |
| `interval`   | `string` | **Required**. Interval for intraday transaction information    |

#### Get All historical transaction values for other LineGraph selections

```http
  GET https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo
```

| Parameter    | Type     | Description                                                    |
| :----------- | :------- | :------------------------------------------------------------- |
| `apikey`     | `string` | **Required**. Your API key                                     |
| `function`   | `string` | **Required**. Defines the data required                        |
| `symbol`     | `string` | **Required**. Represents the ticker symbol for a company/stock |
| `outputsize` | `string` | **Required**. How much data is required                        |

#### Get a specific company/stock data

```http
  GET https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
```

```http
  GET https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
```

| Parameter  | Type     | Description                                                    |
| :--------- | :------- | :------------------------------------------------------------- |
| `apikey`   | `string` | **Required**. Your API key                                     |
| `function` | `string` | **Required**. Defines the data required                        |
| `symbol`   | `string` | **Required**. Represents the ticker symbol for a company/stock |
