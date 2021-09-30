import React from 'react';
import './Rank.css';

function Rank({ name, entries }) {
    return (
        <div className="rank">
            <div className='rank white f3 center'>
                {`${name}, your current entry count is...`}
            </div>
            <div className="white f1 center">
                {`${entries}`}
            </div>
        </div>
    );
};

export default Rank;
