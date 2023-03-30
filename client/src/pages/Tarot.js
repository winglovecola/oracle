import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_TAROTS_NAMESHORT, QUERY_TAROTS } from '../utils/queries';

const Tarot = () => {
  const [card1, setCard1] = useState(['', 'site/tarot-card-cover.svg']);
  const [card2, setCard2] = useState('');
  const [card3, setCard3] = useState('');
  const [arrOf3Cards, setArrOf3Cards] = useState([]);

  const { loading, error, data: allCardsData } = useQuery(QUERY_TAROTS);
  const [FnGetThreeCards, { data: threeCardsData }] = useLazyQuery(
    QUERY_TAROTS_NAMESHORT,
    {
      variables: { nameShorts: arrOf3Cards },
    }
  );
  useEffect(() => {
    async function init() {
      console.log(arrOf3Cards);
      await FnGetThreeCards();
      console.log(threeCardsData);
    }
    init();
  }, [arrOf3Cards]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // Get upright or reversed
  function getSide() {
    let upOrReserve = Math.random() > 0.5 ? 'U' : 'R';
    return upOrReserve;
  }

  function flipCards() {}

  function getRandomCard() {
    const allCardsArr = [...allCardsData.tarotAll];

    const arryNum = [1, 25, 78];

    //sort takes a function and the sort is looking for either a positive or negative number
    // if the number is positive, it will move the item to the right, if it is negative, it will move the item to the left
    let shuffled = allCardsArr.sort(() => 0.5 - Math.random());
    console.log(shuffled);

    const threeCards = [];

    threeCards.push(
      shuffled[arryNum[0] - 1].nameShort,
      shuffled[arryNum[1] - 1].nameShort,
      shuffled[arryNum[2] - 1].nameShort
    );

    let arrOfSides = [];
    for (let i = 0; i < threeCards.length; i++) {
      arrOfSides.push(getSide());
    }
    console.log(arrOfSides);

    setCard1(`${threeCards[0]}`);
    setCard2(`${threeCards[1]}`);
    setCard3(`${threeCards[2]}`);
    // setCard2(`${threeCards[1]}, ${arrOfSides[1]}`);
    // setCard3(`${threeCards[2]}, ${arrOfSides[2]}`);

    setArrOf3Cards(threeCards);
  }

  return (
    <main className="container mx-auto py-6 flex flex-col grow">
      <button
        className="btn bg-purple-500 text-white"
        onClick={() => getRandomCard()}>
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
          <img
            className="max-w-full w-[200px] animate__animated animate__fadeInLeft"
            src={`/src/img/tarot-card/${card1}.jpg`}
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
