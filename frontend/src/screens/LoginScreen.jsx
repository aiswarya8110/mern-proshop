import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from '../redux/features/userApiSlice';
import { setUserInfo } from '../redux/features/authSlice';
import FormContainer from "../components/FormContainer";
import { Button, Form, Row, Col } from 'react-bootstrap';

const LoginScreen = ()=>{
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { userInfo } = useSelector((store)=> store.auth);

    const dispatch = useDispatch();

    const [ loginUser, { isLoading } ] = useLoginUserMutation();

    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const page = sp.get('redirect');
    const redirect = page || '/';

    useEffect(()=>{
       if(userInfo){
        navigate(redirect);
       }
    },[userInfo])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
           const res = await loginUser({email, password});
           if(res?.error?.data){
                throw new Error(res?.error?.data);
           }

           dispatch(setUserInfo(res?.data));
        }catch(err){
            console.log(err.message);
            toast.error(err.message);
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit}>
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
                <Button disabled={isLoading} type='submit' variant='primary' className='mt-2'>
                    Sign In
                </Button>
            </Form>
            <Row>
                <Col className='py-3'>
                    New Customer? <Link to={redirect === '/' ? '/register' : `/register?redirect=${page}`}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen;