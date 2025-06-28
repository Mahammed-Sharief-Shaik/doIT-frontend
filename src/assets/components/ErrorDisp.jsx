import { useNavigate } from "react-router-dom";

function ErrorDisp({ msg }) {
    const dispCol = msg === 'User Registered successfully' ? 'bg-green-500' : 'bg-red-500 ';
    const navigateTo = useNavigate();
    if( msg === 'User Registered successfully'){
        msg+= " Proceed to login"
        setTimeout(() => {
            navigateTo('/login');
        }, 2200)
    }
    return (

            <p
                className={` ${dispCol} p-1 text-sm text-center rounded-md subtle-shadow `}
 
            >
                {msg}
            </p>
    )
}

export default ErrorDisp