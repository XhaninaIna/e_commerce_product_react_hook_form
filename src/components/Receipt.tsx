import React from "react";
import { useProductContext } from "../context/ProductContext";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import "../styles/receipt.css";
const Receipt: React.FC = () => {
  const { state } = useProductContext();

  if (state.orders.length === 0) {
    return (
      <Typography variant="h6">No orders have been placed yet.</Typography>
    );
  }

  const calculateTotal = () => {
    return state.orders
      .reduce((total, product) => total + product.price, 0)
      .toFixed(2);
  };

  return (
    <div className="receipt">
      <Typography variant="h4" gutterBottom>
        Receipt
      </Typography>
      <List>
        {state.orders.map((product, index) => (
          <React.Fragment key={product.id || index}>
            <ListItem>
              <ListItemText
                primary={product.title}
                secondary={`$${product.price.toFixed(2)}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Total: ${calculateTotal()}
      </Typography>
    </div>
  );
};

export default Receipt;
