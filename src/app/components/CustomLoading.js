import React, { useState } from 'react'
import { css } from "@emotion/react"
import HashLoader from "react-spinners/HashLoader"

const override = css`
  display: block;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-color:"#f4f4f4"
`;


const CustomLoading = () => {
    let [color] = useState("#ef4056");

    return (
        <div className='preloader'>
             <HashLoader color={color} css={override} size={50} />
        </div>    
    )
}

export default CustomLoading

