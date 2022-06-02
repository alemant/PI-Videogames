import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(){
    return (
        <div className = 'landing'>
            <h1>Videogames App</h1>
            <Link to = './home'>
                <button>Enter</button>
            </Link>
        </div>
    )
};