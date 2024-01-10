// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components 
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Bar = ({setBlogPost}) => {

    const getRecentPost = async () => {
        const response = await fetch ('http://localhost:3000/blog/most-recent', {
            method: 'GET', 
            credentials: 'include'
        })
        const json = await response.json()

        if(response.ok) {
            setBlogPost(json)
        }
    }

    return (
        <div className='w-50'>
            <Card className='p-2'>
                <Link onClick={getRecentPost}> <i className="bi bi-stars" style={{color: '#003D5C'}}></i> Senaste inlägg </Link>
            </Card>
        </div>
    )
}

export default Bar;