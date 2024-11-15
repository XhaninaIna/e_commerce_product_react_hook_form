import React from "react";
import { useProductContext } from "../context/ProductContext.tsx";
import { Product } from "../services/api";
// import "../styles/productcard.css";
type ProductCardProps = {
  product: Product;
};
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useProductContext();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-card__image"
      />
      <div className="product-card__details">
        <h2 className="product-card__title">{product.title}</h2>
        <p className="product-card__category">{product.category}</p>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">
            ${product.price.toFixed(2)}
          </span>
          <button onClick={handleAddToCart} className="product-card__button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
