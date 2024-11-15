// src/pages/ProductDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, Product } from "../services/api.tsx";
import "../styles/productdetails.css";
const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        if (id) {
          const productData = await fetchProductById(Number(id));
          setProduct(productData);
        }
      } catch (error) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-details">
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="product-details__image"
      />
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <button
        onClick={() => alert("Add to cart feature is not implemented yet.")}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
