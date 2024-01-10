// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import SinglePost from '../components/SinglePost';
import Container from 'react-bootstrap/esm/Container';

// Other tools
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {

    const {postId} = useParams();
    
    const [blogPost, setBlogPost] = useState(null)

    const fetchPost = async () => {
        const response = await fetch('http://localhost:3000/blog/posts/' + postId, {
            method: 'GET', 
            credentials: 'include'
        })
        const json = await response.json()

        if(response.ok) {
            setBlogPost(json)
        }
    }

    useEffect(() => {
        
        fetchPost()

    }, []);

    return (
        <Container className='single-post'>
            {blogPost && blogPost.map((blogPost) => (
               <SinglePost key={blogPost._id} blogPost={blogPost} fetchFunction={fetchPost}/>
            ))}
        </Container>
    )
}


export default Post;