// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components 
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Other tools
import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Auth from '../IsAuth';

// Structure of the main navigation
const MainNavbar = () => {

    const navigate = useNavigate();

    const isAuthenticated = Auth();

    const handleClick = async () => {
      const response = await fetch('http://localhost:3000/blog/logout', {
        method: 'POST', 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if(response.ok) {
        navigate("/"); 
        setUsername('');
      }
      
    }

    const [username, setUsername] = useState(null);

    useEffect(() => {
      const getUsername = async () => {
        const response = await fetch ('http://localhost:3000/blog/user_info', {
          method: 'GET',
          credentials: 'include'
        })
  
        console.log('Fetching username...');
        const json = await response.json();
  
        if(response.ok) {
          setUsername(json);
        }
      }

      if(isAuthenticated) {
        getUsername();
      }
      
    }, [isAuthenticated])
    
    return (  
    <Navbar expand="lg" className="bg-light shadow d-flex flex-row">
      <Container>
      <Link to="/"><Navbar.Brand href="#home" className="link-dark" class="logo" style={{fontFamily: "'Major Mono Display', monospace"}}>BizarreBits Community</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Collapse className="justify-content-end">
          {!isAuthenticated && (
            <>
              <div className='mx-4'><Link to="/logga_in"><i class="bi bi-box-arrow-right"> Logga in</i></Link></div>
              <br />
              <div><Link to="/registrera"><i class="bi bi-person-plus-fill"> Registrera dig</i></Link></div>
            </>
          )}
        </Navbar.Collapse>
      </Navbar.Collapse>
      {isAuthenticated && (
        <div className="d-flex flex-row align-items-center">
        <div className=''><Link to="/profil"><i className="bi bi-plus-lg"></i></Link></div>
            <NavDropdown title={username} id="basic-nav-dropdown" className='bg-light p-1 mx-5 border border-dark rounded'>
              <NavDropdown.Item href="">Meny</NavDropdown.Item>
              <NavDropdown.Divider />
            <NavDropdown.Item href="/profil">Min profil</NavDropdown.Item>
            <NavDropdown.Item onClick={handleClick}>Logga ut</NavDropdown.Item>
          </NavDropdown>
        </div>
      )}
    </Container>
  </Navbar>
  );
}
 
export default MainNavbar;