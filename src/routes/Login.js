import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }

    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('/signup')
    }
    
    const homeClick = () =>{
        navigate('/home')
    }

  return (
    <div className='container'>
      <div className='image-section'>
        <img src='https://i.pinimg.com/564x/ae/bf/3c/aebf3cad3329c22060877f1c52682c52.jpg' className='image' alt='Laundry Room' />
      </div>
      <div className='form-section'>
        <div className='form-container'>
          <h1>Welcome Back!</h1>
          <p>Don't have an account, <h4 onClick={handleClick}>Sign up</h4></p>
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
            
            <div className='remember-me'>
                <div className='remember-me-check-text'>
                    <input type='checkbox' id='remember' name='remember'/>
                    <p htmlFor='remember'>Remember me</p>
                </div>
              
              <p className='forget-password'>Forget password?</p>
            </div>
            
            <button type='submit' className='sign-in-button' onClick={homeClick}>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
