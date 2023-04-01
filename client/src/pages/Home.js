import React from 'react';
import { Link } from 'react-router-dom';

// import ProductList from '../components/ProductList';
// import CategoryMenu from '../components/CategoryMenu';
// import Cart from '../components/Cart';

const Home = () => {
  return (
    <main className="container mx-auto py-6 grow flex justify-center items-center">
      <section className="text-center flex flex-col mb-3">
        {/* <h3 class="animate__animated animate__bounce">An animated element</h3> */}
        {/* <img
          className="max-w-full w-96 mx-auto rolate-ball opacity-70"
          src="/src/img/site/crystal-ball-drawing-fortune-telling.png"
          alt="Crystal Ball"
        /> */}

        <Link to="/tarot">
          <button className="bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold py-2 px-4 border-b-4 border-fuchsia-700 hover:border-fuchsia-500 rounded mt-6">
            Look at my future
          </button>
        </Link>
        <Link to="/store">
          <button className="bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold py-2 px-4 border-b-4 border-fuchsia-700 hover:border-fuchsia-500 rounded mt-6">
            Store
          </button>
        </Link>
      </section>
      {/* <CategoryMenu />
      <ProductList />
      <Cart /> */}
    </main>
  );
};

export default Home;
