import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/features/ProductsApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
const ProductEditScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [stockCount, setStockCount] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: isUpdateProductLoading }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setStockCount(product.countInStock);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        data: {
          name,
          price,
          image,
          brand,
          category,
          stockCount,
          description,
        },
      });

      // refetch();
      toast.success("Product Updated");
    } catch (error) {
      toast.error(error?.data?.message || error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const imageData = reader.result;
      setImage(imageData);
    };
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Edit Product</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">Unable to get Product Info</Message>
        ) : (
          <>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="stock" className="my-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={100}
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ resize: "none" }}
              />
            </Form.Group>
            <Button
              type="submit"
              disabled={isUpdateProductLoading}
              className="my-4"
            >
              Update
            </Button>
          </>
        )}
      </Form>
    </FormContainer>
  );
};

export default ProductEditScreen;
