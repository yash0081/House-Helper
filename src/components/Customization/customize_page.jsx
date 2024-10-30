import React, { useState } from 'react';
import { database } from '../../firebase/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, set } from "firebase/database";
import Select from 'react-select';
import '../../styles/styles.css'

const Customization = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');


  const roleOptions = [
    { value: 'driver', label: 'Driver' },
    { value: 'maid', label: 'Maid' },
    { value: 'seeker', label: 'Seeker' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer not to say', label: 'Prefer Not to Say' },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if ((role === 'driver' || role === 'maid') && skills.length === 0) {
      alert('Please select at least one skill!');
      return;
    }

    saveFormDataToDatabase(userId);
    redirectToHomePage(userId, role);
    e.target.reset();
  };

  const saveFormDataToDatabase = (userId) => {
    
    set(ref(database, 'users/' + userId), {
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
      rating: 0,
      reviewsNum: 0
    }).catch((error) => {
        console.log(error);
    });
  };

  const redirectToHomePage = (userId, role) => {
    if (role === "maid" || role === "driver") {
      navigate(`/WorkerHomePage/${userId}`);
    } else if (role === "seeker") {
      navigate(`/SeekerHomePage/${userId}`);
    }
  };

  return (
    <div className='container'>
      <div className='lefthand'>
        <h1 className='customizeh1'>Customize your Profile!</h1>
      </div>
      <div className='righthand'>
  
      <form onSubmit={handleFormSubmit} className={`customizeForm${role}`}>

          <div className='form-group'>
            <label>
            <Select
                value={roleOptions.find((option) => option.value === role)}
                onChange={(selectedOption) => setRole(selectedOption.value)}
                options={roleOptions}
                className='customizeLoginInput'
                isSearchable={false}
                menuPortalTarget={document.body}
                placeholder="Select Role"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: '100%',
                  }),
                }}
              />
            </label>
          </div>
          {role === 'seeker' && (
            <div>
              <div className='form-group'>
                <label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name'
                    required
                    className='customizeLoginInput'
                  />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <Select
                    value={genderOptions.find((option) => option.value === gender)}
                    onChange={(selectedOption) => setGender(selectedOption.value)}
                    options={genderOptions}
                    className='customizeLoginInput'
                    isSearchable={false}
                    menuPortalTarget={document.body}
                    placeholder="Select Gender"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        width: '100%',
                      }),
                    }}
                  />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' required className='customizeLoginInput' />
                </label>
              </div>
            </div>
          )}
          {role === 'maid' && (
            <div>
              <div className='form-group'>
                <label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name'
                    required
                    className='customizeLoginInput'
                  />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <Select
                    value={genderOptions.find((option) => option.value === gender)}
                    onChange={(selectedOption) => setGender(selectedOption.value)}
                    options={genderOptions}
                    className='customizeLoginInput'
                    isSearchable={false}
                    menuPortalTarget={document.body}
                    placeholder="Select Gender"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        width: '100%',
                      }),
                    }}
                  />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' required className='customizeLoginInput' />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' required className='customizeLoginInput' />
                </label>
              </div>
              <div className='form-group'>
                <label>
                <Select
                isMulti
                value={skills.map(skill => ({ value: skill, label: skill }))}
                onChange={(selectedOptions) => setSkills(selectedOptions.map(option => option.value))}
                options={[
                { value: 'cleaning', label: 'Cleaning' },
                { value: 'cooking', label: 'Cooking' },
                { value: 'laundry', label: 'Laundry' },
                { value: 'child-care', label: 'Child Care' },
                ]}
                className='customizeLoginInput'
                isSearchable={false}
                menuPortalTarget={document.body}
                placeholder="Select Skills"
                styles={{
                control: (provided) => ({
                ...provided,
                width: '100%',
                }),
                }}
                />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder='Experience (in years)' required className='customizeLoginInput' />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder='Expected Monthly Salary' required className='customizeLoginInput' />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' className='customizeLoginInput' />
                </label>
              </div>
            </div>
          )}
          {role === 'driver' && (
            <div>
              <div className='form-group'>
                <label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required className='customizeLoginInput' />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <Select
                    value={genderOptions.find((option) => option.value === gender)}
                    onChange={(selectedOption) => setGender(selectedOption.value)}
                    options={genderOptions}
                    className='customizeLoginInput'
                    isSearchable={false}
                    menuPortalTarget={document.body}
                    placeholder="Select Gender"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        width: '100%',
                      }),
                    }}
                  />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' required className='customizeLoginInput' />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' required className='customizeLoginInput' />
                </label>
              </div>
              <div className='form-group'>
                <label>
                <Select
                isMulti
                value={skills.map(skill => ({ value: skill, label: skill }))}
                onChange={(selectedOptions) => setSkills(selectedOptions.map(option => option.value))}
                options={[
               { value: 'driving', label: 'Driving' },
               { value: 'maintenance', label: 'Maintenance' },
               { value: 'route-navigation', label: 'Route Navigation' },
               { value: 'customer-service', label: 'Customer Service' },
               ]}
               className='customizeLoginInput'
               isSearchable={false}
               menuPortalTarget={document.body}
               placeholder="Select Skills"
               styles={{
               control: (provided) => ({
              ...provided,
              width: '100%',
              }),
              }}
              />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder='Experience (in years)' required className='customizeLoginInput' />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder='Expected Monthly Salary' required className='customizeLoginInput' />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' className='customizeLoginInput' />
                </label>
              </div>
            </div>
          )}
          <button type="submit" className='loginButton'>Save</button>
        </form>
      </div>
    </div>
  );
};

export default Customization;
