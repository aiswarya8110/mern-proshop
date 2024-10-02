import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserInfo } from "../redux/features/authSlice";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useGetUserProfileQuery } from "../redux/features/userApiSlice";
import { useUpdateUserProfileMutation } from "../redux/features/userApiSlice";
import { useGetMyOrdersQuery } from "../redux/features/ordersApiSlice";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import Loader from "../components/Loader";
import Message from "../components/Message";
const ProfileScreen = () => {
  const { data: user, refetch } = useGetUserProfileQuery();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateUserProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateUserProfileMutation();

  const {
    data: myOrders,
    isLoading: isMyordersLoading,
    error: errorInGettingMyOrders,
  } = useGetMyOrdersQuery();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const redirectPage = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");

      return;
    }

    try {
      const response = await updateUserProfile({
        name,
        email,
        password,
      });

      dispatch(setUserInfo(response.data));
      toast.success("Your profile is updated!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <Row className={user?.isAdmin ? "justify-content-center" : ""}>
      <Col md={user?.isAdmin ? 4 : 3}>
        <Form onSubmit={handleSubmit}>
          <h2>Your Profile</h2>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="cpassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={isUpdateProfileLoading}
            className="my-4"
          >
            Update
          </Button>
        </Form>
      </Col>
      {!user?.isAdmin && (
        <Col md={9}>
          <h2>My Orders</h2>
          {isMyordersLoading ? (
            <Loader />
          ) : errorInGettingMyOrders ? (
            <Message variant="danger">
              Unable to get your orders. Try Again.
            </Message>
          ) : myOrders?.length === 0 ? (
            <Message>
              You have no orders yet. <Link to="/">view products</Link>
            </Message>
          ) : (
            <Table striped hover borderless responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {myOrders?.map((order) => {
                  const {
                    _id,
                    createdAt,
                    isPaid,
                    paidAt,
                    isDelivered,
                    deliveredAt,
                    totalPrice,
                  } = order;
                  return (
                    <tr key={_id}>
                      <td>{_id}</td>
                      <td>{createdAt.substring(0, 10)}</td>
                      <td>${totalPrice}</td>
                      <td>
                        {isPaid ? (
                          paidAt.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td>
                        {isDelivered ? (
                          deliveredAt.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td>
                        <Button
                          variant="light"
                          onClick={() => redirectPage(_id)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      )}
    </Row>
  );
};

export default ProfileScreen;
