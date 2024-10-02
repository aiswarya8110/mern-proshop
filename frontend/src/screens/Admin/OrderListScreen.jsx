import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../redux/features/ordersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaTimes } from "react-icons/fa";
const OrderListScreen = () => {
  const { data: allOrders, isLoading, error } = useGetAllOrdersQuery();

  return (
    <div>
      <h2>Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" />
      ) : allOrders.length === 0 ? (
        <Message>No orders placed</Message>
      ) : (
        <Table responsive borderless hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allOrders?.map((order) => {
              const {
                _id,
                user,
                createdAt,
                paidAt,
                totalPrice,
                isPaid,
                isDelivered,
                deliveredAt,
              } = order;
              return (
                <tr key={order._id}>
                  <td>{_id}</td>
                  <td>{user.name}</td>
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
                    <Link to={`/order/${order._id}`} className="btn btn-light">
                      Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderListScreen;
