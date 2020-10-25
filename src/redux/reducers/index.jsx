import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
//import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

//import createEncryptor from "redux-persist-transform-encrypt";
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';

import { loadingBarReducer } from 'react-redux-loading-bar';

import { LOGIN_AUTHENTICATION, LOGIN_PROFILE } from './LoginReducer';
import { USERS } from './UsersReducer';
import { ISSUES } from './IssuesReducer';
import { ISSUELOGS } from './IssueLogsReducer';
import { CATEGORIES } from './CategoryReducer';
import { TICKETS } from './TicketReducer';
import { TASKS } from './TaskReducer';
import { DASHBOARD } from './DashboardReducer';
import { USERIMAGE } from './UserImageReducer';
import { AUTHORITIES } from './AuthorityReducer';
import { ADDRESSES } from './AddressReducer';

// const encryptor = createEncryptor({
//   secretKey: "mydirtylittlesecret",
//   onError(error) {
//     // Handle the error.    
//   }});

  const encryptor = encryptTransform({
    secretKey: 'mydirtylittlesecret',
    onError: function (error) {
      // Handle the error.
    },
  });

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

const dashboardPC = {
  key: 'dashboard',
  storage: storageSession,
  blacklist: ['DASHBOARD'],
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

const ticketsPC = {
  key: 'tickets',
  storage: storageSession,
  blacklist: ['TICKETS'],
  transforms: [encryptor],
}

const tasksPC = {
  key: 'tasks',
  storage: storageSession,
  blacklist: ['TASKS'],
  transforms: [encryptor],
}

const userimagePC = {
  key: 'userimage',
  storage: storageSession,
  blacklist: ['USERIMAGE'],
  transforms: [encryptor],
}

const authorityPC = {
  key: 'authority',
  storage: storageSession,
  blacklist: ['AUTHORITIES'],
  transforms: [encryptor],
}

const addressPC = {
  key: 'addresses',
  storage: storageSession,
  blacklist: ['ADDRESSES'],
  transforms: [encryptor],
}

const rootReducer = combineReducers({
  form: formReducer,
  loadingBar: loadingBarReducer,
  LOGIN_AUTHENTICATION: LOGIN_AUTHENTICATION,
  LOGIN_PROFILE: persistReducer(cookieLPPersistConfig, LOGIN_PROFILE),
  USERS: persistReducer(cookieUsersAuthPersistConfig, USERS),
  ISSUES: persistReducer(issuesPC, ISSUES),
  ISSUELOGS: persistReducer(issuelogsPC, ISSUELOGS),
  CATEGORIES: persistReducer(categoriesPC, CATEGORIES),
  TICKETS: persistReducer(ticketsPC, TICKETS),
  TASKS: persistReducer(tasksPC, TASKS),
  USERIMAGE: persistReducer(userimagePC, USERIMAGE),
  AUTHORITIES: persistReducer(authorityPC, AUTHORITIES),
  ADDRESSES: persistReducer(addressPC, ADDRESSES),
  DASHBOARD: persistReducer(dashboardPC, DASHBOARD)
});

export default persistReducer(cookieAuthPersistConfig,rootReducer);
