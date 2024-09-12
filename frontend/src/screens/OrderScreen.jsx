import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useGetOrderByIdQuery, useUpdateToPaidMutation } from './../redux/features/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap';
const OrderScreen = ()=>{
    const { userInfo } = useSelector((store)=> store.auth);
    const { orderId } = useParams();
    const { data:order, isLoading, error, refetch } = useGetOrderByIdQuery(orderId);
    console.log(order);
    const [ updateToPaid, { isUpdateToPaidLoading, updateToPaidError }] = useUpdateToPaidMutation();

    const [{ isPending, options }, payPalDispatch ] = usePayPalScriptReducer();
    console.log("isPending", isPending);
    useEffect(()=>{

        if(order && !order.isPaid){
            loadPayPalScript();
        }

        function loadPayPalScript(){
            console.log("script loaded");
            payPalDispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                    currency: "USD"
                }
            })
        }
    },[order]);


    const createOrder = (data, actions)=>{
       return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice
                    }
                }
            ]
        }).then((orderId)=>{
            return orderId;
        })
    }

    

    const handleError = (error)=>{
        toast.error(error);
    }

    const handleOnApprove = (data, actions)=>{
        return actions.order.capture().then(async(details)=>{
            try{
                console.log("Updating to paid");
                await updateToPaid(order._id, details);
                refetch();
                toast.success('Payment is successful.');
            }catch(err){
                toast.error(err?.data?.message || err.message);
            }
        })
    }




    return isLoading ? <Loader /> : error ? <Message variant='danger'/> : (
        <>
            <h2>Order{' '}{order._id}</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name:{' '}</strong>{order.user.name}
                            </p>
                            <p>
                                <strong>Email:{' '}</strong>{order.user.email}
                            </p>
                            <p>
                                <strong>Address:{' '}</strong>{order.shippingAddress.address},{' '}
                                {order.shippingAddress.city},{' '}
                                {order.shippingAddress.pinCode},{' '}
                                {order.shippingAddress.country}.
                            </p>
                            {
                                order.isDelivered ? (
                                    <Message variant='success'>Delivered</Message>
                                ) : (
                                    <Message variant='danger'>Not Delivered</Message>
                                )
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p><strong>Method:{' '}</strong>{order.paymentMethod}</p>
                            {
                                order.isPaid ? (
                                    <Message variant='success'>Paid on {order?.paidAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not Paid</Message>
                                )
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            <ListGroup variant='flush'>
                            {
                                order.orderItems.map((item)=>{
                                    return (
                                        <ListGroup.Item key={item._id}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} rounded fluid/>
                                                </Col>
                                                <Col md={6}>
                                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={5}>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )
                                })
                            }
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {
                                !userInfo?.isAdmin && !order?.isPaid && (
                                    <ListGroup.Item>
                                        {
                                            isPending ? (
                                                <Loader />
                                            ) : (
                                                <PayPalButtons createOrder={createOrder} onApprove={handleOnApprove} onError={handleError}/>
                                            )
                                        }
                                    </ListGroup.Item>
                                    
                                )
                            }
                            {
                                userInfo?.isAdmin && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button>Mark as Delivered</Button>
                                </ListGroup.Item>
                                ) 
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    ) 
}

export default OrderScreen;