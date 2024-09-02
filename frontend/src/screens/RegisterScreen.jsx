import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/features/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useRegisterUserMutation } from '../redux/features/userApiSlice';
import { toast } from 'react-toastify';
const RegisterScreen = ()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();

    const page = new URLSearchParams(search).get("redirect");

    const redirectTo = page || '/'; 

    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
           toast.error("Passwords did not match.");

           return;
        }

        try {
            const res = await registerUser({name, email, password});

            console.log(res);

            if(res?.error?.data?.message){
                throw new Error(res?.error?.data?.message);
            }

            dispatch(setUserInfo(res?.data));

            navigate(redirectTo);

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mt-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="cpassword" className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button disabled={isLoading} type='submit' variant='primary' className='mt-2'>
                    Sign Up
                </Button>
            </Form>
            <Row>
                <Col className='py-3'>
                    Already have an account? <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen;