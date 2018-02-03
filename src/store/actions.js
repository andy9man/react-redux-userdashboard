import axios from 'axios';

export const UPDATE_VIEW = 'UPDATE_VIEW';
export const USER_SELECTED = 'USER_SELECTED';
export const INITIAL_VIEW = 'INITIAL_VIEW';
export const USER_VIEW = 'USER_VIEW';

export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'LOAD_DATA_ERROR';

export const DELETE_USER = 'DELETE_USER';
export const STATE_RESET = 'DELETE_RESET';

export const updateView = (view) => {
  return {type: UPDATE_VIEW, payload: view}
}

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

export const deleteUserSuccess = (bool) => {
  return {
    type: DELETE_USER,
    payload: bool
  }
}


export const getUsers = () => {
  return (dispatch, getState, url) => {
    dispatch( loadingData(true) );

    console.log(`Getting User Data... ${url}/users`);

    axios.get(`${url}/users`)
      .then( ({data: users}) => {
        //setTimeout( () => { dispatch( loadingDataSuccess(users) ) }, 1000);
        dispatch( loadingDataSuccess(users) );
      })
  }
}

export const updateUser = (address, userId) => {
  return (dispatch, getState, url) => {
    //dispatch( deleteData(true))
    console.log(`Updating user... ${userId}`);
  }
}

export const deleteUser = (userId) => {
  return (dispatch, getState, url) => {
    console.log(`Deleting user... ${userId}`);
    axios.delete(`${url}/users/${userId}`)
      .then( (response) => {
        dispatch( deleteUserSuccess(true) );
        dispatch( getUsers() );
      })
      .catch( error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //  console.log(error.response.data.message);
            //  console.log(error.response.status);
            //  console.log(error.response.headers);
            console.log(`Error Response: ${error.response}`);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(`Error Request: ${error.request}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(`General Error: ${error.message}`);
        }
        console.log("Error has occured in obtaining data...");
        console.log(error);

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
      .catch( error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //  console.log(error.response.data.message);
            //  console.log(error.response.status);
            //  console.log(error.response.headers);
            console.log(`Error Response: ${error.response}`);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(`Error Request: ${error.request}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(`General Error: ${error.message}`);
        }
        console.log("Error has occured in obtaining data...");
        console.log(error);
    })
  }
}