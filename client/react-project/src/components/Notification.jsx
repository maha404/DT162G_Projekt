// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
// Other tools
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Auth from '../IsAuth';

const Notification = () => {

    const [showReminder, setShowReminder] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = Auth();

    useEffect(() => {
        const timeout = setTimeout(() => {
          setShowReminder(true);
          console.log('timer klar');
        }, 50 * 60 * 1000); 
    
        return () => clearTimeout(timeout);
      }, []);

      const handleClick = async () => {
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

    return (
        <>
        {showReminder && isAuthenticated && (
            <Alert variant='info' className='mt-4'>
              <p>Din session håller på att ta slut! Vänligen logga ut och in igen!</p>
              <Button onClick={handleClick}>Logga ut</Button>
            </Alert>
        )}
        </>
    )
}

export default Notification;