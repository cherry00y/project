import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { MenuItems } from './MenuItems';
import './CreateStyles.css';
import e from "express";

function CreateTrivia() {
    const navigate = useNavigate();

    const handleSubmit = event =>  {
        event.preventDefault();
        
        // Create FormData object to send mixed content (JSON + file)
        const formData = new FormData();
        formData.append("title", title);
        formData.append("detail", detail);
        formData.append("date", date);
        formData.append("type", type);
        formData.append("pic", picture); // Append the selected file
        
        var requestOptions = {
            method: 'POST',
            body: formData,
        };

        fetch("http://localhost:3010/information", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['message']); // Corrected 'message' spelling
            if (result['status'] === 'Ok')
                navigate("/infomation/trivia"); // Use navigate function instead of direct window.location
        })
        .catch(error => console.log('error', error));
    }

    const [title, settitle] = useState('');
    const [detail, setdetail] = useState('');
    const [date, setdate] = useState('');
    const [picture, setpic] = useState(null); // Use null for initial state of file
    const [type, settype] = useState('');

    const handleFileChange = event => {
        setpic(event.target.files[0]); // Set the selected file to state
    }

    return (
        <>
            <Navbar MenuItems={MenuItems} />
            <div className='create-info'>
                <h3>Create Information</h3>
            </div>
            <div className='info-pormo-text'>
                <h1>การซักและอบผ้า</h1>
            </div>
            <div className="title-container">
                <div className="title-text">
                    <h2>wonder why wonder wash</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row1">
                        <div className="input-group">
                            <label htmlFor="title-infomation">หัวข้อการซักและอบผ้า</label>
                            <input
                                type="text"
                                id="title-infomation"
                                name="title"
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                                placeholder="การซักและอบผ้า"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="detail">รายละเอียด</label>
                            <input
                                type="text"
                                id="detail"
                                name="detail"
                                value={detail}
                                onChange={(e) => setdetail(e.target.value)}
                                placeholder="รายละเอียด"
                                required
                            />
                        </div>
                    </div>
                    <div className="row2">
                        <div className="input-group">
                            <label htmlFor="date">วันที่เพิ่ม</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={date}
                                onChange={(e) => setdate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="picture">รูปภาพ</label>
                            <input
                                type="file"
                                id="picture"
                                name="pic"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="type-box">
                        <h3>Type</h3>
                        <div className="type">
                            <input
                                type="radio"
                                id="promotion"
                                name="type"
                                value="promotion and information"
                                onChange={(e) => settype(e.target.value)}
                            />
                            <label htmlFor="promotion">promotion and information</label>
                            <input
                                type="radio"
                                id="trivia"
                                name="type"
                                value="trivia"
                                onChange={(e) => settype(e.target.value)}
                            />
                            <label htmlFor="trivia">trivia</label>
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="button" type="submit">เพิ่มข้อมูล</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateTrivia;
