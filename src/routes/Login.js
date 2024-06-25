import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleClick = () => {
        navigate('/signup');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3006/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/home');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className='container'>
            <div className='image-section'>
                <img src='https://i.pinimg.com/564x/ae/bf/3c/aebf3cad3329c22060877f1c52682c52.jpg' className='image' alt='Laundry Room' />
            </div>
            <div className='form-section'>
                <div className='form-container'>
                    <h1>Welcome Back!</h1>
                    <p>Don't have an account? <h4 onClick={handleClick}>Sign up</h4></p>
                    {error && <p className='error-message'>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='email'
                            id='username'
                            name='username'
                            placeholder='deniel123@gmail.com'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        
                        <label htmlFor='password'>Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                placeholder='••••••••'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        
                        <button type='submit' className='sign-in-button'>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
