// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components 
import PostForm from '../components/PostForm.jsx';
import UserPosts from '../components/UserPosts';

// Other tools
import { useEffect, useState } from 'react';

const Profile = () => {

    const [blogPost, setBlogPost] = useState(null)

    const fetchPosts = async () => {
        const response = await fetch('http://localhost:3000/blog/user', {
            method: 'GET', 
            credentials: 'include'
        })
        const json = await response.json()

        if (response.ok) {
            setBlogPost(json)
        }
    }

    useEffect(() => {

        fetchPosts();

    }, []);


    return (
        <div className='mt-5 mb-5'>
            <h2 style={{color: 'white', marginLeft:'3rem'}}>Skriv ett inlägg</h2>
            <div className='bg-light p-2'>
                <PostForm fetchFunction={fetchPosts} />
            </div>
            {blogPost !== null && (
                <div className='posts-container'>
                {blogPost && blogPost.map((blogPost) => (
                        <UserPosts key={blogPost._id} blogPost={blogPost} fetchFunction={fetchPosts}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profile;