// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import Image from 'react-bootstrap/Image';
import header from '../images/header2.svg';

const Header = () => {
    return (
        <div className='d-flex justify-content-center'>
            <Image src={header} fluid />
        </div>
    )
}

export default Header;