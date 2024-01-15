// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

const UserPosts = ({blogPost, fetchFunction}) => {

    const deletePost = async () => {
      let postId = blogPost._id;

      const response = await fetch('http://localhost:3000/blog/posts/' + postId, {
        method: 'DELETE', 
        credentials: 'include'
      })
      
      fetchFunction();
    }

    const fullContent = blogPost.content;
    const shortContent = fullContent.slice(0, 100);

    return (
        <Card className="posts-container">
        <Card.Body className="single-post">
          <Card.Title>{blogPost.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{blogPost.author_name}</Card.Subtitle>
          <Card.Text>
          {shortContent}...
          </Card.Text>
          <Link to={`/redigera/${blogPost._id}`}><Button variant="warning"><i class="bi bi-pencil"></i> Ändra</Button></Link>{' '}
          <Button variant='danger' onClick={deletePost}><i class="bi bi-trash"></i> Radera</Button>
        </Card.Body>
      </Card>
    )
}

export default UserPosts;