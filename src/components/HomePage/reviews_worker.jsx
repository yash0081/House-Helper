import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import { ref, onValue } from 'firebase/database';
import Logout from '../Authentication/logout';
import '../../styles/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import ProfileImage from '../../logos/DefaultProfile.png';
import { IoSettingsOutline } from 'react-icons/io5';
import { GoSignOut } from 'react-icons/go';
import { signOut } from "firebase/auth";
import { AiOutlineHome } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { Rating } from 'react-simple-star-rating'
import { IoSearch } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";

const Reviews_Worker = () => {
    const user = auth.currentUser;
  
  
    const { userId } = useParams();
    const navigate = useNavigate();
  
    const [name, setName] = useState('');
    const [userRating, setUserRating] = useState(0);
  
    const nameRef = ref(database, 'users/' + userId + '/name');
    const rating = ref(database, 'users/' + userId + '/rating');
  
    useEffect(() => {
      const unsubscribe = onValue(nameRef, (snapshot) => {
        const nameFromSnapshot = snapshot.val();
        setName(nameFromSnapshot);
      });
  
      // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
    }, [nameRef]);
  
    useEffect(() => {
      const unsubscribeRating = onValue(rating, (snapshot) => {
        const ratingFromSnapshot = snapshot.val();
        setUserRating(ratingFromSnapshot);
      });
  
      // Cleanup the subscription when the component unmounts
      return () => unsubscribeRating();
    }, [rating]);
  
    const handleSettingsClick = () => {
        // Implement settings functionality here
        navigate(`/worker_setting/${userId}`);
    };
    
    const handleHomeClick = () => {
        // Implement home functionality here
        navigate(`/WorkerHomePage/${userId}`);
    };
    
    const handleSearchClick = () => {
        // Implement search functionality here
        navigate(`/search_bar_worker/${userId}`);
    };
    

    
    const handleReviewClick = () => {
        // Implement search functionality here
        navigate(`/reviews_worker/${userId}`);
    };
    
    const handleSignOutClick = () => {
        // Implement sign-out functionality here
        signOut(auth).then(() => {
          navigate('/');
        }).catch((error) => {
          console.log(error);
        });
    };
  
    return (
      <div>
      <div style={{ backgroundColor: "white", height: '80px', width: '100%', position: 'fixed', top: '0', zIndex: '1000', borderBottom: '5px solid #00DBFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
          <MdOutlineDashboard color='#00DBFC' size='50px' />
          <span style={{ color: '#00DBFC', fontSize: '45px', marginLeft: '10px', marginRight: '20px', lineHeight: '80px' }}>House Helper Dashboard</span>
        </div>
        <div style={{ marginRight: '20px', position: 'relative' , marginTop: '8px'}}>
          <IoSettingsOutline
          color='#00DBFC'
          size='50px'
          onClick={handleSettingsClick}
          style={{ cursor: 'pointer' }}
          data-icon
          />
        <div className="tooltip" style={{ right: 0 }}>Settings</div>
      </div>
      </div>

      <div className="container1">
      <div className="sidebar">
        <div style={{ marginTop: '150px'}}>
        <button className="tab" onClick={handleHomeClick}>
          <span className="icon-with-text">
          <AiOutlineHome className="tab-icon1" />
          <span>Home</span>
          </span>
        </button>
        <br></br>
        <button className="tab" onClick={handleSearchClick}>
          <span className="icon-with-text">
          <IoSearch className="tab-icon2" />
          <span>Search</span>
          </span>
        </button>
        <br></br>
        <button className="tab" onClick={handleReviewClick}>
          <span className="icon-with-text">
          <MdRateReview className="tab-icon3" />
          <span>Reviews</span>
          </span>
        </button>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <button className="tab" onClick={handleSignOutClick}>
            <span className="icon-with-text">
            <GoSignOut className="tab-icon3" />
            <span>Logout</span>
            </span>
          </button>
       

        </div>
        </div>
        </div>
        


    
      </div>
    );
    };
  
export default Reviews_Worker;
  