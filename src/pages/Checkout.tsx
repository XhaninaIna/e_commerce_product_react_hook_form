import React, { useState } from "react";
import { useProductContext } from "../context/ProductContext.tsx";
import { useForm } from "react-hook-form";
import { Product } from "../services/api";
import { TextField, Button } from "@mui/material";
import "../styles/checkout.css";

const Checkout = () => {
  const { state, dispatch } = useProductContext();
  const { cart } = state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const onSubmit = (data) => {
    setTimeout(() => {
      alert("Order placed successfully!");
      dispatch({ type: "ADD_ORDER", payload: cart });
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: cart.map((product) => product.id),
      });
    }, 2000);
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: [id],
    });
  };

  if (cart.length === 0) {
    return (
      <p>
        Your cart is empty. Please add some products to proceed with checkout.
      </p>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <div className="checkout__cart">
        <h3>Cart Items</h3>
        <ul>
          {cart.map((product: Product) => (
            <li key={product.id} className="checkout__cart-item">
              <img
                src={product.image}
                alt={product.title}
                className="checkout__cart-item-image"
              />
              <div>
                <p>{product.title}</p>
                <p>${product.price}</p>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveFromCart(product.id)}
                  className="checkout__remove-button"
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <div className="checkout__total">
          <h4>Total: ${calculateTotal()}</h4>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
