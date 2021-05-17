import makeRequest from '../server'
import React, {useState, useEffect} from 'react'
import './posts.css'

function Posts(props){
    const [data, setData] = useState({posts:[],
    liked_posts_ids:[]})
    console.log(data)

    useEffect(()=>{
        let url  = 'api/posts/'
        makeRequest('get', url).then(res=>{
            setData(res.data)
        })
    },[])

    function handleLike(e, id){
        makeRequest('post', 'api/like/',{post_id:id})
        let button = e.target
        if (button.classList.contains('button--liked')){
            button.classList.remove('button--liked')
        } else{
            button.classList.add('button--liked')
        }
    }

    return (
        <React.Fragment>
            <div className='hmmm'></div>
            {data.posts.map(el=>
                <div className = 'posts_box'>
                    <div className = 'post_image'>
                        <img src = {'http://127.0.0.1:8000'+el.image} className='image'></img>
                    </div>
                    <div className = 'post_info'>
                        <div className = 'post_info__text'>{el.text}</div>
                        <div className = 'post_info__like'>
                            <button className = {'button ' + (data.liked_posts_ids.includes(el.id)?'button--liked':'')} onClick={(e)=>handleLike(e, el.id)}>liked</button>
                        </div>
                    </div> 
                </div>
            )}
        </React.Fragment>
    )
}

export default Posts