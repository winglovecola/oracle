import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex flex-wrap py-3">
      <div>
        <img
          className="w-[70px] mr-4"
          src={`/src/img/items/${item.image}`}
          alt=""
        />
      </div>
      <div class="grow flex-col mb-2">
        <div className="flex justify-between mb-1">
          <span className="font-bold text-slate-600 text-sm">{item.name}</span>
          <span className="font-bold text-slate-600 text-sm">
            ${item.price}
          </span>
        </div>
        <div className="flex justify-between">
          <div>
            <span className="font-bold text-slate-600 text-xs">Qty:</span>
            <input
              className="font-bold text-slate-600 text-sm"
              type="number"
              placeholder="1"
              value={item.purchaseQuantity}
              onChange={onChange}
            />
          </div>
          <span
            className="text-indigo-600 hover:text-red-500 text-sm font-bold"
            aria-label="trash"
            onClick={() => removeFromCart(item)}>
            Remove
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
