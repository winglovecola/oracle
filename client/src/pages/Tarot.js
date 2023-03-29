import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { QUERY_RANDOM_CARDS } from '../utils/queries';

// import { useStoreContext } from '../../utils/GlobalState';

const Tarot = () => {
  // const [state, dispatch] = useStoreContext();
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');
  const [card3, setCard3] = useState('');
  const [num, setNum] = useState(3);

  const [getCards, { loading, data }] = useLazyQuery(QUERY_RANDOM_CARDS, {
    variables: { num },
  });
  // console.log(data.tarotAll);

  // console.log(cardNameShort);
  function displayCard() {
    setNum(num + 1);
    getCards();
    if (data && data.tarotRandom) {
      console.log(data.tarotRandom);
    }
    // console.log(data);
    setCard1(selectedNum[0].nameShort);
    setCard2(selectedNum[1].nameShort);
    setCard3(selectedNum[2].nameShort);
  }

  return (
    <main className="container mx-auto py-6 flex flex-col grow">
      <button
        className="btn bg-purple-500 text-white"
        onClick={() => displayCard()}>
        random
      </button>
      <section className=" flex grow justify-center items-center">
        <div>
          <h6>{card1}</h6>
          <img
            className="max-w-full w-[200px] animate__animated animate__fadeInLeft"
            src="/src/img/site/tarot-card-cover.svg"
            alt="Crystal Ball"
          />
        </div>
        <div className="card">
          <h6>{card2}</h6>
          <img
            className="max-w-full w-[200px] mx-4 animate__animated animate__fadeInRight"
            src="/src/img/site/tarot-card-cover.svg"
            alt="Crystal Ball"
          />
        </div>
        <div className="card">
          <h6>{card3}</h6>
          <img
            className="max-w-full w-[200px] animate__animated animate__fadeInUp"
            src="/src/img/site/tarot-card-cover.svg"
            alt="Crystal Ball"
          />
        </div>
      </section>
    </main>
  );
};

export default Tarot;
