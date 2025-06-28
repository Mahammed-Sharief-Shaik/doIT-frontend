import MustLogin from "./MustLogin"
const PrivateRoutes = ({ children }) => {
    if (localStorage.getItem('token')) {
        return (children)
    } else {
        return (<MustLogin/>)
    }

}

export default PrivateRoutes