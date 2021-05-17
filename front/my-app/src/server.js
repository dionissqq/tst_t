import axios from 'axios'

async function makeRequest(method, url, data, headers){
    if (!headers){
        headers = {}
    }
    let jwt = localStorage.getItem('access')
    headers.Authorization = `Bearer ${jwt}`
    console.log(headers)
    if (jwt!=undefined){
        let res = await axios({
            method : method,
            url : 'http://127.0.0.1:8000/'+url,
            headers:headers,
            data:data
        }).then(res=>{
            console.log(res)
            return res
        }).catch(err=>{
            console.log(err.response.status)
            let status = err.response.status
            if (status == 401){
                let url1 = 'http://localhost:8000/api/token/refresh/';
                return axios.post(url1,{
                    refresh:localStorage.getItem('refresh')
                })
                    .then(res => {
                        jwt = res.data.access
                        localStorage.setItem('access', jwt)
                        headers.Authorization = `Bearer ${jwt}`
                        return axios({
                            method : method,
                            url : 'http://127.0.0.1:8000/'+url,
                            headers:headers,
                            data:data
                        }).then(res=>{
                            console.log('second time')
                            console.log(res)
                            return res
                        })
                    })
            }
        })
        console.log(res)
        return res
        
    }
    
}

export default makeRequest