import React from 'react';
import ReactDOM from 'react-dom';
//可以删掉
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./assets/css/index.less"
import {Provider} from "react-redux";

import store from "./store/store";

ReactDOM.render(
    <Provider store={store} >
    <App/>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();