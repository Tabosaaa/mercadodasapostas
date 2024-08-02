import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, changeQuantity } from '../stores/cart';
import { cartItemInterface } from '../interfaces/CartItemInterface';
import { products } from '../services/Products';
import { ProductCardInterface } from '../interfaces/ProductCardInterface';

const CartItem: React.FC<cartItemInterface> = ({ productId, quantity }) => {
  const dispatch = useDispatch();
  const [detail, setDetail] = React.useState<ProductCardInterface | null>(null);

  React.useEffect(() => {
    const findDetail = products.find(product => product.id === productId) || null;
    setDetail(findDetail);
  }, [productId]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      dispatch(changeQuantity({ productId, quantity: newQuantity }));
    }
  };

  if (!detail) {
    return null; // or a loading indicator
  }

  return (
    <li key={detail.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={detail.name}
          src={detail.imageSrc}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">{detail.name}</a>
            </h3>
            <p className="ml-4">{detail.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{detail.description}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex gap-3">
            <p className="text-gray-500">Qty</p>
            <input
              type="number"
              value={quantity}
              className="w-16 border rounded-md text-center"
              onChange={handleQuantityChange}
            />
          </div>
          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => dispatch(removeItem({ productId }))}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
