import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';


import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import io from 'socket.io-client';

import App from './components/App';
import reducers from './reducers/index';

const store = createStore(reducers, {});


ReactDOM.render(
    <Provider store={store}><App /></Provider>,
     document.getElementById('root'));


registerServiceWorker();
