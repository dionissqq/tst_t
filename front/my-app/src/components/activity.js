import axios from 'axios'
import {useState, useEffect} from 'react'
import makeRequest from '../server'

function Activity(){
    const [data, setData] = useState({})
    let url = 'api/activity/';
    let jwt = localStorage.getItem('access')
    
    useEffect(()=>{
        makeRequest('get', url).then(res=>{
            setData(res.data)
        })
    },[])
    
    return(
        <div>
            last login - {data.last_login}
            <p/>
            last request - {data.last_request}
        </div>
    )
}

export default Activity