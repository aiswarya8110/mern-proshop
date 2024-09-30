import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchTerm } from '../redux/features/searchSlice';
const SearchBox = ()=>{
    const { searchTerm } = useSelector((store)=> store.search);
    const dispatch = useDispatch();
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    return  (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='d-flex align-items-center'>
                <Form.Control type='text' placeholder='Search by title..' value={searchTerm} onChange={(e)=> dispatch(updateSearchTerm(e.target.value))}/>
                <Button className='text-nowrap'>Search</Button>
            </Form.Group>
        </Form>
    )
}

export default SearchBox;