import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideogameById } from '../../actions';



export default function Detail(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const details = useSelector(state => state.details);
    const [, setState] = useState('')

    const { name, image, description, genres, platforms, rating, released } = details;
    useEffect(() => {
        dispatch(getVideogameById(id))
        setState('')
    }, [dispatch, id]);

    return (
        <div>
            <h3>
                <a href="http://localhost:3000/home">To home</a>
            </h3>
            <h1>{name}</h1>
            <h4>Release Date: {released}</h4>
            <h4>Rating: {rating}</h4>
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
                <img className='image' src={image} alt="Img not available" width="300px" height="300px"/>
            </div>
            <h4>Description: {description}</h4>
            <div> <h2>Platforms</h2>
                {platforms?.map(t => {
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
        </div>
    )
}