import axios from 'axios'; 
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../redux/features/ProductsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
const ProductScreen = ()=>{
    const { id: productId } = useParams();
    const { data: product, error, isLoading} = useGetProductDetailsQuery(productId);

    return isLoading ? <Loader /> : error ? (
    <Message variant='danger'>
        {error?.data?.message || error?.message}
    </Message>
    ): (
        <>
            <Link className='btn btn-light my-3'>Go Back</Link>
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
                            <ListGroup.Item>
                                <Button
                                type='button'
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