import React from 'react';
// import { Link } from 'react-router-dom';

const cards = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
];

const Tarot = () => {
  function getRandomCard(cards) {
    let numOfitems = 3;

    //sort takes a function and the sort is looking for either a positive or negative number
    // if the number is positive, it will move the item to the right, if it is negative, it will move the item to the left
    let shuffled = cards.sort(() => 0.5 - Math.random());
    const selectedNum = shuffled.slice(0, numOfitems);
    console.log(selectedNum);
  }

  return (
    <main className="container mx-auto py-6 flex flex-col grow">
      <button
        className="btn bg-purple-500 text-white"
        onClick={() => getRandomCard(cards)}>
        random
      </button>
      <section className=" flex grow justify-center items-center">
        <img
          className="max-w-full w-[200px] animate__animated animate__fadeInLeft"
          src="/src/img/site/tarot-card-cover.svg"
          alt="Crystal Ball"
        />
        <img
          className="max-w-full w-[200px] mx-4 animate__animated animate__fadeInRight"
          src="/src/img/site/tarot-card-cover.svg"
          alt="Crystal Ball"
        />
        <img
          className="max-w-full w-[200px] animate__animated animate__fadeInUp"
          src="/src/img/site/tarot-card-cover.svg"
          alt="Crystal Ball"
        />
      </section>
    </main>
  );
};

export default Tarot;
