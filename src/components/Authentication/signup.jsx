import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import YourImage from '../../logos/Google.png';
import '../../styles/styles.css'
import NewImage from '../../logos/SecondLogo.png';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // Track password match

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    // Check if passwords match and update passwordMatch state
    setPasswordMatch(password !== '' && e.target.value === password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const redirectToCustomizationPage = (user) => {
    // Perform the redirection to the Customization page
    // You can use React Router or any other method to handle the navigation
    const userId = user.uid;
    navigate(`/customize/${userId}`);
    
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if(!email || !password || email.length === 0 || password.length === 0 || !passwordMatch) {
      alert("Please enter email and password");
      return;
    }else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        redirectToCustomizationPage(user);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("An account with this email already exists. If this is you, please login instead. Otherwise, create an account with a different email.");
          // Handle the error message or display it to the user
        } else if(error.code==="auth/invalid-password"){
          alert("Please choose a password of atleast 6 characters!")
        }
        else {
          console.error(error);
        }
      });
    }
    
  };

  const provider = new GoogleAuthProvider();

  const googleSignIn = (e) =>{
    e.preventDefault();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      redirectToCustomizationPage(user);
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
    <div className='container'>
      <div className='lefthandsignup'>
        <div className='login_form_container'>
          <form onSubmit={handleSignUp} className='loginForm'>
            <h1>Sign Up with Email</h1>
            <label>
              <input
                className='loginInput'
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder='Email'
              />
            </label>
            <label>
              <input
                className='loginInput'
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder='Password'
              />
            </label>
            <label>
              <input
                className='loginInput'
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder='Confirm Password'
              />
            </label>
            {/* Display password match message only when both fields have input */}
            {password !== '' && confirmPassword !== '' && (
              <p className='password-match-message' style={{ color: passwordMatch ? 'green' : 'red' }}>
                {passwordMatch ? 'Passwords match!' : 'Passwords do not match!'}
              </p>
            )}
            <button className='newloginButton' type="submit">
              Sign Up
            </button>
            <h3 className='signuph3'>Or</h3>
            <CircularButton
              onClick={googleSignIn}
              imageSrc={YourImage}
              altText="Google Logo"
            />
          </form>
        </div>
      </div>
      <div className='righthandsignup'>
          <img src={NewImage} className='mainLogo'></img>
          <br></br>
          <h1 className='h2HomePageSignup'>
            Discover endless possibilities with House Helper. Sign up as a homeowner, maid, or driver. Find jobs, hire help, and redefine convenience with simplicity.
          </h1>  
      </div>
    </div>
  );
};

export default SignUp;
