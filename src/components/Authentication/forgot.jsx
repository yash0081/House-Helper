import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import '../../styles/styles.css'
import { sendPasswordResetEmail } from "firebase/auth";

const Forgot = () => {


    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!

            alert("Password Reset Email Successfully Sent!")
            // ..
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode+" "+errorMessage)
            // ..
          });
    }

   

    return (
        <div className='page_container'>

        <div className='login_form_container'>
        <form onSubmit={handleSubmit} className='loginForm'>
          <h1 >Forgot Password</h1>
          <label>
            <input className='loginInput' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
          </label>

          <button className='newloginButton' type="submit">Send Password Reset Email</button>
  

                
  
         
        </form>
      </div>

        </div>
      
    );
  };
  
  export default Forgot;
  