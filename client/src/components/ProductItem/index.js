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
    <div className="card bg-white text-black rounded overflow-hidden shadow-lg ">
      <Link to={`/products/${_id}`}>
        <img
          className="max-w-full"
          alt={name}
          src={`/src/img/items/${image}`}
        />
      </Link>
      <div className="p-5 flex flex-col gap-3">
        <h6 className="text-2xl">{name}</h6>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
          molestiae
        </p>
        <div class="flex justify-between items-center mb-3">
          <p className=" text-sm text-purple-900">
            {quantity} {pluralize('item', quantity)} in stock
          </p>
          <p className="font-bold text-xl">${price}</p>
        </div>

        <button
          className="rounded-full bg-purple-900 text-white px-5 py-2 hover:bg-indigo-700 font-bold uppercase text-sm"
          onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
