import React from 'react';
// import ProductList from '../components/ProductList';
// import CategoryMenu from '../components/CategoryMenu';
// import Cart from "../components/Cart";

const Home = () => {
  return (
    <main className="container mx-auto  py-6">
      <section>
        {/* <h3 class="animate__animated animate__bounce">An animated element</h3> */}
        <img
          className="max-w-full w-96 mx-auto rolate-ball"
          src="/src/img/site/crystal-ball-drawing-fortune-telling.png"
          alt="Crystal Ball"
        />
      </section>
      {/* <CategoryMenu /> */}
      {/* <ProductList /> */}
      {/* <Cart /> */}
    </main>
  );
};

export default Home;
