import React from 'react'
import LottieView from 'react-lottie-player'


const Loading = (props) => {
    return (
        <LottieView loop animationData={props.color} play style={{ width: '50%', height: '50%' }} speed={2}/>
    )
}

export default Loading