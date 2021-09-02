import dataContext from "./dataContext";
import Axios from 'axios'
import {
    GET_PASSWORDS,
    ADD_PASSWORDS,
    SET_SUCCESS,
    SET_ERROR
} from "./actions"

const initialState = {
    passwords: [],
    labPasswordValues: {
        id: '',
        lab: '',
        password: '',
        name: '',
        address: ''
    },
    error: null,
    success: null,
};

const packageReducer = (state, action) => {
    switch (action.type) {
        case GET_PASSWORDS:
            return {
                ...state,
                passwords: action.payload
            };
        case ADD_PASSWORDS:
            return {
                ...state
            };
        case SET_ERROR:
            return { ...state, error: action.payload };
        case SET_SUCCESS:
            return { ...state, success: action.payload };
        default:
            return state
    }
};

const getPasswordList = dispatch => async () => { 
    const response = await Axios.get("http://localhost:3001/showpasswords")
    if (response.statusText === 'OK') {
        dispatch({ type: GET_PASSWORDS, payload: response.data })
    }
}

const addPassword = dispatch => async (lab, password, name, address) => {
    const response = await Axios.post("http://localhost:3001/addpassword", {
        lab: lab,
        name: name,
        address: address,
        password: password,
    })
    if (response.statusText === 'OK') {
        dispatch({ type: SET_SUCCESS, payload: {message : 'Success'} })
    } else {
        dispatch({ type: SET_ERROR, payload: {message : 'Error'} })
    }
}

const deletePassword = dispatch => async (id) => {
    const response = await Axios.delete(`http://localhost:3001/deletepassword/${id}`)
    if (response.statusText === 'OK') {
        dispatch({ type: SET_SUCCESS, payload: {message : 'Success'} })
    } else {
        dispatch({ type: SET_ERROR, payload: {message : 'Error'} })
    }
}

const updatePassword = dispatch => async (lab, password, name, address,id) => {
    const response = await Axios.put(`http://localhost:3001/updatepassword/${id}`, {
        lab: lab,
        name: name,
        address: address,
        password: password,
        id:id,
    })
    if (response.statusText === 'OK') {
        dispatch({ type: SET_SUCCESS, payload: {message : 'Success'} })
        
    } else {
        dispatch({ type: SET_ERROR, payload: {message : 'Error'} })
    }
}

const search = dispatch => async (searchText) => {
    const response = await Axios.get(`http://localhost:3001/search/${searchText}`)
    //console.log('RESPONSE:', response.data)
    if (response.statusText === 'OK') {
        dispatch({ type: GET_PASSWORDS, payload: response.data })
       //console.log('RESPONSE POST: ', response);
    }
}

export const { Context, Provider } = dataContext(
    packageReducer,
    {
        getPasswordList,
        addPassword,
        deletePassword,
        updatePassword,
        search,
    },
    initialState
)