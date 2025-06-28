import { useContext } from 'react';
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext';
import UserProfile from './UserProfile';

export default function Navbar(props) {
    const navigateTo = useNavigate();
    const {isLoggedIn} = useContext(GlobalContext)

    return (
        <header className='top-0 sticky w-full z-5'>

            <nav
                className='relative'
            >
                <ul className='h-14 px-5 subtle-shadow bg-gray-800 flex justify-between items-center '>
                    <li className='h-16 hover:cursor-pointer' onClick={() => {
                        navigateTo('/');
                    }} >
                        <img src="./doIT_logo.png" alt="doIT_logo" className='h-[100%]' />
                    </li>

                    {
                        !isLoggedIn ?
                            (<li className='flex justify-between items-center gap-5'>
                                <Button text={"Register"} col={"spark-yellow"} />
                                <Button text={"Login"} col={"aqua-blue"} />
                            </li>) : <UserProfile/>
                    }
                     
                </ul>
            </nav>
        </header>
    )
}
