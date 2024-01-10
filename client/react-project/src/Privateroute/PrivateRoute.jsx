// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Other tools
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
    const token = Cookies.get('jwt');
    return token ? children : <Navigate to="/logga_in"/>;

};

export default PrivateRoute;