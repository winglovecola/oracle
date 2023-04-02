import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <div class="group flex relative">
          <img
            className="max-w-full w-[30px] md:w-[53px]"
            src="/src/img/icons/shoppingcart.png"
            alt="shopping cart"
          />
          <span
            class="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-xs text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
            Shopping Cart
          </span>
        </div>
        {/* <span role="img" aria-label="shopping cart">
          <i className="fa-solid fa-cart-shopping text-black md:text-white"></i>
        </span> */}
      </div>
    );
  }

  return (
    <div className="cart min-w-full md:min-w-[45%] lg:min-w-[30%] bg-fuchsia-50 p-5 text-black text-left shadow-xl flex h-full flex-col overflow-y-scroll">
      <div className="close" onClick={toggleCart}>
        <i className="fa-sharp fa-solid fa-x p-3">
          <span className="hidden">[close]</span>
        </i>
      </div>
      <div className="flex flex-col text-center h-full bg-fuchsia-50">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-grey-500 py-5">
          Shopping Cart
        </h2>
        {state.cart.length ? (
          <div className="flex flex-col h-full">
            <div className="divide-y">
              {state.cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
            <div className="" onClick={toggleCart}>
              <button className="p-2 text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-full  text-center">
                <p className="text-xs">Add more items</p>
                <span className="hidden">[close]</span>
              </button>
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <strong className="flex justify-between w-100">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </strong>

              {Auth.loggedIn() ? (
                <button
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={submitCheckout}>
                  Checkout
                </button>
              ) : (
                <span>(log in to check out)</span>
              )}
            </div>
          </div>
        ) : (
          <h6 className="">There is nothing in the cart!</h6>
        )}
      </div>
    </div>
  );
};

export default Cart;
