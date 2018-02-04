import axios from 'axios';

export const USERS_API_URL = 'http://5a75294b08118e0012fd4cb2.mockapi.io/api/v1/users';
//export const USERS_API_URL = 'http://5a74994008118e0012fd4c84.mockapi.io/users';

export const UPDATE_VIEW = 'UPDATE_VIEW';
export const INITIAL_VIEW = 'INITIAL_VIEW';
export const USER_VIEW = 'USER_VIEW';
export const EDIT_VIEW = 'EDIT_VIEW';
export const ADD_VIEW = 'ADD_VIEW';


export const LOAD_DATA = 'LOAD_DATA_SUCCESS';
export const USER_SELECTED = 'USER_SELECTED';

export const DATA_STATUS_HANDLER = 'DATA_STATUS_HANDLER';
export const STATE_RESET = 'STATE_RESET';

export const updateView = (view) => {
  return {type: UPDATE_VIEW, payload: view}
}

export const dataResultHandler = (actionType, stateObjectType, stateObjectResult) => {
  return {
    type: actionType,
    payload: {
      type: stateObjectType,
      result: stateObjectResult
    }
  }
}

export const getUsers = () => {
  return (dispatch, getState, url) => {
    //dispatch( loadingData(true) );
    dispatch( dataResultHandler(DATA_STATUS_HANDLER, 'loadingData', true) );
    console.log(`Getting User Data... ${url}`);

    axios.get(`${url}`)
      .then( ({data: users}) => {
        setTimeout( () => { dispatch( dataResultHandler(LOAD_DATA, 'users', users) ) }, 1000);
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
        console.log("Error has occured in loading data...");
        console.log(error);
        dispatch( dataResultHandler(DATA_STATUS_HANDLER, 'loadingError', true) );

    })
  }
}

export const editUser = (userObj, userId) => {
  return (dispatch, getState, url) => {
    console.log(`Updating user... ${userId}`);
    console.log(userObj);
    axios.put(`${url}/${userId}`, userObj)
      .then( (response) => {
        dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'editUserSuccess', result: true}} );
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
        console.log("Error has occured in updating user...");
        console.log(error);
        dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'editUserError', result: true}} );
    })
  }
}

export const deleteUser = (userId, callGetUsers) => {
  return (dispatch, getState, url) => {
    console.log(`Deleting user... ${userId}`);
    axios.delete(`${url}/${userId}`)
      .then( (response) => {
        dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'deleteUserSuccess', result: true}} );
        callGetUsers && dispatch( getUsers() );
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
        console.log("Error has occured in deleteing user...");
        console.log(error);
        dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'deleteUserError', result: true}} );
    })
  }
}

export const addUser = (userObj) => {
  return (dispatch, getState, url) => {
    console.log('Adding user...');
    console.log(userObj);
    axios.post(url, userObj)
      .then( response => {
        console.log(response);
        dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'addUserSuccess', result: true}} );
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
        dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'addUserError', result: true}} );
    })
  }
}