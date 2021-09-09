import React from 'react';
import './FaceRecognition.css';
import 'tachyons';

function FaceRecognition({ box, imgUrl }) {
    return (
        <div className='faceRecognition center'>
            <div className = 'absolute mt2'>
                <img src={ imgUrl } id='inputImage' width='500px' height='auto'/>
                <div 
                className='bounding-box'
                style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
                ></div>
            </div>
        </div>
    );
};

export default FaceRecognition;
