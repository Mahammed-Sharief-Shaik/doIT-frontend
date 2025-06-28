import { useContext, useEffect } from 'react';
import { MdDelete, MdOutlineDone } from 'react-icons/md'
import { GlobalContext } from '../context/GlobalContext';
import axios from "../../utils/axiosInstance.js";

function Task({ taskName, desc, id }) {
    const { tasks, setTasks, setTotalTasks } = useContext(GlobalContext);


    const tickTask = async (id) => {
        try {

            const res = await axios.put(
                `/api/${localStorage.getItem('user')}/done`, {
                id
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
        } catch (e) {
            console.log(e);
        }
    }
    const markAsDone = async (id) => {

        setTasks(tasks.map(
            (task) => {
                return task.id === id ? { ...task, isCompleted: true } : task
            }
        ));
        await tickTask(id);

    }

    const removeTask = async (id) => {
        // console.log("request to delete : ", id);
        setTasks(prev => prev.filter(task => task.id.toString() !== id.toString()));
        try {
            await axios.delete(
                `api/${localStorage.getItem('user')}/delete-task`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },


                    data: {
                        id
                    }
                }

            )
        } catch (e) {
            console.log(e);
        }

        setTotalTasks(prev => prev - 1);

    }

    return (
        <article className='bg-slate-700 p-3 rounded-xl w-4/5 fade-left' key={id}>
            <h1 className='text-2xl '>
                {taskName}
            </h1>
            <p className='text-text2'>

                {desc}
            </p>
            <div className='flex justify-end gap-3'>
                <MdOutlineDone onClick={async () => {
                    await markAsDone(id);
                }} className='text-green-500 subtle-shadow cursor-pointer rounded-md text-xl ' />
                <MdDelete color='red' className=' subtle-shadow cursor-pointer rounded-md text-xl'
                    onClick={
                        async () => {
                            await removeTask(id);
                        }
                    }
                />
            </div>
        </article>
    )
}

export default Task