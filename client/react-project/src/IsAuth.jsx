// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Other tools
import Cookies from 'js-cookie';

// Checks if user is logged in
const IsAuth = () => {
    const token = Cookies.get('jwt');
    return !!token;
};

export default IsAuth;