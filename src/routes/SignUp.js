import React, { useState } from 'react';
import './Login.css';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    username: '',
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3006/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // Signup successful, handle success (e.g., redirect to login page)
      alert('Information added successfully');
      console.log('Signup successful!');
      navigator('/');
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error('Signup failed:', error.message);
      // Handle error, e.g., display error message to user
    }
  }

  return (
    <div className='container'>
      <div className='image-section'>
        <img src='https://i.pinimg.com/564x/ae/bf/3c/aebf3cad3329c22060877f1c52682c52.jpg' className='image' alt='Laundry Room' />
      </div>
      <div className='form-section'>
        <div className='form-container'>
          <h1>Sign up!</h1>
          <form onSubmit={handleSignup}>
            <div className="column">
              <div className="input-box">
                <label>First Name</label>
                <input 
                  type='text'
                  name='fname'
                  value={formData.fname}
                  onChange={handleInputChange}
                  placeholder='Enter firstname' 
                  required />
              </div>
              <div className="input-box">
                <label>Last Name</label>
                <input 
                type='text' 
                name='lname'
                value={formData.lname}
                onChange={handleInputChange}
                placeholder='Enter lastname' 
                required />
              </div>
            </div>
            <label htmlFor='phone'>Number</label>
            <input 
              type='text' 
              id='phone' 
              name='phone' 
              value={formData.phone}
              onChange={handleInputChange}
              placeholder='000-000-0000' 
              required />

            <label htmlFor='username'>Username</label>
            <input 
              type='email' 
              d='username' 
              name='username' 
              value={formData.username}
              onChange={handleInputChange}
              placeholder='deniel123@gmail.com' 
              required />
            
            <label htmlFor='password'>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                placeholder='••••••••'
                required
              />
              <i
                className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <button type='submit' className='sign-in-button'>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
