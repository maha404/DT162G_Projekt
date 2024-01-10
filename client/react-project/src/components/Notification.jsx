// Kod skriven av Maria Halvarsson - Projekt i kursen DT162G

// Bootstrap components
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
// Other tools
import React, { useState, useEffect } from 'react';

const Notification = () => {

    const [showReminder, setShowReminder] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
          setShowReminder(true);
        }, 50 * 60 * 1000); 
    
        return () => clearTimeout(timeout);
      }, []);

    return (
        <>
        {showReminder && (
            <Alert variant='info' className='mt-4'>
            <p>Din session håller på att ta slut! Vänligen logga ut och in igen!</p>
            <Button>Stäng</Button>
            </Alert>
        )}
        </>
    )
}

export default Notification;