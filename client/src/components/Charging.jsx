import React from 'react';
import load from '../images/Loading6.gif';
import './Charging.css';

export default function Charging() {
    return (
        <div className='charg'>
            <img src={load} alt="loading" width="850px" height="850px" />
        </div>
    )
}
