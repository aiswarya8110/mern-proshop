import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from '../redux/features/cartSlice';
import { Button, Form } from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
const ShippingScreen = ()=>{
    const { shippingAddress, cartItems } = useSelector((store)=> store.cart);
    const [ address, setAddress ] = useState(shippingAddress?.address || '');
    const [ city, setCity ] = useState(shippingAddress?.city || '');
    const [ pinCode, setPinCode ] = useState(shippingAddress?.pinCode || '');
    const [ country, setCountry ] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit  = (e)=>{
        e.preventDefault();
        if(address === "" || city === "" || pinCode === "" || country === ""){
            toast.error("Fields cannot be empty.");

            return;
        }
        dispatch(saveShippingAddress({ address, city, pinCode, country}));

        navigate('/payment');
    }

    useEffect(()=>{
        if(cartItems.length === 0){
            navigate('/cart');
        }
    },[])

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='address' className='my-2'>
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control type='text' value={address} placeholder='Enter address' onChange={(e)=> setAddress(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>
                        City
                    </Form.Label>
                    <Form.Control type='text' value={city} placeholder='Enter city' onChange={(e)=> setCity(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='pincode' className='my-2'>
                    <Form.Label>
                        Pin Code
                    </Form.Label>
                    <Form.Control type='text' value={pinCode} placeholder='Enter pincode' onChange={(e)=> setPinCode(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='country' className='my-2'>
                    <Form.Label>
                        Country
                    </Form.Label>
                    <Form.Control type='text' value={country} placeholder='Enter country' onChange={(e)=> setCountry(e.target.value)}/>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen;