import { Button, Table } from 'react-bootstrap';
import { redirect, useNavigate } from 'react-router-dom';
import { useGetAllUsersQuery, useDeleteUserMutation } from '../../redux/features/userApiSlice';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { FaTimes, FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
const UserListScreen = ()=>{
    const { data:users, isLoading, error, refetch } = useGetAllUsersQuery();

    const [ deleteUser, { isLoading: isDeleteUserLoading } ] = useDeleteUserMutation();

    const navigate = useNavigate();

    const redirectPage = (userId)=>{
        navigate('/admin/userList/edit/'+userId);
    }

    const handleDeleteUser = async(userId)=>{
        try {
            await deleteUser(userId);
            refetch();
            toast.success("User Deleted");
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
            <>
                <h2>Users</h2>
                <Table responsive borderless hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user)=>{
                            const { _id, name, email, isAdmin} = user;
                            return (
                                <tr key={_id}>
                                    <td>{_id}</td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>
                                        {isAdmin ? <FaCheck style={{color:'green'}}/> : <FaTimes style={{color:'red'}}/>}
                                    </td>
                                    <td>
                                        <Button variant='light' className='mx-2' onClick={()=> redirectPage(_id)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant='light' disabled={isDeleteUserLoading} onClick={()=> handleDeleteUser(_id)}>
                                            <FaTrash style={{color:'red'}}/>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            </>
        )
    )
}

export default UserListScreen;