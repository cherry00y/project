import React from 'react';
import Navbar from '../components/Navbar';
import { MenuItems } from '../components/MenuItems';
import './StatisticsStyles.css'

function Statistics(){
    return(
        <>
        <Navbar MenuItems={MenuItems}/>
        <div className='info-text-statistics'>
            <h3>วิเคราะห์ผู้เข้าชมเว็บไซต์</h3>
        </div>
        </>
    )
}
export default Statistics;