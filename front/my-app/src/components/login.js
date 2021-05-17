import React, { useState } from 'react';
import './navbar.css'
import './form.css'
import '../App.css'
import axios from 'axios';

function Login(props){
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
        let url = 'http://localhost:8000/api/token/';
        axios.post(url, data, {
        headers: {
            
        }
        })
            .then(res => {
                console.log(res)
                props.login(true)
                localStorage.setItem('access', res.data.access);
                localStorage.setItem('refresh', res.data.refresh);
                window.location.href = '/posts'
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

export default Login