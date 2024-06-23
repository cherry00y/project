import React from "react";
import Navbar from './Navbar';
import { MenuItems } from './MenuItems';
import './CreateStyles.css'

function CreateInfo(){
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
            
            <form>
                <div className="row1">
                    <div className="input-group">
                        <lable for="title-infomation">หัวข้อข่าวสาร</lable>
                        <input type="text" id="title-infomation"  placeholder="ข่าวสาร & โปรโมชั่น"/>  
                    </div>
                    <div className="input-group">
                        <lable for="detail">รายละเอียด</lable>
                        <input type="text" id="detail" placeholder="รายละเอียด"/>  
                    </div>
                </div>
                <div className="row2">
                    <div className="input-group">
                        <lable htmlFor="date">วันที่เพิ่ม</lable>
                        <input type="date" id="date" required/>
                    </div>
                    <div className="input-group">
                        <lable htmlFor="picture">รูปภาพ</lable>
                        <input type="file" id="picture" placeholder="รูปภาพ"/>
                    </div>
                </div>
                <div class="type-box">
                    <h3>Type</h3>
                    <div class="type">
                        <input type="radio" id="promotion" name="type" value="promotion and information"/>
                        <label for="promotion">promotion and information</label>
                        <input type="radio" id="trivia" name="type" value="trivia"/>
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