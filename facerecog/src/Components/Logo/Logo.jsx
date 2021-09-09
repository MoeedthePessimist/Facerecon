import './Logo.css';
import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from '../../Assets/brain.png';

function Logo() {
    return (
        <div className='logo ma4 mt0'>
            <Tilt className='tilt' tiltreverse={true} glareEnable={true} glareColor='#000000'>
                <div className='parallax'>
                    <img src={brain} alt="logo"/>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;
