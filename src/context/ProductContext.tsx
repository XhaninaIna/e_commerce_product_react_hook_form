import React, {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from "react";
import {
  fetchProducts as fetchProductsFromAPI,
  addProduct as addProductToAPI,
  updateProduct as updateProductInAPI,
  deleteProduct as deleteProductFromAPI,
  Product as ProductType,
} from "../services/api.tsx";

type State = {
  products: ProductType[];
  cart: ProductType[];
  orders: ProductType[];
};

type Action =
  | { type: "SET_PRODUCTS"; payload: ProductType[] }
  | { type: "ADD_TO_CART"; payload: ProductType }
  | { type: "REMOVE_FROM_CART"; payload: number[] }
  | { type: "ADD_ORDER"; payload: ProductType[] }
  | { type: "ADD_PRODUCT"; payload: ProductType }
  | { type: "EDIT_PRODUCT"; payload: ProductType }
  | { type: "DELETE_PRODUCT"; payload: number };

type ProductContextType = {
  state: State;
  dispatch: Dispatch<Action>;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<ProductType, "id">) => Promise<void>;
  editProduct: (id: number, product: Omit<ProductType, "id">) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
};

const initialState: State = {
  products: [],
  cart: [],
  orders: [],
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

function productReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (product) => !action.payload.includes(product.id)
        ),
      };
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, ...state.cart], cart: [] };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProducts = async () => {
    try {
      const products = await fetchProductsFromAPI();
      dispatch({ type: "SET_PRODUCTS", payload: products });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const addProduct = async (product: Omit<ProductType, "id">) => {
    try {
      const newProduct = await addProductToAPI(product);
      dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const editProduct = async (id: number, product: Omit<ProductType, "id">) => {
    try {
      const updatedProduct = await updateProductInAPI(id, product);
      dispatch({ type: "EDIT_PRODUCT", payload: updatedProduct });
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await deleteProductFromAPI(id);
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        fetchProducts,
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
