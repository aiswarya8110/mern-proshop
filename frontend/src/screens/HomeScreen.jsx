import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../redux/features/ProductsApiSlice';
import { updateSearchTerm } from '../redux/features/searchSlice';
import { Row, Col, Button } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = ()=>{
    const [ pageNumber, setPageNumber ] = useState(1);
    const { searchTerm } = useSelector((store)=> store.search);
    const { data, isLoading, error, isFetching } = useGetProductsQuery({pageNumber, searchTerm});
    
    const dispatch = useDispatch();

    return isLoading || isFetching ? <Loader /> :
    data?.products?.length === 0 ? (
    <Message>
        Search results for:{searchTerm} not found.
    </Message>)
    : error ? (
    <Message variant='danger'>
        {error?.data?.message || error?.error}
    </Message>) : 
    (<>
        {
            searchTerm ? (
            <Button onClick={()=> dispatch(updateSearchTerm(""))} variant='light'>
                Go Back
            </Button>
            ) : <ProductCarousel />
        }
        <h1>Latest Products</h1>
        <Row className='gy-4'>
            {
                data.products?.map((product)=>{
                    return (
                        <Col sm='12' md='6' lg='4' xl='3' key={product?._id}>
                            <Product product={product}/>
                        </Col>
                    )
                })
            }
        </Row>
        <Paginate 
        pages={data.pages} 
        setPageNumber={setPageNumber} 
        pageNumber={pageNumber}/>
    </>)
}

export default HomeScreen;