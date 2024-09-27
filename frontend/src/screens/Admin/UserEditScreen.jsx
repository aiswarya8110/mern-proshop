import { useState, useEffect } from "react";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../redux/features/userApiSlice";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap"; 
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
const UserEditScreen = ()=>{
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isAdmin, setAdmin ] = useState(false);
    const { id } = useParams();
    const { data:userData, isLoading, error, refetch } = useGetUserByIdQuery(id);
    const [ updateUser, { isLoading: isUpdateUserMutationLoading } ] = useUpdateUserMutation();
    
    useEffect(()=>{
        if(userData){
            setEmail(userData.email);
            setAdmin(userData.isAdmin);
        }
    },[userData])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            await updateUser({
                userId: userData._id,
                data: {
                    email,
                    password,
                    isAdmin,
                }
            });

            toast.success("User Updated");
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || error);
        }
    }

    return isLoading ? (
        <Loader />
    ) : (
        error ? (
            <Message variant='danger'>Unable to get Users. Try again.</Message>
        ) : (
        <FormContainer>
        <h2>Edit User</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="my-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="password" className="my-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="admin" className="my-2">
                <Form.Check type="checkbox" className="d-inline mx-2" checked={isAdmin} onChange={()=> setAdmin((prev)=>!prev)}/>
                <Form.Label role="button">Admin</Form.Label>
            </Form.Group>
            <Button type="submit" disabled={isUpdateUserMutationLoading}>Update</Button>
        </Form>
        </FormContainer>
    ))
}

export default UserEditScreen;