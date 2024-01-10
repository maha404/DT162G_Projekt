// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "bootstrap/dist/css/bootstrap.min.css";

// Other tools
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [confirmationMessage, setConfirmationMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {username, password}

        if (username == '') {
            setErrorMessage('Användarnamet får inte vara tomt')
        } else if (password == '') {
            setErrorMessage('Lösenordet får inte vara tomt')
        }  else {
            setErrorMessage('')
            const response = await fetch('http://localhost:3000/blog/register', {
            method: 'POST', 
            body: JSON.stringify(user), 
            credentials: 'include', 
            headers:  {
                'Content-Type': 'application/json'
            }
        })

            if(response.status === 400 && username != '' && password != '') {
                setErrorMessage('Användarnamnet finns redan')
            } else if (response.ok) {
                setUsername('');
                setPassword('');
                setConfirmationMessage('Du är nu registrerad');
            }
        }
    }


    return (
    <Container className="con" >
        <div>
            <h2>Registrera</h2>
            <br />
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                {confirmationMessage && <Alert variant='success'>{confirmationMessage}</Alert>}
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Användarnamn</Form.Label>
                    <Form.Control type="text" placeholder="Ange användarnamn" 
                    onChange={(e) => setUsername(e.target.value)} value={username}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control type="password" placeholder="Ange lösenord" 
                    onChange={(e) => setPassword(e.target.value)} value={password}/>
                </Form.Group>
                <br />
                <Button variant="dark" type="submit">
                    Registrera
                </Button>
            </Form>
        </div>
    </Container>
    );
}

export default Register;