import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { MdPassword } from 'react-icons/md'
import SpandoIT from './SpandoIT';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from "../../utils/axiosInstance.js";
import { GlobalContext } from "../context/GlobalContext.jsx";
import ErrorDisp from "./ErrorDisp.jsx";
import ShowLoading from "./ShowLoading.jsx";

export default function Login() {
    const navigateTo = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {setIsLoggedIn, setTotalTasks} = useContext(GlobalContext);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const loginUser =async (e) => {
        setLoading(true);
        e.preventDefault();
        try{
            const res = await axios.post(
                '/api/auth/login',
                {
                    username, password
                }
            );
            
            const {token,user,totalTasks} = res.data;
            localStorage.setItem('user', user);
            setTotalTasks(totalTasks);
            localStorage.setItem('token',token);
            setIsLoggedIn(true);
            navigateTo('/dashboard');
        }catch(e){
            setErrorMsg(e.response.data.message)
        }finally{
            setLoading(false);
        }
        setTimeout(() => {
            setErrorMsg("");
        },1500);
    }

    return (

        <section
            className='m-auto w-9/10 lg:w-1/3 bg-gray-800/70 p-3 rounded-md subtle-shadow flex-center flex-col'
        >

            <h1 className='text-center text-2xl sm:text-4xl rubik-font text-aqua-blue'>
                Ready to <SpandoIT /> again?
            </h1>

            <p className="text-text2 text-center text-sm sm:text-base mt-2 mb-4 italic">
                Because great things don’t check themselves off.
            </p>

            <form className='authForm flex flex-col gap-5 p-5 w-4/5 '>
                <div >
                    <FaUser />
                    <input type="text"
                    placeholder='Enter Username : ' 
                    className='w-4/5 subtle-shadow text-center rounded-md'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    onInput={e=>setUsername(e.target.value)}

                />
                </div>
                <div >
                    <MdPassword />
                    <input type={showPassword ? 'text' : 'password'} 
                    placeholder='Enter password : ' 
                    className='w-4/5 subtle-shadow text-center rounded-md' 
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    onInput={e=>setPassword(e.target.value)}
                />
                </div>

                <p className="flex-center gap-2 cursor-pointer" onClick={() => {
                    setShowPassword(prev => !prev);
                }}>
                    {showPassword ? "Hide password ? " : "Show Password ? "}
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </p>

                <h2 className='text-center'>
                    New to squad ? <Link to={'/register'} className='text-green-500' >Let's doIT</Link>
                </h2>
                <input type="submit" className='w-3/5 border-1 font-bold m-auto rounded-md bg-aqua-blue transition-[all_1.5s_ease-in-out] active:shadow-[-1px_3px_10px_2px_#00A9F4]  hover:scale-105 
        active:scale-95 shadow-[-1px_2px_7px_0px_grey] cursor-pointer' value="Login" onClick={(e) => {
                        loginUser(e)
                    }} />
            </form>

            {loading && <ShowLoading/>}
            {errorMsg && <ErrorDisp msg={errorMsg} />}
        </section>


    )
}
