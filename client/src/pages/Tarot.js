import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TAROTS_NAMESHORT, QUERY_TAROTS } from '../utils/queries';

const Tarot = () => {
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');
  const [card3, setCard3] = useState('');
  const [formState, setFormState] = useState({});

  const { loading, error, data } = useQuery(QUERY_TAROTS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // const { data } = useQuery(QUERY_TAROTS_NAMESHORT);
  // console.log(data);

  // // const { loading, error, data } = useQuery(QUERY_TAROTS_NAMESHORT);
  // // const cardNameShort = getCards();

  function getRandomCard() {
    const allCardsArr = [...data.tarotAll];

    const arryNum = [1, 25, 78];

    //sort takes a function and the sort is looking for either a positive or negative number
    // if the number is positive, it will move the item to the right, if it is negative, it will move the item to the left
    let shuffled = allCardsArr.sort(() => 0.5 - Math.random());
    console.log(shuffled);

    setCard1(shuffled[arryNum[0] - 1].nameShort);
    setCard2(shuffled[arryNum[1] - 1].nameShort);
    setCard3(shuffled[arryNum[2] - 1].nameShort);
  }

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(formState);
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };

  return (
    <main className="container mx-auto py-6 flex flex-col grow">
      <button
        className="btn bg-purple-500 text-white"
        onClick={() => getRandomCard()}>
        random
      </button>

      {/* <form
        onSubmit={handleFormSubmit}
        className="flex flex-col w-full max-w-xs bg-white shadow-md rounded text-black">
        <label htmlFor="Num1">First Number:</label>
        <input
          className="text-black"
          type="text"
          id="Num1"
          name="Num1"
          placeholder="1st Number"
          onChange={handleChange}
        />
        <label htmlFor="Num2">2nd Number:</label>
        <input
          className="text-black"
          type="text"
          id="Num2"
          name="Num2"
          placeholder="2nd Number"
          onChange={handleChange}
        />
        <label htmlFor="Num3">3rd Number:</label>
        <input
          className="text-black"
          type="text"
          id="Num3"
          name="Num3"
          placeholder="3rd Number"
          onChange={handleChange}
        />
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit">
          Submit
        </button>
      </form> */}

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
