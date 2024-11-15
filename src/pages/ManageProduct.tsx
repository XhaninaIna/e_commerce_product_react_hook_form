import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductContext.tsx";
import { Product as ProductType } from "../services/api";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../styles/manageproduct.css";

const ManageProduct = () => {
  const { state, addProduct, editProduct, deleteProduct, fetchProducts } =
    useProductContext();
  const { products } = state;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      image: "",
      category: "",
    },
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [currentProduct, setCurrentProduct] =
    React.useState<ProductType | null>(null);

  useEffect(() => {
    if (fetchProducts) fetchProducts();
  }, []);

  const onSubmit = async (data) => {
    const { title, description, price, image, category } = data;
    const productData = {
      title,
      description,
      price: parseFloat(price),
      image,
      category,
    };

    if (isEditing && currentProduct) {
      await editProduct(currentProduct.id, productData);
      setIsEditing(false);
      setCurrentProduct(null);
    } else {
      await addProduct(productData);
    }
    reset();
  };

  const handleEditProduct = (product: ProductType) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setValue("title", product.title);
    setValue("description", product.description);
    setValue("price", product.price.toString());
    setValue("image", product.image);
    setValue("category", product.category);
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
  };

  return (
    <div className="manage-product">
      <h2>Manage Products</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>

        <TextField
          label="Product Title"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title ? errors.title.message : ""}
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.description}
          helperText={errors.description ? errors.description.message : ""}
          {...register("description", { required: "Description is required" })}
        />

        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.price}
          helperText={errors.price ? errors.price.message : ""}
          {...register("price", {
            required: "Price is required",
          })}
        />

        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.image}
          helperText={errors.image ? errors.image.message : ""}
          {...register("image", {
            required: "Image URL is required",
          })}
        />

        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.category}
          helperText={errors.category ? errors.category.message : ""}
          {...register("category", { required: "Category is required" })}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {isEditing ? "Update Product" : "Add Product"}
        </Button>
      </form>

      <div>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="product-card"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: 3,
                  boxShadow: 3,
                  borderRadius: "8px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-card-image"
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="textPrimary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {product.category}
                  </Typography>
                  <div
                    className="product-actions"
                    style={{ marginTop: "15px" }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEditProduct(product)}
                      style={{ marginRight: "8px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ManageProduct;
