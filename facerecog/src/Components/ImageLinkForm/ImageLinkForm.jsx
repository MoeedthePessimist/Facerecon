import React from 'react';
import './ImageLinkForm.css';
function ImageLinkForm({ onInputChange, onButtonSubmit }) {
    return (
        <div className='imageLinkForm'>
            <p className="f3 center">
                {'This Magic Brain will detect faces in your pictures.'}
            </p>
            <div className='imageLinkForm__input__container'>
                <div className="imageLinkForm__input__container__center">    
                    <input 
                        type="text" 
                        className="imageLinkForm__input" 
                        placeholder='Insert the image link'
                        onChange={onInputChange} 
                    />
                    <button 
                        className="imageLinkForm__detect fill" 
                        onClick={onButtonSubmit}>
                            Detect
                        </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
