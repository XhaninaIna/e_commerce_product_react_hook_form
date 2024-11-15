import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useProductContext } from "../context/ProductContext";
import { Product } from "../services/api";
import "../styles/productform.css";
type FormValues = {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
};

type ProductFormProps = {
  initialData?: Product;
  onClose: () => void;
};
const ProductForm: React.FC<ProductFormProps> = ({ initialData, onClose }) => {
  const { dispatch } = useProductContext();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData || {
      title: "",
      price: 0,
      description: "",
      category: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const productData: Product = {
      ...data,
      id: initialData?.id || Math.floor(Math.random() * 10000),
      image: initialData?.image || "https://via.placeholder.com/150",
    };

    if (initialData) {
      dispatch({ type: "EDIT_PRODUCT", payload: productData });
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: productData });
    }
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <TextField
        label="Title"
        {...register("title", { required: "Title is required" })}
        error={!!errors.title}
        helperText={errors.title ? errors.title.message : ""}
      />
      <TextField
        label="Price"
        type="number"
        {...register("price", { required: "Price is required", min: 0 })}
        error={!!errors.price}
        helperText={errors.price ? errors.price.message : ""}
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        {...register("description", { required: "Description is required" })}
        error={!!errors.description}
        helperText={errors.description ? errors.description.message : ""}
      />
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Select {...field} label="Category">
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="jewelry">Jewelry</MenuItem>
              <MenuItem value="men's clothing">Men's Clothing</MenuItem>
              <MenuItem value="women's clothing">Women's Clothing</MenuItem>
            </Select>
          )}
        />
        {errors.category && (
          <p style={{ color: "red" }}>{errors.category.message}</p>
        )}
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {initialData ? "Save Changes" : "Add Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
