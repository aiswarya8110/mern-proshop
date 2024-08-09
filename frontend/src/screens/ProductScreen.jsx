import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../redux/features/ProductsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../redux/features/cartSlice';
const ProductScreen = ()=>{
    const [ qty, setQty ] = useState(1);
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { 
    data: product, 
    error, 
    isLoading} = useGetProductDetailsQuery(productId);

    const handleAddToCart = ()=>{
        dispatch(addToCart({...product, qty}))
        // navigate('/cart');
    }

    return isLoading ? <Loader /> : error ? (
    <Message variant='danger'>
        {error?.data?.message || error?.message}
    </Message>
    ): (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            <Row>
                <Col md='5'>
                    <Image src={product?.image} alt={product?.name} fluid/>
                </Col>
                <Col md='4'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product?.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product?.rating} text={product?.numReviews && `${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product?.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product?.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md='3'>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>
                                            Price:
                                        </strong>
                                    </Col>
                                    <Col>
                                        ${product?.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>Status</strong>
                                    </Col>
                                    <Col>
                                        {product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product?.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Qty
                                        </Col>
                                        <Col>
                                            <Form.Control 
                                            as='select'
                                            onChange={(e)=> setQty(Number(e.target.value))}
                                            value={qty}
                                            >
                                                {[...Array(product?.countInStock).keys()].map((x)=>{
                                                    return (
                                                    <option key={ x + 1 } value={ x + 1 }>
                                                        { x + 1 }
                                                    </option>
                                                    )
                                                })}
                                            </Form.Control>                                        
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button
                                type='button'
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
        </>
    )
}

export default ProductScreen;