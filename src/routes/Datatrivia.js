import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { MenuItems } from '../components/MenuItems';
import './DataStyles.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function Datatrivia() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/create/trivia');
    };

    const editClick = (id) => {
        console.log("Navigating to edit page with ID:", id);
        navigate(`/edit/trivia/${id}`);
    };

    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3006/trivia')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data); // Add this line for debugging
                setNews(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
            <Navbar MenuItems={MenuItems} />
            <div className='info-text'>
                <h2>Infomation</h2>
            </div>
            <div className='info-pormo-text'>
                <h1>การซักและอบผ้า</h1>
                <button className='button-add' onClick={handleClick}>Create Infomation</button>
            </div>
            <div className='container-data'>
                {news.map(item => (
                    <div key={item.id} className='box'>
                        <div className='content'>
                            <div className='detail'>
                                <div className='info'>
                                    <h1>{item.title}</h1>
                                    <p>{item.detail}</p>
                                </div>
                            </div>
                            <p>
                                {new Date(item.date).toLocaleDateString('th-TH')}
                                <FontAwesomeIcon icon={faPenToSquare} onClick={() => editClick(item.id)} />
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Datatrivia;
