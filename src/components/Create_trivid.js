import React from "react";
import Navbar from './Navbar';
import { MenuItems } from './MenuItems';
import './CreateStyles.css'

function CreateTrivia(){
    return(
        <>
        <Navbar MenuItems={MenuItems}/>
        <div className='create-info'>
            <h3>Create Infomation</h3>
        </div>
        <div className='info-pormo-text'>
            <h1>การซักและอบผ้า</h1>
        </div>  
        <div className="title-container">
            <div className="title-text">
                <h2>wonder why wonder wash</h2>
            </div>
            
            <form>
                <div className="row1">
                    <div className="input-group">
                        <lable for="title-infomation">หัวข้อการซักและอบผ้า</lable>
                        <input type="text" id="title-infomation"  placeholder="การซักและอบผ้า"/>  
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
                        <input type="file" id="picture" required/>
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
export default CreateTrivia;