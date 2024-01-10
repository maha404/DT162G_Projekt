// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components 
import Container from 'react-bootstrap/Container';
import CommentForm from './CommentForm';
import Auth from '../IsAuth';

// Other tools
import React from 'react';

const SinglePost = ({ blogPost, fetchFunction }) => {
  const comments = blogPost.comments;
  const isAuthenticated = Auth();

  const commentStyle = {
    borderLeft: '5px solid purple',
    marginTop: '1rem',
    padding: '1rem'
  }

  // Skapa en lista med JSX-element för varje kommentar
  const commentsList = comments.map((comment) => (
    <div style={commentStyle} key={comment._id}>
        <p style={{textDecoration: 'underline'}}>{comment.author}</p>
        <p>{comment.content}</p>
    </div>
  ));

  return (
    <Container className='mt-5 w-100'>
      <div className="my-auto">
        <h2>{blogPost.title}</h2>
        <p>{blogPost.content}</p>
      </div>

      {isAuthenticated && (
        <div>
        <CommentForm blogPost={blogPost} fecthComments={fetchFunction}/>
        </div>
      )}
      <hr />
      <div>
        <ul>{commentsList}</ul>
      </div>
    </Container>
  );
}

export default SinglePost;