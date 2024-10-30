import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import { ref, onValue, child, push, update } from 'firebase/database';
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
import Select from 'react-select';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { getAuth, deleteUser } from "firebase/auth";


const Seeker_Setting = () => {


  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer not to say', label: 'Prefer Not to Say' },
  ];


  const user = auth.currentUser;

  

   const { userId } = useParams();
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [newname, setnewName] = useState('');
   const [gender, setGender] = useState('');
   const [newgender, setnewGender] = useState('');
   const [phone, setPhone] = useState('');
   const [newphone, setnewPhone] = useState('');

   const [password, setPassword] = useState('')
   const [newpassword, setNewPassword] = useState('')

   const [role, setRole] = useState('')
   const [address, setAddress] = useState('')
   const [skills, setSkills] = useState([])
   const [experience, setExperience] = useState('')
   const [salary, setSalary] = useState('')
   const [description, setDescription] = useState('')
   const [rating, setRating] = useState(0)
   const [reviewsNum, setReviewsNum] = useState(0)


   const nameRef = ref(database, 'users/' + userId + '/name');
   const genderRef=ref(database, 'users/' + userId + '/gender');
   const phoneRef=ref(database, 'users/' + userId + '/phone');
   const roleRef=ref(database, 'users/' + userId + '/role');
   const addressRef=ref(database, 'users/' + userId + '/address');
   const skillsRef=ref(database, 'users/' + userId + '/skills');
   const experienceRef=ref(database, 'users/' + userId + '/experience');
   const salaryRef=ref(database, 'users/' + userId + '/salary');
   const descriptionRef=ref(database, 'users/' + userId + '/description');
   const ratingRef=ref(database, 'users/' + userId + '/rating');
   const reviewsNumRef=ref(database, 'users/' + userId + '/reviewsNum');


  useEffect(() => {
     const unsubscribe = onValue(nameRef, (snapshot) => {
       const nameFromSnapshot = snapshot.val();
       setName(nameFromSnapshot);
     });
      // Cleanup the subscription when the component unmounts
     return () => unsubscribe();
   }, [nameRef]);


  useEffect(() => {
       const unsubscribe = onValue(genderRef, (snapshot) => {
         const genderFromSnapshot = snapshot.val();
         setGender(genderFromSnapshot);
       });
  
       // Cleanup the subscription when the component unmounts
       return () => unsubscribe();
  }, [genderRef]);


   useEffect(() => {
     const unsubscribe = onValue(phoneRef, (snapshot) => {
       const phoneFromSnapshot = snapshot.val();
       setPhone(phoneFromSnapshot);
     });
      // Cleanup the subscription when the component unmounts
     return () => unsubscribe();
    }, [phoneRef]);

    useEffect(() => {
      const unsubscribe = onValue(roleRef, (snapshot) => {
        const roleFromSnapshot = snapshot.val();
        setRole(roleFromSnapshot);
      });
       // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
     }, [roleRef]);

     useEffect(() => {
      const unsubscribe = onValue(addressRef, (snapshot) => {
        const addressFromSnapshot = snapshot.val();
        setAddress(addressFromSnapshot);
      });
       // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
     }, [addressRef]);

     useEffect(() => {
      const unsubscribe = onValue(descriptionRef, (snapshot) => {
        const descriptionFromSnapshot = snapshot.val();
        setDescription(descriptionFromSnapshot);
      });
       // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
     }, [descriptionRef]);

     useEffect(() => {
      const unsubscribe = onValue(skillsRef, (snapshot) => {
        const skillsFromSnapshot = snapshot.val();
        setSkills(skillsFromSnapshot);
      });
       // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
     }, [skillsRef]);

     useEffect(() => {
      const unsubscribe = onValue(salaryRef, (snapshot) => {
        const salaryFromSnapshot = snapshot.val();
        setSalary(salaryFromSnapshot);
      });
       // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
     }, [salaryRef]);

     useEffect(() => {
      const unsubscribe = onValue(experienceRef, (snapshot) => {
        const experienceFromSnapshot = snapshot.val();
        setExperience(experienceFromSnapshot);
      });
       // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
     }, [experienceRef]);

     useEffect(() => {
      const unsubscribe = onValue(ratingRef, (snapshot) => {
        const ratingFromSnapshot = snapshot.val();
        setRating(ratingFromSnapshot);
      });
       // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
     }, [ratingRef]);

     useEffect(() => {
      const unsubscribe = onValue(reviewsNumRef, (snapshot) => {
        const reviewsNumFromSnapshot = snapshot.val();
        setReviewsNum(reviewsNumFromSnapshot);
      });
       // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
     }, [reviewsNumRef]);

    const handleSettingsClick = () => {
       navigate(`/seeker_settings/${userId}`);
    };
  
    const handleHomeClick = () => {
       navigate(`/SeekerHomePage/${userId}`);
    };
  
    const handleSearchClick = () => {
       navigate(`/search_bar_seeker/${userId}`);
    };
  

  
    const handleReviewClick = () => {
       navigate(`/reviews_seeker/${userId}`);
    };

    const handlePasswordChange = async (e) => {
      e.preventDefault();
    
      const isPasswordCorrect = await verifyCurrentPassword(password);
    
      if (isPasswordCorrect) {
        const currentUser = auth.currentUser;
        try {
          await updatePassword(currentUser, newpassword);
          alert('Password updated successfully!');
          setPassword('');
          setNewPassword('');
        } catch (error) {
          console.error('Error updating password:', error);
          alert('Error updating password. Please try again.');
        }
      } else {
        alert('The current password you entered is incorrect. Please try again.');
      }
    };
  
    const handleSignOutClick = () => {
       signOut(auth).then(() => {
         navigate('/');
       }).catch((error) => {
         console.log(error);
       });
    };


   const capitalizeFirstLetter = (str) => {
       return str.charAt(0).toUpperCase() + str.slice(1);
   }

   const verifyCurrentPassword = async (currentPassword) => {
    try {
      const currentUser = auth.currentUser;
      const credentials = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credentials);
      return true;
    } catch (error) {
      console.error('Error verifying current password:', error);
      return false;
    }
    };


   const updateToDatabase = (userId) => {
    try{
      const postData = {
        name: newname || name,
        role: role,
        gender: newgender || gender,
        phone: newphone || phone,
        address: address,
        skills: skills,
        experience: experience,
        salary: salary,
        description: description,
        verified: true,
        rating: rating,
        reviewsNum: reviewsNum
      };
  
      const updates = {};
      updates['/users/' + userId] = postData;
  
      return update(ref(database), updates);
    }catch(error){
      alert(error);
    }
     
   }

   const redirect = (userId) => {
    navigate(`/seeker_settings/${userId}`);
   }


   const handleInfoSubmit = (e) => {
      e.preventDefault();
      updateToDatabase(userId);
      setnewName(''); // Reset newname state after form submission
      setnewGender('');
      setnewPhone('');
      alert('Personal Info Updated Successfully!')
      redirect(userId);
      e.target.reset();

   }


  
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
           <div className='circular-rectangle-wrapper'>
               <div className='circular-rectangle2'>
               <div style={{ position: 'absolute', top: '30px', left: '55.5px', fontSize: '32.5px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                   Update Personal Info
               </div>
               <form onSubmit={handleInfoSubmit}>
                   <div style={{ position: 'absolute', top: '90px',  left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                       Name:
                   </div>


                   <div style={{ position: 'absolute', top: '120px',  left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                   <label>
                       <div className="name-input-container">
                       <input
                           type="text"
                           value={newname}
                           onChange={(e) => setnewName(e.target.value)}
                           placeholder={name}


                           className='customizeLoginInput2'
                        />
                       </div>
                          
                   </label>
                   </div>
                  


                   <div style={{ position: 'absolute', top: '200px', left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                       Gender:
                   </div>
                   <div className='form-group'>
                       <label>


                       <Select
                       value={genderOptions.find((option) => option.value === newgender)}
                       onChange={(selectedOption) => setnewGender(selectedOption.value)}
                       options={genderOptions}
                       className='customizeLoginInput3'
                       isSearchable={false}
                       menuPortalTarget={document.body}
                       placeholder={capitalizeFirstLetter(gender)}
                       styles={{
                       control: (provided) => ({
                           ...provided,
                           width: '100%',
                       }),
                       }}
                   />
                   </label>
                   </div>


                   <div style={{ position: 'absolute', top: '315px',  left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                       Phone:
                   </div>


                   <div style={{ position: 'absolute', top: '345px',  left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                   <label>
                       <div className="name-input-container">
                       <input
                           type="text"
                           value={newphone}
                           onChange={(e) => setnewPhone(e.target.value)}
                           placeholder={phone}


                           className='customizeLoginInput2'
                           />
                       </div>
                          
                   </label>
                   </div>
                  
                   <div style={{ position: 'relative', top: '97.5px', left: '40px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                   <button type="submit" className='loginButton2'>Update</button>
                   </div>


                  {/*<button type="submit" className='loginButton2'>Save</button>*/}




               </form>
              
               </div>
               <div className='circular-rectangle2' >
                  <div style={{ position: 'absolute', top: '30px', left: '80px', fontSize: '32.5px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                  Update Password
                 </div>

                 <div style={{ position: 'absolute', top: '100px', left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                      To change your password, please enter your CURRENT password!
                  </div>
                  <form onSubmit={handlePasswordChange}>
                  <div style={{ position: 'absolute', top: '200px', left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                      Current Password:
                  </div>

                  


                  <div className="name-input-container">
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Current Password"
                      required

                      className='customizeLoginInput4'
                  />

                  </div>

                  

                  <div style={{ position: 'absolute', top: '315px', left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                      New Password:
                  </div>
                  <div className="name-input-container">
                  <input
                      type="password"
                      value={newpassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder=" New Password"
                      required


                      className='customizeLoginInput5'
                  />
                  </div>

                  <div style={{ position: 'relative', top: '-3px', left: '40px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                   <button type="submit" className='loginButton2'>Change Password</button>
                   </div>

                  </form>

                  
               </div>


           </div>
         </div>
       </div>
       </div>
   );
   };
 export default Seeker_Setting;



