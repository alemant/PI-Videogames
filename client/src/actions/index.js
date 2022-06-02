import axios  from 'axios';

export function getVideogames(){
    return async function(dispatch){
        try{
            let json = await axios.get('http://localhost:3001/videogames');
            return dispatch({
                type: "GET_VIDEOGAMES",
                payload: json.data
            })
        }catch(e){
            console.log(e)
        }
    }
};

export function getVideogameByNames(name){
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: "GET_VIDEOGAME_BY_NAMES",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function getVideogameById(id){
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: "GET_VIDEOGAME_BY_ID",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
};

export function getGenres(){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/genres');
            return dispatch({
                type: "GET_GENRES",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function filterVideogamesByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function orderByName(payload) {
    //console.log(payload)
    return {
    type: "ORDER_BY_NAME",
    payload
    }
}

export function orderByRating(payload){
    return {
        type: "ORDER_BY_RATING",
        payload
    }
}

export function orderByCreation(payload){
    return {
        type: "ORDER_BY_CREATION",
        payload
    }
}