import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { MenuItems } from './MenuItems';
import './CreateStyles.css';
import e from "express";

function CreateTrivia() {
    const handleSubmit = event =>  {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "title": title,
        "detail": detail,
        "date": date,
        "pic": picture,
        "type": type,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3010/information", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['massage'])
            if (result['status'] === 'Ok')
            window.location.href = "/infomation/trivia"
        })
        .catch(error => console.log('error', error));

    }

    const [title, settitle] = useState('');
    const [detail, setdetail] = useState('');
    const [date, setdate] = useState('')
    const [picture, setpic] = useState('')
    const [type, settype] = useState('');

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
                                onChange={(e) => setpic(e.target.value)}
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
