// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Structure of the blogposts shown on homepage
const BlogDetails = ({blogPost}) => {

    const comments = blogPost.comments;
    const numberOfComments = comments.length;

    return (
      <div className="post" >
        <div id={blogPost._id}>
          <div style={{backgroundColor: 'purple', width: '3 rem'}}></div>
          <h3>{blogPost.title}</h3>
          <p>Postad av {blogPost.author_name}</p>
            <p>
            {blogPost.content}
            </p>
        </div>
        <div className='d-flex mt-3'>
          <i className="bi bi-chat" style={{color:'#003D5C'}}></i> 
          <div className='p-1'></div>
          <p style={{color:'#003D5C'}}>{numberOfComments} kommentarer</p>
        </div>
        <Link to={`/post/${blogPost._id}`}>Läs mer</Link>
      </div>
    );
}

export default BlogDetails;