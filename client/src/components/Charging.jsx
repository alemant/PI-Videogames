import React from 'react';
import load from '../images/load.gif';
import './Charging.css';

export default function Charging() {
    return (
        <div className='charg'>
            <img src={load} alt="loading" width="750px" height="750px" />
        </div>
    )
}
