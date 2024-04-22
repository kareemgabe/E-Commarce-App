import {Badge, Container, Nav, Navbar} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import freshCart from '../../assets/finalProject assets/images/freshcart-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { useContext } from 'react';
import { authContext } from '../../Context/AuthContext';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { cartContextProduct } from '../../Context/CartContextPro';
function NavScrollExample() {


const {myToken,setToken} = useContext(authContext);

const {numOfCartItems} = useContext(cartContextProduct);
console.log(numOfCartItems);

const navigate = useNavigate();
function logout() {
  // remove token from your state
  setToken(null);
  localStorage.removeItem('tkn');
  
    navigate('/login')
}

console.log( "Token in navbar", myToken);
  return (
    <Navbar expand="lg" className="bg-body-tertiary px-4">
      <Container fluid className='mx-5'>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
          <img src={freshCart} alt="freshCart"/>
          </Navbar.Brand>
        </Container>
      </Navbar>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">


          {myToken?
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='text-muted font-sm' as={Link} to="/home">Home</Nav.Link>
            <Nav.Link className='text-muted font-sm' as={Link} to="/cart">Cart</Nav.Link>
            <Nav.Link className='text-muted font-sm' as={Link} to="/wishlist">Wish list</Nav.Link>
            <Nav.Link className='text-muted font-sm' as={Link} to="/product">Product</Nav.Link>
            <Nav.Link className='text-muted font-sm' as={Link} to="/allorders">All Orders</Nav.Link>     
            <Nav.Link className='text-muted font-sm' as={Link} to="/categories">Categories</Nav.Link>
            <Nav.Link className='text-muted font-sm' as={Link} to="/brands">Brands</Nav.Link>
          </Nav>
        : ""}

          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
               {myToken ? <>
                <Nav.Link className='text-muted position-relative me-2' as={Link} to="/cart">
            <FontAwesomeIcon icon={faCartPlus} className='mt-1 text-muted fs-5'/>
               {/* <Badge className="bg-secondary position-absolute start-50 bottom-50">{numOfCartItems ?? ''}</Badge> */}
               <Badge className="bg-success position-absolute start-50 bottom-50">{numOfCartItems ? numOfCartItems:''}</Badge>
               <span className="visually-hidden">unread messages</span>
            </Nav.Link>
               <div className="myIcon mt-1">
              <ul className='list-unstyled d-flex'>

              <li>
              <FontAwesomeIcon className='px-1 pt-2 fs-6 text-muted cursor-pointer'  onClick={() => window.open('https://www.instagram.com/routelearning/')} to=""  as={Link} icon={faInstagram} />
                </li>  
                <li>
              <FontAwesomeIcon className='px-1 pt-2 fs-6 text-muted cursor-pointer' onClick={() => window.open('https://www.facebook.com/groups/route.web.course.cycel42/')}  as={Link} icon={faFacebook} />
               </li>    

               <li>
              <FontAwesomeIcon className='px-1 pt-2 fs-6 text-muted cursor-pointer' onClick={() => window.open('https://www.tiktok.com/@routelearning?lang=en')} to=""  as={Link} icon={faTiktok} />
               </li>   
                <li>
                <FontAwesomeIcon className='px-1 pt-2 fs-6 text-muted cursor-pointer' onClick={() => window.open('https://twitter.com/route')} to=""  as={Link} icon={faTwitter} />
                </li>
         
               <li>
              <FontAwesomeIcon className='px-1 pt-2 fs-6 text-muted cursor-pointer'  onClick={() => window.open('https://www.linkedin.com/company/routeacademy/')}  to=""  as={Link} icon={faLinkedin} />
                </li>
                <li>
                <FontAwesomeIcon className='px-1 pt-2 fs-6 text-muted cursor-pointer'  onClick={() => window.open('https://www.youtube.com/@routeacademy9441')}  to=""  as={Link} icon={faYoutube} />
                </li>
              </ul>
            </div>

               <Nav.Link onClick={logout} role='button' className='text-muted font-sm' as={Link} >logOut</Nav.Link>
            </>
              :<>  <Nav.Link className='text-muted font-sm' as={Link} to="/login">Login</Nav.Link>
                     <Nav.Link className='text-muted font-sm' as={Link} to="/register">register</Nav.Link>
               </> 
           }
           

          
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;