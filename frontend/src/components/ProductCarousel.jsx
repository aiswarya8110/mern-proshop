import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../redux/features/ProductsApiSlice';
import Loader from './Loader';
import Message from './Message';
const ProductCarousel = ()=>{
    const { data:products, isLoading, error } = useGetTopProductsQuery();
    return isLoading ? <Loader /> : 
    error ? (
        <Message>Unable to show Top Products</Message>
    ) : (
        <Carousel controls slide touch pause="hover" className='mb-4'>
            {
                products?.map((item)=> (
                <Carousel.Item key={item._id}>
                    <Link to={`/product/${item._id}`}>
                        <div className='d-flex justify-content-start align-items-center' style={{background: '#3c4c5d'}}>
                            <Image src={item.image} alt='product image' fluid/>
                        </div>
                        <Carousel.Caption>
                            <h3>{item.name}{' '}(${item.price})</h3>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
                ))
            }
        </Carousel>
    )
}

export default ProductCarousel;