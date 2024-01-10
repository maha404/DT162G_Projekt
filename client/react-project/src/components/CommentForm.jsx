// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

// Other tools 
import { useState } from 'react';

// Stucture of the comment form
const CommentForm = ({blogPost, fecthComments}) => {

    const [content, setComment] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = {content}
        const postId = blogPost._id

        const response = await fetch(`http://localhost:3000/blog/posts/${postId}/comments`, {
            method: 'POST', 
            body: JSON.stringify(comment), 
            credentials: 'include', 
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        if(content == '') {
            setErrorMessage('Kommentaren saknar innehåll!');
        }
    
        if(response.ok) {
            setComment('');
            setErrorMessage('');
            fecthComments();
        }
    }

    return (
        <Form onSubmit={handleSubmit} className='mt-5'>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label></Form.Label>
                <Form.Control placeholder="Vad är dina tankar?" as="textarea" rows={3} onChange={(e) => setComment(e.target.value)} value={content}/>
            </Form.Group>
            <Button variant="dark" type="submit">
                    Kommentera
            </Button>
        </Form>
    )
}

export default CommentForm;