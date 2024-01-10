// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

// Other tools
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UpdatePost = () => {

    const {postId} = useParams();
    
    const [blogPost, setBlogPost] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [confirmationMessage, setConfirmationMessage] = useState('')

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch('http://localhost:3000/blog/posts/' + postId, {
                method: 'GET', 
                credentials: 'include'
            })
            const json = await response.json();

            if(response.ok) {
                setBlogPost(json)
                setTitle(json[0].title)
                setContent(json[0].content)
            }
        }

        fetchPost();
    }, [postId])
    

    function updatePost() {
        const post = {title, content}
        const response = fetch('http://localhost:3000/blog/posts/' + postId, {
            method: 'PUT', 
            credentials: 'include', 
            body: JSON.stringify(post), 
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        if(title == '' && content == '') {
            setErrorMessage('Det måste finnas en titel och innehåll!');
        } else if(title == '') {
            setErrorMessage('Det måste finnas en titel!');
        } else if (content == '') {
            setErrorMessage('Det måste finnas innehåll!')
        } else {
            setErrorMessage('')
            setConfirmationMessage('Inlägget uppdaterat!')
        }
    }

    return (
    <Container className="update-form">
        <Link to="/profil"><i class="bi bi-arrow-left"> Tillbaka till profil</i></Link>
        <h2 className="mt-3">Uppdatera "{title}"</h2>
        <Form>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {confirmationMessage && <Alert variant="success">{confirmationMessage}</Alert>}
            <br />
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Titel:</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Innehåll:</Form.Label>
            <Form.Control as="textarea" rows={5} value={content} onChange={(e) => setContent(e.target.value)}/>
        </Form.Group>
            <br />
            <Button variant="dark" onClick={updatePost}>Uppdatera</Button>
        </Form>
    </Container>
    )
}

export default UpdatePost;