import React, { useState } from 'react';
import './navbar.css'
import './form.css'
import '../App.css'
import axios from 'axios';
import {Redirect} from 'react-router-dom'

function Register(props){
    const [data, setData] = useState({
        username:'',
        email:'',
        password:''
    })
    const [warning, setWarning] = useState('')
    function handleChange(e){
        data[e.target.id] = e.target.value
        setData(data)
    }

    function handleSubmit(e){
        e.preventDefault()
        let url = 'http://localhost:8000/api/register/';
        axios.post(url, data, {
        headers: {
            
        }
        })
            .then(res => {
                window.location.href = '/login'
            })
            .catch(err => {
                setWarning('wrong credentials')
                console.log(err)})
    };

    return (
        <div >
            {warning}
            <p/>
            <form className='form' onSubmit={handleSubmit}>
                <p/>
                username:
                <p/>
                <input type='text' id='username' onChange={handleChange}>
                </input>
                <p/>
                email:
                <p/>
                <input type='text' id ='email' onChange={handleChange}>
                </input>
                <p/>
                password:
                <p/>
                <input type='password' id='password' onChange={handleChange}>
                </input>
                <p/>
                <input type="submit"/>
            </form>
        </div>  
    )
}

export default Register