import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {reducer as formReducer} from 'redux-form';
//import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

import createEncryptor from "redux-persist-transform-encrypt";
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';

import {loadingBarReducer} from 'react-redux-loading-bar';

import {LOGIN_AUTHENTICATION, LOGIN_PROFILE} from './LoginReducers';
import {USERS} from './UsersReducer';
import {ISSUES} from './IssuesReducers';
import {ISSUELOGS} from './IssueLogsReducers';
import {CATEGORIES} from './CategoryReducer';

const encryptor = createEncryptor({
  secretKey: "mydirtylittlesecret",
  onError(error) {
    // Handle the error.
    
  },
})

const cookieAuthPersistConfig = {
  key: "root-auth",
  storage: new CookieStorage(Cookies, {
            expiration: {
              'default': 86400000 //expires cookies 1 day      
            }
          }),
  whitelist: ['LOGIN_AUTHENTICATION'],   
  transforms: [encryptor],
}

const cookieLPPersistConfig = {
  key: "login-profile",
  storage: storageSession,
  blacklist: ['LOGIN_PROFILE'],   
  transforms: [encryptor],
}

const cookieUsersAuthPersistConfig = {
  key: "users",
  storage: storageSession,
  blacklist: ['USERS'],   
  transforms: [encryptor],
}

const issuesPC = {
  key: 'issues',
  storage: storageSession,
  blacklist: ['ISSUES'],
  transforms: [encryptor],
}

const issuelogsPC = {
  key: 'issuelogs',
  storage: storageSession,
  whitelist: ['ISSUELOGS'],
  transforms: [encryptor],
}

const categoriesPC = {
  key: 'categories',
  storage: storageSession,
  blacklist: ['CATEGORIES'],
  transforms: [encryptor],
}

const rootReducer = combineReducers({
  form: formReducer,
  loadingBar: loadingBarReducer,
  LOGIN_AUTHENTICATION: LOGIN_AUTHENTICATION,
  LOGIN_PROFILE: persistReducer(cookieLPPersistConfig,LOGIN_PROFILE),
  USERS: persistReducer(cookieUsersAuthPersistConfig, USERS),
  ISSUES: persistReducer(issuesPC,ISSUES),  
  ISSUELOGS: persistReducer(issuelogsPC,ISSUELOGS),
  CATEGORIES: persistReducer(categoriesPC,CATEGORIES)
});

export default persistReducer(cookieAuthPersistConfig,rootReducer);
