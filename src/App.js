import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.tsx";
import Home from "./pages/Home.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import Checkout from "./pages/Checkout.tsx";
import ManageProduct from "./pages/ManageProduct.tsx";
import { ProductProvider } from "./context/ProductContext.tsx";

const App = () => {
  return (
    <ProductProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/manage-product" element={<ManageProduct />} />
            <Route path="/manage-product/:id" element={<ManageProduct />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
};

export default App;
