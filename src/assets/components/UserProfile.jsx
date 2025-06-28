import { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { CgUser } from 'react-icons/cg';
import { FaChevronCircleDown, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SideBar from './SideBar';

const UserProfile = () => {
    const [showSB, setShowSB] = useState(false);
    return (
        <div className='cursor-pointer'>

            <div
                className='flex-center flex-col '
                onClick={() => setShowSB(prev => !prev)}
            >
                <CgUser size={30} className='text-spark-yellow' />
                {
                    !showSB ? <FaChevronDown className='text-aqua-blue' /> : <FaChevronUp className='text-aqua-blue' />
                }
            </div>
            {showSB && <SideBar />}
        </div>
    )
}

export default UserProfile