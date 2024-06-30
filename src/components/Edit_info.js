import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import { MenuItems } from './MenuItems';
import './CreateStyles.css'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [pic, setPic] = useState('');
    const [originalPic, setOriginalPic] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3003/information/${id}`)
            .then(response => {
                const info = response.data;
                setTitle(info.title);
                setDetail(info.detail);
                setPic(info.base64Image);
                setOriginalPic(info.picture); // ตั้งค่าชื่อไฟล์ต้นฉบับ
                setType(info.type);
            })
            .catch(error => {
                console.error('Error fetching information:', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('detail', detail);
        if (pic instanceof File) {
            formData.append('pic', pic);
        }
        formData.append('type', type);

        axios.put(`http://localhost:3003/information/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log('Information updated successfully:', response.data);
            navigate('/infomation/promotion');
        })
        .catch(error => {
            console.error('Error updating information:', error);
        });
    };

    return (
        <>
            <Navbar MenuItems={MenuItems} />
            <div className='create-info'>
                <h3>Edit Information</h3>
            </div>
            <div className='info-promo-text'>
                <h1>Information & Promotion</h1>
            </div>  
            <div className="title-container">
                <div className="title-text">
                    <h2>wonder why wonder wash</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row1">
                        <div className="input-group">
                            <label htmlFor="title-information">หัวข้อข่าวสาร</label>
                            <input 
                                type="text" 
                                id="title-information" 
                                placeholder="ข่าวสาร & โปรโมชั่น" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                            />  
                        </div>
                        <div className="input-group">
                            <label htmlFor="detail">รายละเอียด</label>
                            <input 
                                id="detail" 
                                placeholder="รายละเอียด" 
                                value={detail} 
                                onChange={(e) => setDetail(e.target.value)} 
                            />  
                        </div>
                    </div>
                    <div className="row2">
                        <div className="input-group">
                            <label htmlFor="picture">รูปภาพ</label>
                            {pic && (
                                <div>
                                    <img src={`data:image/jpeg;base64,${pic}`} alt="Current" width="100" height="100" />
                                </div>
                            )}
                            <input 
                                type="text" 
                                value={originalPic} 
                                disabled 
                            />
                            <input 
                                type="file" 
                                id="picture" 
                                accept="image/*" 
                                onChange={(e) => setPic(e.target.files[0])} 
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
                                checked={type === 'promotion and information'}
                                onChange={(e) => setType(e.target.value)}
                            />
                            <label htmlFor="promotion">promotion and information</label>
                            <input 
                                type="radio" 
                                id="trivia" 
                                name="type" 
                                value="trivia"
                                checked={type === 'trivia'}
                                onChange={(e) => setType(e.target.value)}
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

export default EditInfo;
