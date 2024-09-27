import {Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useCreateSampleProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../redux/features/ProductsApiSlice';
import { toast } from 'react-toastify';
const ProductListScreen = ()=>{
    const { data:products, isLoading, error, refetch } = useGetProductsQuery();

    const navigate = useNavigate();

    const [ createSampleProduct, { isLoading:isCreateSampleProductLoading } ]=useCreateSampleProductMutation();

    const [ deleteProduct, { isLoading:isDeleteProductLoading }] = useDeleteProductMutation();

    const redirectToPage = (productId)=>{
        navigate(`/admin/productList/edit/${productId}`);
    }

    const handleDeleteUser = ()=>{

    }

    const handleDeleteProduct = async(productId)=>{
        try {
            alert("Do you want to delete this product?");
            await deleteProduct(productId);
            refetch();
            toast.success("Product deleted.");
        } catch (error) {
            toast.error(error?.data?.message || error);
        }
    }

    const createProduct = async()=>{
        try {
            alert("Do you want to create a new product?");
            const product = await createSampleProduct();
            refetch();
            toast.success("Product is created");
        } catch (error) {
            toast.error(error?.data?.message || error);
        }
    }

    return (
        <div>
            <div className='d-flex justify-content-between flex-wrap my-4'>
                <h2>Products</h2>
                <Button disabled={isCreateSampleProductLoading} onClick={createProduct}>+ Create Product</Button>
            </div> 
            {isLoading ? <Loader /> : (
                error ? <Message variant='danger'>Unable to get Products. Try Again.</Message> : (
                    <Table hover responsive bordered>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map((item)=>{
                                    const { _id, name, brand, price, category } = item;
                                    return (
                                        <tr key={_id}>
                                            <td>{_id}</td>
                                            <td>{name}</td>
                                            <td>{price}</td>
                                            <td>{category}</td>
                                            <td>{brand}</td>
                                            <td>
                                                <Button onClick={()=> redirectToPage(item._id)} variant='light' className='mx-2'>
                                                    <FaEdit />
                                                </Button>
                                                <Button variant='light' disabled={isDeleteProductLoading} onClick={()=> handleDeleteProduct(item._id)}>
                                                    <FaTrash style={{color: 'red'}}/>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                )
            )}
        </div>
    )
}

export default ProductListScreen;