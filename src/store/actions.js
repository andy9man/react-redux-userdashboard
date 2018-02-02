import axios from 'axios';

export const INITIAL_VIEW = 'INITIAL_VIEW';

export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'LOAD_DATA_ERROR';

export const initialView = (payload) => {
  return {type: INITIAL_VIEW, payload}
};

export const loadingData = (bool) => {
  return {
    type: LOAD_DATA,
    payload: bool
  }
}

export const loadingDataSuccess = (data) => {
  return {
    type: LOAD_DATA_SUCCESS,
    payload: data
  }
}


export const getUsers = (address) => {
  console.log("GET USERS");
  return (dispatch, getState, url) => {
    dispatch( loadingData(true) );
    console.log(`Getting User Data... ${url}/${address}`);
    axios.get(`${url}/${address}`)
      .then( ({data: users}) => {
        setTimeout( () => { dispatch( loadingDataSuccess(users) ) }, 1500);
      })
  }
}

export const addUser = (address) => {
  const {email, username, avatar} = this.state;
  const userObj = {email, username, avatar}

  return (dispatch, getState, url) => {
    axios.post(`${url}/`, userObj)
      .then( response => {
        console.log(response);
        //this.getUsers();
      })
  }
}