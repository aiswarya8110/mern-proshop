import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUserInfo } from '../redux/features/authSlice';
import { useLogoutUserMutation } from '../redux/features/userApiSlice';
import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo  from '../assets/logo.png';
import { toast } from 'react-toastify';
const Header = ()=>{
    const { cartItems } = useSelector((store)=> store.cart);
    const { userInfo } = useSelector((store)=> store.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ logoutUser ] = useLogoutUserMutation();

    const handleLogout = async()=>{
        try {
            const res = await logoutUser();
            console.log(res);
            toast.success(res?.data?.message);

            dispatch(removeUserInfo());

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand="md">
                <Container>
                    <LinkContainer to='/' className='text-decoration-none'>
                        <Navbar.Brand>
                            <img src={logo} alt='ProShop'/>
                            ProShop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <FaShoppingCart />
                                    Cart
                                    {cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                            {cartItems.reduce((a, c)=> a + c.qty, 0)}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='profile'>
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={handleLogout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <FaUser />
                                            Login
                                        </Nav.Link>
                                    </LinkContainer>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;