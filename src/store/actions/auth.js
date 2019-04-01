import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import {uiStartLoading, uiStopLoading} from './ui'

import {AsyncStorage} from 'react-native'
import startMainTabs from "../../screens/MainTabs/startMainTab";
import App from "../../../App";
import {API_TOKEN, URL_PASSWORD_VERIFY, URL_REFRESH, URL_SIGNUP} from '../../../apiConfig'


const API_KEY = API_TOKEN

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading())

  let url = URL_PASSWORD_VERIFY + API_KEY

  if (authMode === 'signup'){
    url = URL_SIGNUP + API_KEY
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
      dispatch(
        authStoreToken(
          parsedRes.idToken, 
          parsedRes.expiresIn, 
          parsedRes.refreshToken)
      )
        startMainTabs()
      }
    })
  }
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + 5 * 1000;
    dispatch(authSetToken(token, expiryDate));
    AsyncStorage.setItem("ap:auth:token", token);
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
  };
}

export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
    expiryDate: expiryDate
  }
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if (!token || new Date(expiryDate) <= new Date()) {
        let fetchedToken;
        AsyncStorage.getItem("ap:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("ap:auth:expiryDate");
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise
      .catch(err => {
        return AsyncStorage.getItem("ap:auth:refreshToken")
          .then(refreshToken => {
            
          return fetch(
            URL_REFRESH + API_KEY, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: "grant_type=refresh_token&refresh_token=" + refreshToken
            }
            );
          })
          .then(res => res.json()
          )
          .then(parsedRes => {
            // console.log('PARSED', parsedRes)
            if (parsedRes.id_token) {
              console.log("Refresh token worked!");
              dispatch(
                authStoreToken(
                  parsedRes.id_token,
                  parsedRes.expires_in,
                  parsedRes.refresh_token
                )
              );
              return parsedRes.id_token;
            } else {
              dispatch(authClearStorage());
            }
          });
      })
      .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        // console.log('token from auto sign', token)
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token!", err));
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("app:auth:token");
    AsyncStorage.removeItem("app:auth:expiryDate");
    // AsyncStorage.removeItem("app:auth:refreshToken");
    return AsyncStorage.removeItem("app:auth:refreshToken");
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage()).then(() => {
      App();
    });
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  };
};
