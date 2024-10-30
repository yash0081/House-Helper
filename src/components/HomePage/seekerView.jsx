

import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import { ref, set, onValue } from 'firebase/database';
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




const SeekerView = () => {
  const user = auth.currentUser;
  const actualID=user.uid;

  const { userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [userRating, setUserRating] = useState(0);

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');


  const [role, setRole] = useState('')
  const [gender, setGender] = useState('')
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState('')
  const [salary, setSalary] = useState('')
  let [reviewsNum, setReviewsNum] = useState(0)
  const [rating_submit, setRatingSubmit] = useState(true)


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

   const userratingRef=ref(database, 'usersRating/' + actualID+'/'+userId + '/rating');
   const rating_submitRef=ref(database, 'usersRating' + + actualID+'/'+userId + 'rating_submit');

   useEffect(() => {
    const unsubscribe = onValue(nameRef, (snapshot) => {
      const nameFromSnapshot = snapshot.val();
      setName(nameFromSnapshot);
    });
     // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [nameRef]);

  useEffect(() => {
    const unsubscribe = onValue(userratingRef, (snapshot) => {
      const userRatingFromSnapshot = snapshot.val();
      setUserRating(userRatingFromSnapshot);
    });
     // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [userratingRef]);

  useEffect(() => {
    const unsubscribe = onValue(rating_submitRef, (snapshot) => {
      const rating_submitFromSnapshot = snapshot.val();
      setRatingSubmit(rating_submitFromSnapshot);
    });
     // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [rating_submitRef]);


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
    // Implement settings functionality here
    navigate(`/worker_setting/${actualID}`);
  };

  const handleHomeClick = () => {
    // Implement home functionality here
    navigate(`/WorkerHomePage/${actualID}`);
  };

  const handleSearchClick = () => {
    // Implement search functionality here
    navigate(`/search_bar_worker/${actualID}`);
  };


  const handleReviewClick = () => {
    // Implement search functionality here
    navigate(`/reviews_worker/${actualID}`);
  };

  const handleSignOutClick = () => {
    // Implement sign-out functionality here
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleRating = (rating1) => {
    if (reviewsNum === 0) {
        reviewsNum++;
        set(ref(database, 'users/'  + userId), {
            name: name,
            role: role,
            gender: gender,
            phone: phone,
            address: address,
            skills: skills,
            experience: experience,
            salary: salary,
            description: description,
            verified: true,
            rating: rating1,
            reviewsNum: reviewsNum
        }).catch((error) => {
            console.log(error);
        });

        setUserRating(rating1);

        set(ref(database, 'usersRating/' +actualID+'/'+ userId), {
            rating: rating1,
            rating_submit: true
        }).catch((error) => {
            console.log(error);
        });

    } else {
        if (rating_submit) {
            set(ref(database, 'users/'  + userId), {
                name: name,
                role: role,
                gender: gender,
                phone: phone,
                address: address,
                skills: skills,
                experience: experience,
                salary: salary,
                description: description,
                verified: true,
                rating: (rating + rating1 - userRating) / reviewsNum,
                reviewsNum: reviewsNum
            }).catch((error) => {
                console.log(error);
            });

            setUserRating(rating1);

            set(ref(database, 'usersRating/' +actualID+'/'+ userId), {
                rating: rating1,
                rating_submit: true
            }).catch((error) => {
                console.log(error);
            });
        } else {
            set(ref(database, 'users/'  + userId), {
                name: name,
                role: role,
                gender: gender,
                phone: phone,
                address: address,
                skills: skills,
                experience: experience,
                salary: salary,
                description: description,
                verified: true,
                rating: (rating + rating1) / (reviewsNum + 1),
                reviewsNum: (reviewsNum + 1)
            }).catch((error) => {
                console.log(error);
            });

            setUserRating(rating1);

            set(ref(database, 'usersRating/' +actualID+'/'+ userId), {
                rating: rating1,
                rating_submit: true
            }).catch((error) => {
                console.log(error);
            });
        }
    }
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


            
            <div className='circular-rectangle' style={{ overflowX: 'hidden', overflowY: 'auto' }}>
              <div style={{ position: 'absolute', top: '30px', alignContent: 'center', fontSize: '32.5px', zIndex: '1', justifyContent: 'center', alignItems: 'center' }}>
                Welcome to {name}'s View Page!
              </div>

              <div style={{ position: 'absolute', top: '125px',  left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                      Want to rate them?
              </div>
              <div style={{ position: 'absolute', top: '200px', alignContent: 'center', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center' }}>
                <Rating
                  onClick={handleRating}
                  initialValue={userRating}

                  fillColor="#ffd700"
                  emptyColor="#FFFFFF"
                  SVGstrokeColor="#ffd700"
                  SVGstorkeWidth={1}
                  size={130}
                />
              </div>

              <div style={{ position: 'absolute', top: '380px',  left: '25px', fontSize: '25px', zIndex: '1', justifyContent: 'center', alignItems: 'center'}}>
                      Please rate Employers as accurately as possible!
              </div>

              
            </div>

            
              

            </div>
            

            </div>
            </div>

  );
};

export default SeekerView;
