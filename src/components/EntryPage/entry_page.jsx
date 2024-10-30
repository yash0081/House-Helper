import React from 'react';

import Login from '../Authentication/login';
import '../../styles/styles.css';
import YourImage from '../../logos/HouseHelperNewLogo.png';

const EntryPage = () => {
  return (
    <div className='container'> 
      <div className='lefthand'>
      <img src={YourImage}></img>
        <h1 className='h1HomePage'>House Helper</h1> 
        <br></br>
        <h2 className='h2HomePage'>An App for Home Bliss!</h2>
      </div> 
      <div className='righthand'>

        <Login /> 
      </div> 
             
            
    </div>
  );
};

export default EntryPage;
