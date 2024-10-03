import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateProductReviewMutation,
} from "../redux/features/ProductsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/features/cartSlice";
import Meta from "../components/Meta";
const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((store) => store.auth);
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const {
    data: product,
    refetch,
    error,
    isLoading,
  } = useGetProductDetailsQuery(productId);
  const [createProductReview, { isLoading: isCreateProductReviewLoading }] =
    useCreateProductReviewMutation();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === "" || comment === "") {
      toast.error("fields cannot be empty.");

      return;
    }

    try {
      const { error } = await createProductReview({
        productId,
        data: {
          rating,
          comment,
        },
      });
      if (error?.data?.message) {
        throw new Error(error?.data?.message);
      }
      setRating("");
      setComment("");
      refetch();
      toast.success("Product Reviewed");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error?.message}</Message>
  ) : (
    <>
      <Meta title={product?.name} content={product?.description}/>
      <title>{product?.name}</title>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md="5">
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md="4">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product?.rating}
                text={
                  product?.reviews?.length > 0 &&
                  `${product?.reviews?.length} reviews`
                }
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md="3">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Price:</strong>
                  </Col>
                  <Col>${product?.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Status</strong>
                  </Col>
                  <Col>
                    {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product?.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        onChange={(e) => setQty(Number(e.target.value))}
                        value={qty}
                      >
                        {[...Array(product?.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product?.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Reviews</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              {product?.reviews?.length === 0 ? (
                <Message>No reviews</Message>
              ) : (
                <ListGroup variant="flush">
                  {product?.reviews?.map(({ name, comment, rating, _id }) => {
                    return (
                      <ListGroup.Item key={_id}>
                        <strong>{name}</strong>
                        <Rating value={rating} />
                        <p>{product.updatedAt.substring(0, 10)}</p>
                        <p className="my-4">{comment}</p>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
            {userInfo && (
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="rating" className="my-2">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      style={{ cursor: "pointer" }}
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">- select</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment" className="my-2">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      style={{ resize: "none" }}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    disabled={isCreateProductReviewLoading}
                    className="my-4"
                  >
                    Review
                  </Button>
                </Form>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
