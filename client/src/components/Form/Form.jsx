import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getGenres, getVideogames, postVideogame } from "../../actions";
import { Link, useHistory } from "react-router-dom";

function validate(input){
    let noEmpty = /\S+/;
    let validateName = /^.{5,15}$/;
    let errors = {};
    if(!input.name){
        errors.name = 'The name is required';
    }
    else if(!noEmpty.test(input.name)){
        errors.name = 'The name cannot start with a blank space';
    }
    else if(!validateName.test(input.name)){
        errors.name = 'The name must be between 5 and 15 characters long';
    }
    else if(!input.description){
        errors.description = 'Description is required';
    }
    else if(!noEmpty){
        errors.description = "Description cannot start with a blank space"
    }
    else if(!(/^.{5,300}$/).test(input.description)){
        errors.description = 'This field must be between 5 and 300 characters long'
    }
    else if(!input.released || input.released > new Date()){
        errors.released = 'Date is required and must be in the past';
    }
    else if(!input.rating){
        errors.rating = 'Rating is required';
    }
    else if(input.rating <= 0 || input.rating > 5){
        errors.rating = 'Rating must be between 0 and 5';
    }
    else if(!(/^\d*(\.\d{1})?\d{0,1}$/).test(input.rating)){
        errors.rating = 'Rating must have only 2 decimal places'
    }
    if(input.genres.length === 0){
        errors.genres = 'At least one genre is required'
    }
    else if(input.genres.length > 3){
        errors.genres = 'You can only choose 3 genres per game';
    }
    else if(input.platforms.length === 0){
        errors.platforms = 'At least one platform is required'
    }
    else if(input.platforms.length > 3){
        errors.platforms = 'You can only choose 3 platforms per game'
    }
    return errors;
}


export default function Form(){
    const dispatch = useDispatch();
    const allGenres = useSelector(state => state.genres);
    let allVideogames = useSelector(state => state.videogames);
    allVideogames = (allVideogames.map((e, i) => e.platforms)).join(',').split(',');
    allVideogames = [...new Set(allVideogames)].map((e,i) => ({'name':e, 'id':i}))
    
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
    },[dispatch])
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
        image: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(input);
        dispatch(postVideogame(input))
        alert(`Tu videojuego fue creado!`)
        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            genres: [],
            platforms: [],
            image: ""
        })
        history.push('/home', console.log('hola'))
    }

    function handleChange (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleGenresSelect (e) {
        if(e.target.checked){
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
            setErrors(validate({
                ...input,
                genres: [...input.genres, e.target.value]
            }))
        }else{
            let filt = [...input.genres];
            filt.splice(filt.indexOf(e.target.value), 1);
            setInput({
                ...input,
                genres: filt
            })
            setErrors(validate({
                ...input,
                genres: filt
            }))
        }
    }
    function handlePlatformsSelect (e) {
        if(e.target.checked){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
            setErrors(validate({
                ...input,
                platforms: [...input.platforms, e.target.value]
            }))
        }else{
            let filt = [...input.platforms];
            filt.splice(filt.indexOf(e.target.value), 1);
            setInput({
                ...input,
                platforms: filt
            })
            setErrors(validate({
                ...input,
                platforms: filt
            }))
        }
    }

    return (
        <div>
            <div>
                <Link to='/home'>
                    <button>To Home</button>
                </Link>
            </div>
            <h1>Videogame Factory</h1>
            <hr />
            <br />
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Videogame name: </label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={e => handleChange(e)}
                        //required
                    />
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>
                <br />
                <div>
                    <label>Description: </label>
                    <input
                        className="error"
                        type="text"
                        name="description"
                        value={input.description}
                        onChange={e => handleChange(e)}
                    />
                    {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
                </div>
                <br />
                <div>
                    <label>Image</label>
                    <input
                        type='text'
                        name='image'
                        value={input.image}
                        onChange={e => handleChange(e)}
                        >
                    </input>
                </div>
                <div>
                    <label>Released: </label>
                    <input
                        type="date"
                        name="released"
                        value={input.released}
                        onChange={e => handleChange(e)}
                        max={new Date().toISOString().split('T')[0]}
                    />
                    {errors.released && <p style={{ color: "red" }}>{errors.released}</p>}
                </div>
                <br />
                <div>
                    <label>Rating: </label>
                    <input
                        type="number"
                        step={0.01}
                        name="rating"
                        value={input.rating}
                        onChange={e => handleChange(e)}
                    />
                    {errors.rating && <p style={{ color: "red" }}>{errors.rating}</p>}
                </div>
                <br />
                <div>
                    <div>
                        <label>Genres: </label>
                    </div>
                    <br />
                    <div>
                        {allGenres.map((genres, i) => {
                            return (
                                <div key= {i}>
                                    <input
                                        id={i}
                                        name={genres.name}
                                        type="checkbox" 
                                        value={genres.name}
                                        onChange={(e) => handleGenresSelect(e)}
                                    />
                                    <label>{genres.name}</label>
                                </div>
                            )
                        })}
                        {errors.genres && <p style={{ color: "red" }}>{errors.genres}</p>}
                    </div>
                </div>
                <br />
                <div>
                    <div>
                        <label>Platforms: </label>
                    </div>
                    <br />
                    <div>
                        {allVideogames.map(platf =>{
                            return (
                                <div key={platf.id}>
                                    <input
                                        key={platf.id}
                                        name={platf.name}
                                        type="checkbox"
                                        value={platf.name}
                                        // onChange={e => handleSelectPlatforms(e)}
                                        //disabled={input.platforms.length >= 3}
                                        onChange={(e) => handlePlatformsSelect(e)}
                                    />
                                    <label>{platf.name}</label>
                                </div>
                            )
                        })}
                        {errors.platforms && <p style={{ color: "red" }}>{errors.platforms}</p>}
                    </div>
                </div>
                <hr />
                <div>
                    <input
                        type="submit"
                        value={input.created}
                        disabled={Object.keys(errors).length > 0 ||
                            input.name === "" ||
                            input.description === "" ||
                            input.released === "" ||
                            input.rating === "" ||
                            input.genres.length === 0 ||
                            input.platforms.length === 0}
                        />
                </div>
            </form>
        </div>
    )
}