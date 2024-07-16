import { Card, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
const Product = ({ product })=>{
    return (
        <Card>
            <Link to={`/product/${product?._id}`}>
                <Card.Img alt='Product Image' src={product?.image}/>
            </Link>
            <Card.Body>
                <LinkContainer to={`/product/${product?._id}`}>
                    <Nav.Link>
                        <Card.Title className='product-title'>
                            {product?.name}
                        </Card.Title>
                    </Nav.Link>
                </LinkContainer>
                <Card.Text as='h3'>
                    ${product?.price}
                </Card.Text>
                <Card.Text as='div'>
                    <Rating value={product?.rating} text={product?.numReviews && `${product.numReviews} reviews`}/>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;