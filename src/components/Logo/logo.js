import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './logo.css'

const Logo =()=>{
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options = {{max: 25}} style={{height: 250, width: 250 }}>
                 <div className="Tilt-inner pa3" style={{ height: '300px' }}>
                     <img style= {{paddingTop:'5px'}}alt = 'logo' src={brain}></img>
                 </div>
             </Tilt>
        </div>
    )
}
export default Logo