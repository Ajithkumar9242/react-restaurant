import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>
      <ul className="space-y-2">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between border-b pb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
