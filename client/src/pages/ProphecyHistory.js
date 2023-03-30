import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';



//upload photos


function ProphecyHistory() {
  
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    console.log (user);
  }

  const [historyContainer, setHistory] = useState([]);

  const removeHistoryItem = (id) => {
    const updatedHistory = [...historyContainer].filter((item) => item.id !== id);

    setHistory(updatedHistory);
  };

  return (
    <div>
      <h1>History of Prophecies</h1>
      <div
        historyContainer={historyContainer}
        removeHistoryItem={removeHistoryItem}
      ></div>
      <h1>Bottom Check - History of Prophecies</h1>
    </div>
  );
}



export default ProphecyHistory;