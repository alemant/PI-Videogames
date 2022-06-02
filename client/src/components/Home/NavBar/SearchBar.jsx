import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogameByNames } from '../../../actions/index.js';

export default function SearchBar(){  
    const [name, setName] = useState('')
    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getVideogameByNames(name))
        setName('')
    };

    function handleKeyPress(e){
        if(e.key === 'Enter'){
            handleSubmit(e);
        }
    }

    return (
        <div>
            <div>
                <h1 className='h1'>Videogames App</h1>
                <input
                    type="text"
                    placeholder="Videogame search..."
                    value={name}
                    onChange={e => handleOnChange(e)}
                    onKeyPress={e => handleKeyPress(e)}
                />
                <button 
                type="submit"
                onClick={e => handleSubmit(e)}
                >Search</button>
            </div>
        </div>
    )
};