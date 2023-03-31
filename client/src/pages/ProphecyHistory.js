import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PROPHECY } from "../utils/queries";

//upload photos

function ProphecyHistory() {
  const { loading, error, data } = useQuery(QUERY_PROPHECY);
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // let user;

  // if (data) {
  //   user = data.user;
  //   console.log(user);
  // }
  
  // Use GraphQL to get prophecyHistory, then use loop to go through each and display
  // const [historyContainer, setHistory] = useState([]);

  ////////////////////////////
  // Testing for seeding
    

  let updatedProphecy = data.prophecyHistories.map((data) => {
    console.log(data);
    return data;
  });
    // const newHistorySeed = [data, ...historyContainer];
    // console.log(newHistorySeed);

    // // Call setBucket to update state with our new set of bucket list items
    // setHistory(newHistorySeed);
  ////////////////////////////

  // const removeHistoryItem = (id) => {
  //   const updatedHistory = [...historyContainer].filter(
  //     (item) => item.id !== id
  //   );

  //   setHistory(updatedHistory);
  // };

  return (
    <div>
      <h1>History of Prophecies</h1>
      <div
        // historyContainer={historyContainer}
        // removeHistoryItem={removeHistoryItem}
      ></div>
    </div>
  );
}

export default ProphecyHistory;
