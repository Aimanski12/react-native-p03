import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import {uiStartLoading, uiStopLoading} from './ui'

import startMainTabs from "../../screens/MainTabs/startMainTab";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading())

  const apiKey = "AIzaSyAFX7BitaqhoYAj58MesJIJzWtBTRW1XPY"
  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey

  if (authMode === 'signup'){
    url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey
  }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(err => {
      console.log(err);
      alert('Authentication failed! Please try again!')
      dispatch(uiStopLoading())
    })
    .then(res => res.json())
    .then(parsedRes => {
      dispatch(uiStopLoading())
      console.log(parsedRes)
      if (!parsedRes.idToken) {
        alert('Authentication failed! Please try again!')
      } else {
        dispatch(authSetToken(parsedRes.idToken))
        startMainTabs()
      }
    })
  }
};



export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  }
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    // use promise to resolve/reject actions is results are taken
    const promise = new Promise((resolve, reject) => {
      // utilize getState to check if there is an authToken
      const token = getState().auth.token;
      // if there is no token
      if (!token){
        // then reject the action
        reject()
      } else {
        // if there is, the we can resolve()
        resolve(token)
      }
    })
    // return the promise
    return promise
  }
}