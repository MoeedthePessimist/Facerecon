import React from 'react';
import './Navigation.css';

function Navigation({ onRouteChange }) {
    return (
        <div className='navigation'>
            <a onClick={() => onRouteChange('signin')}>Sign out</a>
        </div>
    );
};

export default Navigation;
