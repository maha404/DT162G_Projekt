// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css"; 
import Alert from 'react-bootstrap/Alert';

// Other tools
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const LogIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    // Handling the submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {username, password}

        const response = await fetch('http://localhost:3000/blog/login', {
            method: 'POST', 
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();
    
        if(response.status === 404 || response.status === 401) {
            setErrorMessage('Användaruppgifterna stämmer inte!');
        } else {
            setErrorMessage('');
        }

        if(response.ok) {
            setUsername('');
            setPassword('');
            navigate("/profil"); // Sends user to profile when logged in
            Cookies.set('jwt', json.token);
        }
        
    }
  
    return (
    <Container className="con">
        <div>
            <h2>Logga in</h2>
            <br />
            <Form onSubmit={handleSubmit}>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <br />
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Användarnamn</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Ditt användarnamn" 
                    onChange={(e) => setUsername(e.target.value)} value={username}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Ditt lösenord" 
                    onChange={(e) => setPassword(e.target.value)} value={password}/>
                </Form.Group>
                <br />
                <Button variant="dark" type="submit">
                    Logga in
                </Button>
            </Form>
        </div>
    </Container>
    );
}

export default LogIn;