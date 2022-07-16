import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Dashboard/Table';

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Table />, document.getElementById('dashboard'));
}

