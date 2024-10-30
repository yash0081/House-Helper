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
import Select from 'react-select';
import { MdOutlineDashboard } from "react-icons/md";
import { Rating } from 'react-simple-star-rating'
import { IoSearch } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Search_Bar_Worker= () => {
  const user = auth.currentUser;


  const { userId } = useParams();
  const navigate = useNavigate();

  const [filteredseekers, setFilteredseekers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  // Fetch workers from Firebase and filter based on search term and filters
  useEffect(() => {
    const seekersRef = ref(database, 'users');
      onValue(seekersRef, (snapshot) => {
      const seekers = snapshot.val() || {};
      let filteredseekers = Object.entries(seekers).flatMap(([userId, seekerData]) => {
      if (seekerData.role === 'seeker') {
        return { ...seekerData, userId };
      }
      return [];
      });

  
      // Filter workers based on search term
      if (searchTerm) {
        const searchRegex = new RegExp(searchTerm, 'i');
        filteredseekers = filteredseekers.filter((seeker) =>
          seeker.name.match(searchRegex),

        );
      }
  
      

  
      setFilteredseekers(filteredseekers);
    });
  }, [searchTerm]);
  
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

        <button className="tab" onClick={handleSettingsClick}>
          <span className="icon-with-text">
          <IoSettingsOutline className="tab-icon3" />
          <span>Settings</span>
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

        <div className='rightSeekerHome'>
        <div className='circular-rectangle'>
        <div style={{ position: 'absolute', top: '30px', alignContent: 'center' , fontSize: '42px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                   Search for Employers
        </div>

        <div style={{ padding: '20px' }} >
                <TextField
                  variant="outlined"
                  placeholder="Search workers by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    borderRadius: '8px', // Curved edges
                    border: '2px solid #00DBFC', // Border
                    padding: '10px', // Padding for better visual appearance
                    marginTop: '-30px', // Spacing from the table
                    width: '600px'
                  }}
                  fullWidth
                />
                <TableContainer component={Paper} style={{ marginTop: '20px', border: '2px solid #00DBFC' }}>
                  <Table>
                  <TableHead style={{ borderBottom: '2px solid #00DBFC' }}>
                    <TableRow>
                      <TableCell>Name</TableCell>

                      <TableCell>
                      Rating
                      </TableCell>
                      <TableCell>
                      Gender
                      </TableCell>
                      
                 
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {filteredseekers.map((seeker) => (
                    <TableRow key={seeker.userId} onClick={() => navigate(`/seekerView/${seeker.userId}`)} style={{ cursor: 'pointer', borderBottom: '1px solid #00DBFC' }}>
                    <TableCell>{seeker.name}</TableCell>
                    <TableCell>
                    {seeker.rating !== 0 ? (
                      <Rating readonly initialValue={seeker.rating} />
                      ) : (
                      'Unrated'
                    )}
                  </TableCell>
                  <TableCell>{seeker.gender}</TableCell>
                
                  </TableRow>
                  ))}
                  </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
        
    </div>
    </div>
    </div>


    );
    };
  
export default Search_Bar_Worker;
  