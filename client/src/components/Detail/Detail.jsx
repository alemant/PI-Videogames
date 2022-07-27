import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideogameById } from '../../actions';
import './Detail.css';


//-----------------------------------------------------------
import Charging from '../Charging';
//-----------------------------------------------------------

const img = "https://c.tenor.com/uGk2oPRstsEAAAAC/spiderman-fight.gif";
export default function Detail(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const details = useSelector(state => state.details);

    const { name, image, description, genres, platforms, rating, released } = details;
    useEffect(() => {
        dispatch(getVideogameById(id))
    }, [dispatch, id]);

    return (
        <div className="body1">
            <div className="separate">
                <h3>
                    <a className="tohome" href="/home">To home</a>
                </h3>
            </div>
            {details.name ? (
                <div>
                    <div className='head'>
                        <div className='box1'>
                            <h1 className='name'>{name}</h1>
                        </div>
                        <h3 className='release'>Release Date: {released}</h3>
                        <h3 className='rating'>Rating: {rating}</h3>
                    </div>
                    <div className='box2'>
                        <div className='image'>
                            <img className='imgn' src={image ? image : img} alt="Imagen de videogame" />
                        </div>
                        <div className='class'>
                            <h3 className='type'>Genres:</h3>
                            <div>
                                {genres?.map(t => {
                                    if(typeof(t) === 'string'){
                                        return (
                                        <div key={t}>
                                            <span className="type">
                                                {t.replace(t[0], t[0].toUpperCase())}
                                            </span>
                                        </div>
                                    )}
                                    else{
                                        return (
                                            <div key={t.name}>
                                                <span>
                                                    {t.name}
                                                </span>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <div>
                                <h3 className='type'>Platforms</h3>
                                {platforms?.map(t => {
                                    if (typeof (t) === 'string') {
                                        return (
                                            <div key={t}>
                                                <span className="type">
                                                    {t.replace(t[0], t[0].toUpperCase())}
                                                </span>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={t.name}>
                                                <span>
                                                    {t.name}
                                                </span>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        <div className='class'>
                            <h3>Description: </h3>
                            <span>{description}</span>
                        </div>
                    </div>
                </div>
            ) :
            <div>
                    <Charging/>
            </div>}
        </div>
    )
}