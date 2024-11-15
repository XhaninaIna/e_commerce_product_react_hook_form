import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext.tsx";
import "../styles/productlist.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { state, dispatch, fetchProducts } = useProductContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        await fetchProducts();
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="product-list">
        {state.products.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
            </Link>
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
              <button
                className="btn-primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-section">
        <h3 className="cart-title">Shopping Cart</h3>
        <ul className="cart-list">
          {state.cart.length === 0 ? (
            <li className="empty-cart">No items in cart</li>
          ) : (
            state.cart.map((product) => (
              <li className="cart-item" key={product.id}>
                <h4>{product.title}</h4>
                <p>Price: ${product.price}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
