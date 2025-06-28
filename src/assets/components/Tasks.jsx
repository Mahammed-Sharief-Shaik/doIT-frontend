import { useContext, useEffect } from 'react'
import Task from './Task';
import { GlobalContext } from '../context/GlobalContext';

function Tasks() {
    const { tasks  } = useContext(GlobalContext);
    return (

        <section
            className='mb-5 flex-center flex-col w-9/10'>

            <h1 className='text-4xl rubik-font mt-5 text-center '>
                Your Tasks
            </h1>
            <div
                className='flex-center gap-2 mt-3 flex-col w-full '>

                {tasks.filter(task=> !task.isCompleted).map(({ taskName, desc, id, isCompleted }) => {

                        return (
                            <Task key={id} taskName={taskName} desc={desc} id={id} />
                        )
                })}
            </div>
        </section>
    )
}

export default Tasks