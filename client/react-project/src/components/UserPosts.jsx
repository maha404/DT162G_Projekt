// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

const UserPosts = ({blogPost, fetchFunction}) => {

    function deletePost () {
      let postId = blogPost._id;

      const response = fetch('http://localhost:3000/blog/posts/' + postId, {
        method: 'DELETE', 
        credentials: 'include'
      })
      
      if(response.ok) {
        fetchFunction();
      }

    }

    return (
        <Card className="posts-container">
        <Card.Body className="single-post">
          <Card.Title>{blogPost.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{blogPost.author_name}</Card.Subtitle>
          <Card.Text>
          {blogPost.content}
          </Card.Text>
          <Link to={`/redigera/${blogPost._id}`}><Button variant="warning"><i class="bi bi-pencil"></i> Ändra</Button></Link>{' '}
          <Button variant='danger' onClick={deletePost}><i class="bi bi-trash"></i> Radera</Button>
        </Card.Body>
      </Card>
    )
}

export default UserPosts;