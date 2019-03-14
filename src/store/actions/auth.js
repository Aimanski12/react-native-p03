import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import {uiStartLoading, uiStopLoading} from './ui'

import {AsyncStorage} from 'react-native'

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
        dispatch(authStoreToken(parsedRes.idToken))
        startMainTabs()
      }
    })
  }
};


export const authStoreToken = token => {
  return dispatch => {
    // const now = new Date();
    // const expiryDate = now.getTime() + expiresIn * 1000;
    dispatch(authSetToken(token));
    AsyncStorage.setItem("app:auth:token", token);
    // AsyncStorage.setItem("app:auth:expiryDate", expiryDate.toString());
    // AsyncStorage.setItem("app:auth:refreshToken", refreshToken);
  };
}



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
        AsyncStorage.getItem('app:auth:token')
          .catch(err => reject())
          .then(tokenFromStorage => {
            if(!tokenFromStorage){
              reject()
              return
            }
            // console.log('token aqui', tokenFromStorage)
            dispatch(authSetToken(tokenFromStorage));
            resolve(tokenFromStorage)
          })
        reject()
      } else {
        resolve(token)
      }
    })
    // return the promise
    return promise
  }
}


export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        console.log('token aqui', token)
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token!"));
  };
};