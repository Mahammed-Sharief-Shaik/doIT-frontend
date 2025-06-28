import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { CgProfile } from 'react-icons/cg';
import Analytics from './Analytics';
import Button from './Button';

function SideBar() {
    return (
        <aside
            className=' fixed right-0 p-2 fade-in w-80  bg-gray-900 flex-center flex-col'
        // style={{
        //     translate : "-50% -50%"
        // }}
        >
            <h1 className='flex-center flex-wrap ' >
                {localStorage.getItem('user')}
            </h1>
            <hr className='bg-white w-full my-2' />

            <Analytics />
            <hr className='bg-white w-full my-2' />
            <Button text={'Logout'} col={'spark-yellow'} />
        </aside>
    )
}

export default SideBar