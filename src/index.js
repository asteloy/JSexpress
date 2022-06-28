import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    CookiesProvider
} from 'react-cookie';
/* beautify ignore:start */
ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <App/>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
    /* beautify ignore:end */