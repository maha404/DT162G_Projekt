// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components 
import BlogDetails from '../components/BlogDetails';
import Bar from '../components/Bar';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css'; // Styling for bootstrap components

// Other tools
import { useEffect, useState } from 'react';
import Notification from '../components/Notification';

const Home = () => {

    const [blogPost, setBlogPost] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:3000/blog/posts')
            const json = await response.json()

            if(response.ok) {
                setBlogPost(json)
            }
        }

        fetchPosts()

    }, []);

    return (
        <>
        <Header/>
        <Notification/>
            <div className='d-flex flex-column justify-content-center align-items-center mt-3 mb-5'>
                <Bar blogPost={blogPost} setBlogPost={setBlogPost}/>
                    {blogPost && blogPost.map((blogPost) => (
                        <BlogDetails key={blogPost._id} blogPost={blogPost}/>
                    ))}
            </div>
        </>
    );
}

export default Home;