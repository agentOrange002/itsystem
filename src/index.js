import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import System from './System';

import './index.css';

import 'primereact/resources/themes/luna-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';

import {Router} from 'react-router-dom'

import history from './routes/history';

ReactDOM.render( 
    <Provider store={store}>
    <PersistGate persistor={persistor}>
        <Router history={history}>   
              <System />                   
        </Router>
    </PersistGate>          
</Provider>, 
document.getElementById('root'));

// import 'react-app-polyfill/ie11';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { HashRouter } from 'react-router-dom'
// import ScrollToTop from './ScrollToTop';

// ReactDOM.render(
//     <HashRouter>
//         <ScrollToTop>
//             <App />
//         </ScrollToTop>
//     </HashRouter>,
//     document.getElementById('root')
// );

