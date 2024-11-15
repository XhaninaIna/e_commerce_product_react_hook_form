import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { useProductContext } from "../context/ProductContext.tsx";
import "../styles/sidebar.css";
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  const { state, dispatch } = useProductContext();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const categories = Array.from(
    new Set(state.products.map((product) => product.category))
  );

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleCategoryFilter = (category: string) => {
    dispatch({
      type: "SET_PRODUCTS",
      payload: state.products.filter(
        (product) => product.category === category
      ),
    });
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <button className="navbar__menu" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
        <Link to="/" className="navbar__link">
          Home
        </Link>
        <Link to="/checkout" className="navbar__link">
          Checkout
        </Link>
        <div className="navbar__cart-count">
          <Link to="/checkout" className="navbar__link">
            Cart ({state.cart.length})
          </Link>
        </div>
      </nav>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <List>
          {categories.map((category) => (
            <React.Fragment key={category}>
              <ListItemButton onClick={() => handleCategoryFilter(category)}>
                <ListItemText primary={category} />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        <List>
          <ListItemButton component={Link} to="/manage-product">
            <ListItemText primary="Add New Product" />
          </ListItemButton>
        </List>
      </div>
    </>
  );
};

export default Navbar;
