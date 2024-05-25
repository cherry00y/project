import React,{ useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import './Login.css';

function Signup(){
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }

    return(
        <div className='container'>
      <div className='image-section'>
        <img src='https://i.pinimg.com/564x/ae/bf/3c/aebf3cad3329c22060877f1c52682c52.jpg' className='image' alt='Laundry Room' />
      </div>
      <div className='form-section'>
        <div className='form-container'>
          <h1>Sign up!</h1>
          <form>
            <label htmlFor='username'>Username</label>
            <input type='email' id='username' name='username' placeholder='deniel123@gmail.com' required />
            
            <label htmlFor='password'>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='••••••••'
                required
              />
              <i
                className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            <label htmlFor='password'>Confirm Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
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
    )
}

export default Signup;