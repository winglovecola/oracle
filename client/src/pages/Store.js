import React from 'react';
import { Link } from 'react-router-dom';

import ProductList from '../components/ProductList';
// import CategoryMenu from '../components/CategoryMenu';
// import Cart from '../components/Cart';

const Store = () => {
  return (
    <main className="container mx-auto py-6 grow flex justify-center items-center">
      <section className="text-center flex flex-col mb-4 w-full">
        {/* <CategoryMenu /> */}
        <ProductList />
        {/* <Cart /> */}
      </section>
    </main>
  );
};

export default Store;
