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
  
  //TODO



  return (
    <h3>Prophecy History</h3>
  );
}



export default ProphecyHistory;