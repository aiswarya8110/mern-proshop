import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { usePlaceOrderMutation } from "../redux/features/ordersApiSlice";
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Button } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
const PlaceOrderScreen = ()=>{
    const { shippingAddress, cartItems, paymentMethod, shippingPrice, taxPrice, totalPrice, itemsPrice } = useSelector((store)=> store.cart);
    const navigate = useNavigate();

    const [ placeOrder, { isLoading, err }] = usePlaceOrderMutation();

    const handlePlaceOrder = ()=>{

    }

    useEffect(()=>{
        if(!shippingAddress || cartItems.length === 0){
            navigate('/');
        }
    },[])

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>
                                    Address:{' '}
                                </strong>
                                {shippingAddress.address},{' '}
                                {shippingAddress.city},{' '}
                                {shippingAddress.pinCode},{' '}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method:</strong>{' '}
                            {paymentMethod}
                        </ListGroup.Item>
                        <ListGroupItem>
                            <h2>Order Items</h2>
                            <ListGroup variant="flush">
                                {
                                    cartItems.map((item)=>{
                                        return (
                                            <ListGroup.Item key={item._id}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
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
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items:
                                    </Col>
                                    <Col>
                                        ${itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping:
                                    </Col>
                                    <Col>
                                        ${shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax:
                                    </Col>
                                    <Col>
                                        ${taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        ${totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroupItem>
                                <Button type="button" onClick={handlePlaceOrder}>Place order</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen;