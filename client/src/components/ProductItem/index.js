import React from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card flex flex-col relative text-black rounded shadow-lg h-[26em] mb-6">
      {/* <Link to={`/products/${_id}`}></Link> */}
      <div className="relative">
        <img
          className="max-w-full w-[250px] left-[50%] -translate-x-[50%] absolute
          "
          alt={name}
          src={`/src/img/items/${image}`}
        />
      </div>
      <div className="px-5 pb-5 pt-[5.5em] mt-auto rounded flex flex-col gap-3 bg-fuchsia-200 hover:bg-fuchsia-300">
        <h6 className="text-2xl text-fuchsia-900">{name}</h6>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
          molestiae
        </p>
        <div className="flex justify-between items-center mb-3 ">
          <p className=" text-sm text-fuchsia-900">
            {quantity} {pluralize('item', quantity)} in stock
          </p>
          <p className="font-bold text-xl">${price}</p>
        </div>

        <button
          className="rounded-full bg-purple-900 text-white px-5 py-2 hover:bg-indigo-700 font-bold uppercase text-sm"
          onClick={addToCart}>
          Feed the Oracle
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
