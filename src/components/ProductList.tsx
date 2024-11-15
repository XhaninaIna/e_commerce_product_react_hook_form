import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext.tsx"; 
import "../styles/productlist.css"; 

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
  }, [fetchProducts]);

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="product-list">
        {state.products.map((product) => (
          <div className="product-item" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart-section">
        <h3>Shopping Cart</h3>
        <ul>
          {state.cart.length === 0 ? (
            <li>No items in cart</li>
          ) : (
            state.cart.map((product) => (
              <li key={product.id}>
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
