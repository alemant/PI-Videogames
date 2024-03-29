import React from 'react';
import Card from './Card/Card';
import './Cards.css';
import Charging from './../../Charging.jsx';

export default function Cards({allVideogames}){
    //console.log(allVideogames);
    return (
        <div className='cards'>
            {allVideogames.length !== 0 ? allVideogames.map((videogame, i) => (
                <Card
                    key={i}
                    rating={videogame.rating}
                    id={videogame.id}
                    image={videogame.image}
                    name={videogame.name}
                    genres={videogame.genres}
                />
            )):
            <div className="container">
                <Charging />
            </div>
            }
        </div>
    )
}