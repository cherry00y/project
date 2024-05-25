import React from 'react';
import Navbar from '../components/Navbar';
import { MenuItems } from '../components/MenuItems';
import { useNavigate } from 'react-router-dom';
import "./HomeStyles.css";

function Home(){
    return(
        <>
        <Navbar MenuItems={MenuItems}/>
        <div className='centered-image'>
            <img src='https://i.pinimg.com/564x/ae/bf/3c/aebf3cad3329c22060877f1c52682c52.jpg'/>
            <div className='image-text'>
                <h3>Welcome to wonder why wonder wash</h3>
                <hr className="separator"/>
                <h1>The sky is the limit</h1>
            </div>
        </div>
        
        </>
    )
}
export default Home;