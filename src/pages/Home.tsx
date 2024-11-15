import React from "react";
import ProductList from "../components/ProductList.tsx";
import "../styles/home.css";
const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to Our Store</h1>
      <ProductList />
    </div>
  );
};

export default Home;
