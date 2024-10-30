import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { database } from '../../firebase/firebase';
import { ref, onValue } from "firebase/database";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import YourImage from '../../logos/Google.png';
import '../../styles/styles.css'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // User is logged in successfully
        const user=userCredential.user;
        const userId=user.uid;

        const roleRef=ref(database, 'users/'+userId+'/role');
        try{
          onValue(roleRef, (snapshot) => {
            const role=snapshot.val();
            redirectToHomePage(userId, role);
          })
        }catch(error){
          console.log(error);
        }
           
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
          alert('Invalid username or password. Please try again.');
        } else {
          console.error(error);
          // Handle other error codes
        }
    });
  };

  const redirectToHomePage = (userId, role) => {
    if ((role === 'maid') || (role === 'driver')) {
       navigate(`/WorkerHomePage/${userId}`);
    } else if (role === 'seeker') {
       navigate(`/SeekerHomePage/${userId}`);
    }
  };

  const provider = new GoogleAuthProvider();

  const googleSignIn = (e) =>{
    e.preventDefault();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const userId=user.uid;

      const roleRef=ref(database, 'users/'+userId+'/role');
      try{
        onValue(roleRef, (snapshot) => {
          const role=snapshot.val();
          redirectToHomePage(userId, role);
        })
      }catch(error){
        console.log(error);
      }
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  };

  const CircularButton = ({ onClick, imageSrc, altText }) => (
    <button type="button" className="circularButton" onClick={onClick}>
      <img src={imageSrc} alt={altText} />
    </button>
  );

  return (

    <div className='login_form_container'>
      <form onSubmit={handleLogin} className='loginForm'>
        <h1 >Login with Email</h1>
        <label>
          <input className='loginInput' type="email" value={email} onChange={handleEmailChange} placeholder='Email'/>
        </label>
        <label>
          <input className='loginInput' type="password" value={password} onChange={handlePasswordChange} placeholder='Password'/>
        </label>
        <button className='newloginButton' type="submit">Log In</button>

        <h3 className='signuph3'>Or</h3>
              

        <CircularButton
        onClick={googleSignIn}
        imageSrc={YourImage} // Replace with the correct path
        altText="Google Logo"
        />

        <div className="signupText">
          <p>Forgot your password? <a href="/forgot">Retrieve it here!</a></p>
        </div>
        <div className="signupText">
          <p>Don't have an account? <a href="/signup">Sign up!</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
