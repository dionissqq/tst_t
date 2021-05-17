import axios from 'axios'
import React, {useState, useEffect} from 'react'
import makeRequest from '../server'
import './analt.css'

function Analitics(){
    const [dates, setDates] = useState(['',''])
    const [data, setData] = useState([])

    function handleChange(e,num){
        console.log(dates)
        if (num == 0){
            setDates([e.target.value, dates[1]])
        }else{
            setDates([dates[0],e.target.value])
        }
    }
    function handleSubmit(){
        makeRequest('get',`api/analytics?from=${dates[0]}&to=${dates[1]}`)
            .then(res=>setData(res.data))
    }

    return(
        <div className='data'>
            <input type='date' onInput ={(e)=>handleChange(e,0)}></input>
            <input type='date' onInput ={(e)=>handleChange(e,1)}></input>
            <p/>
            <input type = 'submit' onClick ={handleSubmit}></input>
            <p/>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default Analitics