// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

// Other tools
import { useState } from "react";

// Structure of form to write a post
const PostForm = ({ fetchFunction }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = {title, content}

        const response = await fetch ('http://localhost:3000/blog/posts', {
            method: 'POST', 
            credentials: 'include',
            body: JSON.stringify(post), 
            headers: {
                'Content-Type': 'application/json'
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
            setConfirmationMessage('Inlägget postat!')
            fetchFunction()
        }

    }

    const style = {
        text: {
            color: 'black'
        },
        control: {
            backgroundColor: '#C9C9C9'
        }
    }

    return (
        <Form onSubmit={handleSubmit} className='mx-5 w-50'>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            {confirmationMessage && <Alert variant='success'>{confirmationMessage}</Alert>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={style.text}>Titel:</Form.Label>
                <Form.Control style={style.control} type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label style={style.text}>Innehåll:</Form.Label>
                <Form.Control style={style.control} as="textarea" rows={3} onChange={(e) => setContent(e.target.value)} value={content}/>
            </Form.Group>
            <Button variant="dark" type="submit">Posta</Button>
        </Form>
    )
}

export default PostForm;