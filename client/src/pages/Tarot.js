import React from 'react';
// import { Link } from 'react-router-dom';

const Tarot = () => {
  return (
    <main className="container mx-auto py-6 flex flex-col grow">
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
