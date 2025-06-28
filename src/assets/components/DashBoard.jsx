import ToDoMaker from './ToDoMaker'
import Tasks from './Tasks'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import axios from "../../utils/axiosInstance.js";
import PrivateRoutes from './PrivateRoutes'

const DashBoard = () => {
  const { tasks, setTasks, setTotalTasks } = useContext(GlobalContext);
  useEffect(() => {
    const fetchTasks = async () => {
      // console.log("fetching tasks for user : ", localStorage.getItem('user'));
      try {
        const res = await axios.get(`/api/getTasks/${localStorage.getItem('user')}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        // console.log("Got tasks : ", res.data);
        setTasks(res.data);
        setTotalTasks(tasks.length)
      } catch (e) {
        console.log(e);
      }
    }

    fetchTasks();


  }, []);

  return (
    <PrivateRoutes>
      <main className="w-full flex-center flex-col mx-auto">
        <ToDoMaker />
        {tasks.length !== 0 &&
          <Tasks />
        }
      </main>
    </PrivateRoutes>
  )
}

export default DashBoard