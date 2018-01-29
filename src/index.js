import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const size = 20
let props = {
    rows: size,
    cols: size,
    fps: 10
}
ReactDOM.render(<App {...props} />, document.getElementById('root'));
registerServiceWorker();
