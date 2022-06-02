import React from 'react';
import Card from './Card/Card';
import './Cards.css';
import image from '../../../images/Loading.gif';


export default function Cards({allVideogames}){
    //console.log(allVideogames);
    return (
        <div className='cards'>
            {allVideogames.length !== 0 ? allVideogames.map(videogame => (
                <Card
                    key={videogame.id}
                    rating={videogame.rating}
                    id={videogame.id}
                    image={videogame.image}
                    name={videogame.name}
                    genres={videogame.genres}
                />
            )):
            <div>
                <h1>Todavía no hay nada por aquí... tomate un mate o una cerveza y esperá...🧉🍻</h1>
                <img src={image} alt="Img" />
            </div>
            }
        </div>
    )
}