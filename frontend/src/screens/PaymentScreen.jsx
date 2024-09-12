import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from '../redux/features/cartSlice';
const PaymentScreen = ()=>{
    const { shippingAddress, paymentMethod } = useSelector((store)=> store.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeOrder');
    }

    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping');
        }
    },[])

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={handleSubmit}>
            <h1>Payment Method</h1>
            <h4>Select Method</h4>
            
            <Form.Check type='radio' className='mb-2' id='paypal' value='PayPal' name='payment-method' label='PayPal or Credit Card' checked readOnly/>
            
            <Button variant="primary" type="submit">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;