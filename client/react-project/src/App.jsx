// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavbar from "./components/Navbar";
import PrivateRoute from './Privateroute/PrivateRoute';

// Other tools
import { BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Auth from "./IsAuth";

// Pages 
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Post from './pages/Post'
import UpdatePost from './pages/UpdatePost';

const AutoLogout = () => {
  
  const navigate = useNavigate();
  const isAuthenticated = Auth();

  useEffect(() => {
      if(isAuthenticated) {
          const timeout = setTimeout(() => {
          console.log('loggar ut...')
          LogoutUser();
        }, 60 * 60 * 1000);

        return () => clearTimeout(timeout);
      }
  }, [isAuthenticated]);

  const LogoutUser = async () => {
    const response = await fetch('http://localhost:3000/blog/logout', {
          method: 'POST', 
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if(response.ok) {
          navigate("/logga_in"); 
        }
  }

}

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <AutoLogout/>
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
