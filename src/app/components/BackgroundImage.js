import React from 'react'

const BackgroundImage = (props) => {
    return (
        <div className='image-background-box'>
            <img className='image-background' src={props.image} />
        </div>
    )
}

export default BackgroundImage