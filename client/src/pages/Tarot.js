import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TAROTS_NAMESHORT, QUERY_TAROTS } from '../utils/queries';

// import { useStoreContext } from '../../utils/GlobalState';

const cards = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
];

const Tarot = () => {
  // const [state, dispatch] = useStoreContext();
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');
  const [card3, setCard3] = useState('');

  const { data } = useQuery(QUERY_TAROTS);
  // console.log(data);

  // const { data } = useQuery(QUERY_TAROTS_NAMESHORT);
  // console.log(data);

  // let user;

  // if (data) {
  //   user = data.user;
  //   console.log(user);
  // }

  // // const { loading, error, data } = useQuery(QUERY_TAROTS_NAMESHORT);
  // // const cardNameShort = getCards();
  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  // console.log(data);

  function getRandomCard(cards) {
    let numOfitems = 3;

    const allCardsArr = [...data.tarotAll];

    //sort takes a function and the sort is looking for either a positive or negative number
    // if the number is positive, it will move the item to the right, if it is negative, it will move the item to the left
    let shuffled = allCardsArr.sort(() => 0.5 - Math.random());
    const selectedNum = shuffled.slice(0, numOfitems);
    // console.log(selectedNum);

    getNumbers(selectedNum);
  }

  function getNumbers(numbers = [1, 2, 3]) {
    console.log(numbers);

    // setCard1(data.tarots[selectedNum[0]].nameShort);
    // setCard2(data.tarots[selectedNum[1]].nameShort);
    // setCard3(data.tarots[selectedNum[2]].nameShort);
  }

  return (
    <main className="container mx-auto py-6 flex flex-col grow">
      <button
        className="btn bg-purple-500 text-white"
        onClick={() => getRandomCard(cards)}>
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
