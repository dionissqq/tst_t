import React, { useState } from 'react';
import './navbar.css'
import {Link} from "react-router-dom";

function Navbar(props){
    return (
        <div className = 'navbar'>
            {props.is_logged_in ?
            <React.Fragment>
            <Link to='logout'>logout</Link>
            <Link to='activity'>activity</Link>
            <Link to='analytics'>analytics</Link>
            </React.Fragment> :
            <React.Fragment>
                <Link to='login'>log in</Link><Link to='register'>register</Link>
            </React.Fragment>} 

            <Link to='/'>posts</Link>:
        </div>  
    )
}

export default Navbar