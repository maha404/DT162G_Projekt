// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavbar from "./components/Navbar";
import PrivateRoute from './Privateroute/PrivateRoute';

// Other tools
import { BrowserRouter, Routes, Route} from 'react-router-dom';

// Pages 
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Post from './pages/Post'
import UpdatePost from './pages/UpdatePost';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <MainNavbar /> 
          <Routes>
              <Route
                path="/"
                element={<Home/>}
              />
              <Route 
                path="/logga_in"
                element={<LogIn/>}
              />
              <Route 
                path="/registrera"
                element={<Register/>}
              />
              <Route
                path="/profil"
                element={
                <PrivateRoute>
                  <Profile/> {/*Child */}
                </PrivateRoute>
              }
              />
              <Route 
                path="/post/:postId"
                element={<Post/>}
              />
              <Route
                path='/redigera/:postId'
                element={
                <PrivateRoute>
                  <UpdatePost/>
                </PrivateRoute>
              }
              />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
