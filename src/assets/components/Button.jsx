import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { Navigate } from 'react-router-dom';
export default function Button({ text, col }) {
    const navigateTo = useNavigate();
    const { setIsLoggedIn, isLoggedIn } = useContext(GlobalContext);

    function logoutUser() {

        localStorage.removeItem('token');
        setIsLoggedIn(false);
        localStorage.removeItem('user')
        navigateTo('/')

    }

    const bgClass = col === 'spark-yellow' ? 'bg-spark-yellow' : 'bg-aqua-blue';

    const shadowClass = col == 'spark-yellow' ? 'active:shadow-[-1px_3px_10px_2px_#FFB200]' : 'active:shadow-[-1px_3px_10px_2px_#00A9F4]'

    return (
        <button className={`${bgClass} my-1 px-3 py-2 shadow-[-1px_2px_7px_0px_grey]  rounded-md hover:cursor-pointer  hover:scale-105 
        active:scale-95  ${shadowClass} font-bold text-text1 transition-[all_1.5s_ease-in-out]
        `}
            onClick={() => {
                if (text === 'Logout')
                    logoutUser();
                else if (text === 'Let\'s doIT') {
                    if (isLoggedIn) {
                        navigateTo('/dashboard')
                    } else {
                        navigateTo('/login')
                    }
                } else {

                    navigateTo(`/${text.toLowerCase()}`);
                }
            }}
        >
            {text}

        </button>
    )
}
