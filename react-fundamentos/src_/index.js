import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App'

import GlobalStyle from './styles/global'

ReactDOM.render(
    <>
        <GlobalStyle/>
        <App/>
    </>,
    document.getElementById('root')
);