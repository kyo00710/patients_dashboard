import React from 'react';
import ReactDOM from 'react-dom';
import Patients from './components/Patients/Patients';

if (document.getElementById('patients')) {
    ReactDOM.render(<Patients />, document.getElementById('patients'));
}

