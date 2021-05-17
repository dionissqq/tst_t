import { Redirect } from "react-router"

function Logout(props){
    localStorage.clear()
    props.login(false)
    return (
        <Redirect to='/login' />
    )
}

export default Logout