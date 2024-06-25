import React, { useState } from "react";
import Navbar from './Navbar';
import { MenuItems } from './MenuItems';
import './CreateStyles.css'

function CreateInfo(){
    const [formData, setFormData] = useState({
        title: '',
        detail: '',
        date: '',
        pic: null,
        type: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            pic: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const data = new FormData();
        data.append('title', formData.title);
        data.append('detail', formData.detail);
        data.append('date', formData.date);
        data.append('pic', formData.pic);
        data.append('type', formData.type);
      
        try {
            const response = await fetch('http://localhost:3006/information', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: data
            });
      
            if (response.ok) {
                alert('Information added successfully');
            } else {
                const errorData = await response.json(); // Parse error response if available
                alert(`Failed to add information: ${errorData.message || 'Unknown error'}`); // Display specific error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding information');
        }
    };
    return(
        <>
        <Navbar MenuItems={MenuItems}/>
        <div className='create-info'>
            <h3>Create Infomation</h3>
        </div>
        <div className='info-pormo-text'>
            <h1>infomation & promotion</h1>
        </div>  
        <div className="title-container">
            <div className="title-text">
                <h2>wonder why wonder wash</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="row1">
                    <div className="input-group">
                        <lable for="title-infomation">หัวข้อข่าวสาร</lable>
                        <input 
                        type="text" 
                        id="title-infomation" 
                        name="title"
                        value={formData.title} 
                        onChange={handleChange}
                        placeholder="ข่าวสาร & โปรโมชั่น"
                        required
                        /> 
                    </div>
                    <div className="input-group">
                        <lable for="detail">รายละเอียด</lable>
                        <input 
                        type="text" 
                        id="detail" 
                        name="detail"
                        value={formData.detail}
                        onChange={handleChange}
                        placeholder="รายละเอียด"
                        required
                        />  
                    </div>
                </div>
                <div className="row2">
                    <div className="input-group">
                        <lable htmlFor="date">วันที่เพิ่ม</lable>
                        <input 
                        type="date" 
                        id="date" 
                        name="date"
                        value={formData.data}
                        onChange={handleChange}
                        required/>
                    </div>
                    <div className="input-group">
                        <lable htmlFor="picture">รูปภาพ</lable>
                        <input 
                        type="file" 
                        id="picture" 
                        name="pic"
                        onChange={handleFileChange}
                        placeholder="รูปภาพ"/>
                    </div>
                </div>
                <div class="type-box">
                    <h3>Type</h3>
                    <div class="type">
                        <input 
                        type="radio" 
                        id="promotion" 
                        name="type" 
                        value="promotion and information"
                        checked={formData.type === 'promotion and information'}
                        onChange={handleChange}
                        />
                        <label for="promotion">promotion and information</label>
                        <input 
                        type="radio" 
                        id="trivia" 
                        name="type" 
                        value="trivia"
                        checked={formData.type === 'trivia'}
                        onChange={handleChange}
                        />
                        <label for="trivia">trivia</label>
                    </div>
                </div>
                
                <div className="button-container">
                <button className="button">เพิ่มข้อมูล</button>
                </div>
            </form>
        </div>
        </>
    )
}
export default CreateInfo;