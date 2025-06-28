import { useContext, useState } from 'react'
import { MdDescription, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import SpandoIT from './SpandoIT'
import axios from "../../utils/axiosInstance.js";
import { GlobalContext } from '../context/GlobalContext';
import ErrorDisp from './ErrorDisp';

function ToDoMaker() {
    const [taskName, setTaskName] = useState('');
    const [desc, setDesc] = useState('');
    const { tasks, setTasks,  setTotalTasks, totalTasks } = useContext(GlobalContext);
    const [errorMsg, setErrorMsg] = useState("");

    const addTask = async () => {
        if(!taskName) {
            setErrorMsg('TaskName can\'t be empty')
            setTimeout(
                () => {
                    setErrorMsg("")
                },
                1000
            )
            return;
        }
        const newTask = {
            taskName, desc
        };

        const res = await axios.post(
            `/api/${localStorage.getItem('user')}/addTask`,
            newTask,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        const { id } = res.data;
        setTasks([...tasks, { ...newTask, id }]);
        setTotalTasks(prev => prev + 1);

    };

    return (
        <section
            className='w-4/5 sm:w-3/5 p-5 bg-cyan-950 subtle-shadow rounded-md mt-5 flex-center flex-col gap-4'
        >
            <h1 className='text-center text-2xl sm:text-4xl rubik-font text-aqua-blue'>
                Just <SpandoIT />
            </h1>
            <form className='authForm w-4/5 flex justify-center gap-5 flex-col'>
                <div>
                    <MdOutlineDriveFileRenameOutline size={20} color='white' />
                    <input type="text"
                        placeholder='Enter Task name : '
                        value={taskName}
                        onChange={(e) => {
                            setTaskName(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <MdDescription size={20} color='white' />
                    <input type="text"
                        placeholder='Enter Description : '
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                </div>
                <input type="submit"
                    value="Add"
                    className='w-1/3 border-1 font-bold m-auto rounded-md bg-aqua-blue transition-[all_1.5s_ease-in-out] active:shadow-[-1px_3px_10px_2px_#00A9F4]  hover:scale-105 
        active:scale-95 shadow-[-1px_2px_7px_0px_grey] cursor-pointer'
                    onClick={(e) => {
                        e.preventDefault();
                        addTask();
                    }}
                />

                {
                    errorMsg && <ErrorDisp msg={errorMsg}/>
                }
            </form>
        </section>
    )
}

export default ToDoMaker