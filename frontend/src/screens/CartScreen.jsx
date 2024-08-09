import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { addToCart, deleteCartItem } from '../redux/features/cartSlice';
const CartScreen = ()=>{
   const { cartItems } = useSelector((store)=> store.cart);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleCheckout = ()=>{
     navigate('/login?redirect=/shipping');
   }

   const handleDeleteCartItem = (item)=>{
        dispatch(deleteCartItem(item));
   }

   const handleQtyChange = (item, qty)=>{
        dispatch(addToCart({...item, qty}))
   }

    return (
        <Row>
            <Col md='8'>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>Your Cart is Empty <Link to='/'>Go Back</Link></Message>
                ) : (
                <ListGroup variant='flush'>
                    {cartItems.map((item)=>{
                        return (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md='2'>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md='3'>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md='2'>
                                        ${item.price}
                                    </Col>
                                    <Col md='2'>
                                        <Form.Control as='select' value={item.qty} onChange={(e)=>handleQtyChange(item, Number(e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map((x)=>{
                                                return <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            })}
                                        </Form.Control>
                                    </Col>
                                    <Col md='2'>
                                        <Button variant='light' type='button' onClick={()=>handleDeleteCartItem(item)}>
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>  
                )}
            </Col>
            <Col md='4'>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item )=> acc + item.qty, 0)} items)</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            ${cartItems.reduce((acc, item )=> acc + item.price * item.qty, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' onClick={handleCheckout} disabled={cartItems.length === 0}>Proceed To Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;