import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getGenres, getVideogames, postVideogame } from "../../actions";
import { Link, useHistory } from "react-router-dom";
import './Form.css';
import logo from '../../images/logo.png';

function validate(input){
    let expresion = /\.(gif|jpg|jpeg|png)$/;
    let noEmpty = /\S+/;
    let validateName = /^.{5,15}$/;
    let errors = {};
    
    if(!input.name){
        errors.name = 'Please, name is required';
    }
    else if(!noEmpty.test(input.name)){
        errors.name = 'Please, the name cannot start with a blank space';
    }
    else if(!validateName.test(input.name)){
        errors.name = 'Please, the name must be between 5 and 15 characters long';
    }
    else if(!input.description){
        errors.description = 'Please, description is required';
    }
    else if(!noEmpty){
        errors.description = "Please, description cannot start with a blank space"
    }
    else if(!(/^.{5,300}$/).test(input.description)){
        errors.description = 'Please, this field must be between 5 and 300 characters long'
    }
    else if(!input.released || input.released > new Date()){
        errors.released = 'Please, date is required and must be in the past';
    }
    else if(!input.rating){
        errors.rating = 'Please, rating is required';
    }
    else if(input.rating <= 0 || input.rating > 5){
        errors.rating = 'Please, rating must be between 0 and 5';
    }
    else if(!(/^\d*(\.\d{1})?\d{0,1}$/).test(input.rating)){
        errors.rating = 'Please, rating must have only 2 decimal places'
    }
    else if(input.genres.length === 0){
        errors.genres = 'Please, at least one genre is required'
    }
    else if(input.genres.length > 3){
        errors.genres = 'You can only choose 3 genres per game';
    }
    else if(input.platforms.length === 0){
        errors.platforms = 'Please, at least one platform is required'
    }
    else if(input.platforms.length > 3){
        errors.platforms = 'You can only choose 3 platforms per game'
    }
    else if(! expresion.test(input.image)){
        input.image && (errors.image = 'Please, this field must be a valid URL');
    }
    return errors;
}


export default function Form(){
    const dispatch = useDispatch();
    const allGenres = useSelector(state => state.genres);
    let allVideogames = useSelector(state => state.allVideogames);
    let platform = (allVideogames.map((e) => e.platforms))
    let allPlatf = [...new Set(platform.flat())].sort();
    if(allPlatf.length > 19){
        allPlatf.pop()
    }
    
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

    // function handleDelete(c) {
    //     setInput({
    //         ...input,
    //         genres: input.genres.filter(f => f !== c)
    //     })
    // }

    return (
        <div className="form">
            <div>
                <Link to='/home'>
                    <button className="tohome">To Home</button>
                </Link>
            </div>
            <h1 className="fact">Videogame Factory</h1>
            <br />
            <form onSubmit={e => handleSubmit(e)}>
                <div className="one">
                    <div>
                        <label className="title">Name: </label>
                        <input
                            className="inputext"
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
                        <label className="title">Description: </label>
                        <input
                            className="inputext"
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={e => handleChange(e)}
                        />
                        {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
                    </div>
                    <br />
                    <div>
                        <label className="title">Image: </label>
                        <input
                            className="inputext"
                            type='text'
                            name='image'
                            value={input.image}
                            onChange={e => handleChange(e)}
                        />
                        {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
                    </div>
                    <div>
                        <label className="title">Released: </label>
                        <input
                            className="inputext"
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
                        <label className="title">Rating: </label>
                        <input
                            className="inputext"
                            type="number"
                            step={0.1}
                            name="rating"
                            value={input.rating}
                            onChange={e => handleChange(e)}
                        />
                        {errors.rating && <p style={{ color: "red" }}>{errors.rating}</p>}
                    </div>
                </div>
                <br />
                <div className="genplat">
                    <div className="genre">
                        <div>
                            <label className="title">Genres: </label>
                        </div>
                        <br />
                        <div>
                            {allGenres.map((genres, i) => {
                                return (
                                    <div key= {i}>
                                        <input
                                            className="check"
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
                    <div className="platform">
                        <div>
                            <label className="title">Platforms: </label>
                        </div>
                        <br />
                        <div>
                            {allPlatf.map(platf =>{
                                return (
                                    <div key={platf}>
                                        <input
                                            className="check"
                                            key={platf}
                                            name={platf}
                                            type="checkbox"
                                            value={platf}
                                            //disabled={input.platforms.length >= 3}
                                            onChange={(e) => handlePlatformsSelect(e)}
                                        />
                                        <label>{platf}</label>
                                    </div>
                                )
                            })}
                            {errors.platforms && <p style={{ color: "red" }}>{errors.platforms}</p>}
                        </div>
                    </div>
                    <div>
                        <input
                            className="submit"
                            type="submit"
                            // value={input.created}
                            value="Create"
                            disabled={Object.keys(errors).length > 0 ||
                                input.name === "" ||
                                input.description === "" ||
                                input.released === "" ||
                                input.rating === "" ||
                                input.genres.length === 0 ||
                                input.platforms.length === 0}
                        />
                    </div>
                    <div className="creation"><h3>Your videogame:</h3>
                        {/* ------------------------------------------------------------ */}
                        {
                            input.name ? <div className="sub">Name:   <span>{input.name}</span></div> : <></>
                        }
                        {
                            input.description ? <div className="sub">Description:   <span>{input.description}</span></div> : <></>
                        }
                        {
                            input.image ?
                                <img src={input.image} alt="videogame" width="150px" height="150px" /> : <></>
                        }
                        {
                            input.released ? <div className="sub">Released:   <span>{input.released}</span></div> : <></>
                        }
                        {
                            input.rating ? <div className="sub">Rating:   <span>{input.rating}</span></div> : <></>
                        }
                        {
                            input.genres.length ?
                                <div className="sub">Genres: {input.genres.map(g => {
                                    return (
                                        <div>
                                            <span>{g}</span>
                                            {/* <button type='button' onClick={() => handleDelete(g)} >x</button> */}
                                        </div>
                                    )
                                })}</div> : <></>
                        }
                        {
                            input.platforms.length ?
                                <div className="sub">Platforms: {input.platforms.map(c => {
                                    return (
                                        <div>
                                            <span>{c}</span>
                                        </div>
                                    )
                                })}</div> : <></>
                        }
                        {/* ------------------------------------------------------------ */}
                    </div>
                </div>
            </form>
            <div>
                <img className="logo" src={logo} alt="img not found" width="70px" height="70px"/>
            </div>
        </div>
    )
}