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

const Search_Bar_Seeker = () => {
    const user = auth.currentUser;
  
    const roleOptions = [
      { value: 'driver', label: 'Driver' },
      { value: 'maid', label: 'Maid' },
    ];

    const DownDisplay = (arr) => {
      let result = '';
      for (let i = 0; i < arr.length; i++) {
        result += arr[i];
        if (i !== arr.length - 1) {
          result += ', '; // Add comma and space if not the last element
        }
      }
      return result;
    };

    const genderOptions = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
      { value: 'prefer not to say', label: 'Prefer Not to Say' },
    ];
  
    const { userId } = useParams();
    const navigate = useNavigate();

    const [minExperience, setMinExperience] = useState('');
    const [neededRole, setneededRole] = useState('');
    const [neededGender, setneededGender] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [neededSkills, setneededSkills] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredWorkers, setFilteredWorkers] = useState([]);

    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    // Fetch workers from Firebase and filter based on search term and filters
    useEffect(() => {
      const workersRef = ref(database, 'users');
        onValue(workersRef, (snapshot) => {
        const workers = snapshot.val() || {};
        let filteredWorkers = Object.entries(workers).flatMap(([userId, workerData]) => {
        if (workerData.role === 'driver' || workerData.role === 'maid') {
          return { ...workerData, userId };
        }
        return [];
        });
        // Filter workers based on search term
        if (searchTerm) {
          const searchRegex = new RegExp(searchTerm, 'i');
          filteredWorkers = filteredWorkers.filter((worker) =>
            worker.name.match(searchRegex),
          );
        }
        // Filter workers based on role, gender, experience, salary, and skills
        filteredWorkers = filteredWorkers.filter((worker) => {
          const skillsMatch = neededRole === '' || neededSkills.every((skill) => worker.skills?.includes(skill));
          const roleMatch = neededRole === '' || worker.role === neededRole;
          const genderMatch = neededGender === '' || worker.gender === neededGender;
          const experienceMatch = minExperience === '' || worker.experience >= minExperience;
          const salaryMatch = maxSalary === '' || worker.salary <= maxSalary;
    
          return skillsMatch && roleMatch && genderMatch && experienceMatch && salaryMatch;
        });
        filteredWorkers = sortWorkers(filteredWorkers, sortColumn, sortOrder);
        setFilteredWorkers(filteredWorkers);
      });
    }, [neededRole, neededGender, minExperience, maxSalary, neededSkills, searchTerm, sortColumn, sortOrder]);


  
    const handleSettingsClick = () => {
        // Implement settings functionality here
        navigate(`/seeker_settings/${userId}`);
    };
    
    const handleHomeClick = () => {
        // Implement home functionality here
        navigate(`/SeekerHomePage/${userId}`);
    };
    
    const handleSearchClick = () => {
        // Implement search functionality here
        navigate(`/search_bar_seeker/${userId}`);
    };

    const handleReviewClick = () => {
        // Implement search functionality here
        navigate(`/reviews_seeker/${userId}`);
    };
  
    const handleSignOutClick = () => {
      // Implement sign-out functionality here
      signOut(auth).then(() => {
        navigate('/');
      }).catch((error) => {
        console.log(error);
      });
    };

    

    const sortWorkers = (workers, column, order) => {
      // Check if the column is valid for sorting
      const validColumns = ['rating', 'salary', 'experience'];
      if (!validColumns.includes(column)) {
        return workers;
      }
    
      // Sort the workers array based on the selected column and order
      return workers.sort((a, b) => {
        let comparison = 0;
    
        // Handle 'Unrated' workers
        if (column === 'rating') {
          if (a.rating === 0) comparison = order === 'asc' ? 1 : -1;
          else if (b.rating === 0) comparison = order === 'asc' ? -1 : 1;
          else comparison = a.rating - b.rating;
        } else {
          comparison = a[column] - b[column];
        }
    
        if (order === 'asc') {
          return comparison;
        } else {
          return -comparison;
        }
      });
    };

    const handleSort = (column) => {
      if (sortColumn === column) {
        // If the same column is clicked, toggle the sort order
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        // If a different column is clicked, set the new column and reset the sort order
        setSortColumn(column);
        setSortOrder('asc');
      }
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
      <div className='circular-rectangle-wrapper5'>
           <div className='circular-rectangle19' style={{ overflowX: 'hidden', overflowY: 'auto' }}>
               <div style={{ position: 'absolute', top: '30px', left: '62px', fontSize: '32.5px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                   Search Filters
                </div>

                <div style={{ position: 'absolute', top: '80px',  left: '24px', fontSize: '25px', zIndex: '1000', justifyContent: 'center', alignItems: 'center'}}>

                  <label>
                  <Select
                  value={roleOptions.find((option) => option.value === neededRole)}
                  onChange={(selectedOption) => setneededRole(selectedOption.value)}
                  options={roleOptions}
                  className='customizeLoginInput35'
                  isSearchable={false}
                  menuPortalTarget={document.body}
                  placeholder="Select Prefered Role"
                  styles={{
                  control: (provided) => ({
                    ...provided,
                    width: '248px',
                  }),
                  }}
                  />
                  </label>

                </div>

                <div style={{ position: 'absolute', top: '25px',  left: '23.5px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>

                  <label>
                  <Select
                       value={genderOptions.find((option) => option.value === neededGender)}
                       onChange={(selectedOption) => setneededGender(selectedOption.value)}
                       options={genderOptions}
                       className='customizeLoginInput27'
                       isSearchable={false}
                       menuPortalTarget={document.body}
                       placeholder="Select Prefered Gender"
                       styles={{
                       control: (provided) => ({
                           ...provided,
                           width: '100%',
                       }),
                       }}
                   />
                  </label>

                </div>
                <div style={{ position: 'absolute', top: '233.5px',  left: '25px', fontSize: '20px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                       Minimum Experience:
                </div>
                <div style={{ position: 'absolute', top: '258px',  left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                
                <label>
                       <div className="name-input-container">
                       <input
                           type="number"
                           value={minExperience}
                           onChange={(e) => setMinExperience(e.target.value)}
                           placeholder=" "


                           className='customizeLoginInput28'
                        />
                       </div>
                          
                   </label>

                </div>
                <div style={{ position: 'absolute', top: '323px',  left: '25px', fontSize: '20px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                       Maximum Salary:
                </div>
                <div style={{ position: 'absolute', top: '348px',  left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                
                <label>
                       <div className="name-input-container">
                       <input
                           type="number"
                           value={maxSalary}
                           onChange={(e) => setMaxSalary(e.target.value)}
                           placeholder=" "


                           className='customizeLoginInput28'
                        />
                       </div>
                          
                   </label>

                </div>


                <div style={{ position: 'absolute', top: '410px',  left: '24px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                   {neededRole === 'maid' && (
              <label>
              <Select
                isMulti
                value={neededSkills.map(skill => ({ value: skill, label: skill }))}
                onChange={(selectedOptions) => setneededSkills(selectedOptions.map(option => option.value))}
                options={[
                { value: 'cleaning', label: 'Cleaning' },
                { value: 'cooking', label: 'Cooking' },
                { value: 'laundry', label: 'Laundry' },
                { value: 'child-care', label: 'Child Care' },
                ]}
                className='customizeLoginInput100'
                isSearchable={false}
                menuPortalTarget={document.body}
                placeholder="Required Skills"
                styles={{
                control: (provided) => ({
                ...provided,
                width: '258px',
                }),
                }}
                />

              </label>
          )}
          {neededRole === 'driver' && (
             
                <label>
                <Select
                isMulti
                value={neededSkills.map(skill => ({ value: skill, label: skill }))}
                onChange={(selectedOptions) => setneededSkills(selectedOptions.map(option => option.value))}
                options={[
               { value: 'driving', label: 'Driving' },
               { value: 'maintenance', label: 'Maintenance' },
               { value: 'route-navigation', label: 'Route Navigation' },
               { value: 'customer-service', label: 'Customer Service' },
               ]}
               className='customizeLoginInput100'
               isSearchable={false}
               menuPortalTarget={document.body}
               placeholder="Required Skills"
               styles={{
               control: (provided) => ({
              ...provided,
              width: '258px',
              }),
              }}
              />
                </label>

          )}
        </div>


            </div>
            <div className='circular-rectangle20' style={{ overflowX: 'hidden', overflowY: 'auto' }}>
              <div style={{ position: 'absolute', top: '30px', left: '200px', fontSize: '32.5px', zIndex: '1', justifyContent: 'center', alignItems: 'center' }}>
                House Helpers List
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
                    marginTop: '-40px', // Spacing from the table
                    width: '600px'
                  }}
                  fullWidth
                />
                <TableContainer component={Paper} style={{ marginTop: '20px', border: '2px solid #00DBFC' }}>
                  <Table>
                  <TableHead style={{ borderBottom: '2px solid #00DBFC' }}>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell onClick={() => handleSort('rating')} style={{ cursor: 'pointer' }}>
                      Rating {sortColumn === 'rating' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </TableCell>
                      <TableCell onClick={() => handleSort('salary')} style={{ cursor: 'pointer' }}>
                      Salary {sortColumn === 'salary' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </TableCell>
                      <TableCell onClick={() => handleSort('experience')} style={{ cursor: 'pointer' }}>
                      Experience {sortColumn === 'experience' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {filteredWorkers.map((worker) => (
                    <TableRow key={worker.userId} onClick={() => navigate(`/workerView/${worker.userId}`)} style={{ cursor: 'pointer', borderBottom: '1px solid #00DBFC' }}>
                    <TableCell>{worker.name}</TableCell>
                    <TableCell>
                    {worker.rating !== 0 ? (
                      <Rating readonly initialValue={worker.rating} />
                      ) : (
                      'Unrated'
                    )}
                  </TableCell>
                  <TableCell>{worker.salary}</TableCell>
                  <TableCell>{worker.experience}</TableCell>
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
      </div>
    );
    };
  
export default Search_Bar_Seeker;
  