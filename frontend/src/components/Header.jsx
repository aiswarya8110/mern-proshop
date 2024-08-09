import { useSelector } from 'react-redux';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo  from '../assets/logo.png';
const Header = ()=>{
    const { cartItems } = useSelector((store)=> store.cart);
    console.log(cartItems)
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
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <FaUser />
                                    Login
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;