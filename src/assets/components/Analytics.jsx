// import CanvasJSReact from "@canvasjs/react-charts";
// import { useContext, useEffect, useState } from "react";
// import { GlobalContext } from "../context/GlobalContext";
// import axios from "../../utils/axiosInstance.js";


// function Analytics() {
//     const { tasks, setTotalTasks } = useContext(GlobalContext);

//     const done = tasks.filter(t => t.isCompleted).length;
//     const pending = tasks.length - done;

//     useEffect(
//         () => {
//             const fetchTotalTasks = async () => {
//                 try {

//                     const res = await axios.get(
//                         `/api/${localStorage.getItem('user')}/total`,
//                         {
//                             headers: {
//                                 Authorization: `Bearer ${localStorage.getItem('token')}`
//                             }
//                         }
//                     );
//                     setTotalTasks(res.data.total);

//                 } catch (e) {
//                     console.log(e);
//                 }
//             }
//             fetchTotalTasks();
//         },
//         []
//     );
//     const options = {
//         animationEnabled: true,
//         animationDuration: 500,
//         title: {
//             text: "Task Analytics",
//             fontColor: 'white'
//         },
//         subtitles: [{
//             text: "You're a doER",
//             verticalAlign: "center",
//             fontColor: 'white',
//             // fontSize: 24,
//             dockInsidePlotArea: true
//         }],
//         backgroundColor: '#101828',
//         fontColor: 'white',
//         legend: {
//             fontColor: 'white'
//         },
//         data: [{
//             type: "doughnut",
//             showInLegend: true,
//             indexLabel: "{name} : {y}",
//             indexLabelFontColor: 'white',
//             indexLabelFontSize: 10,
//             dataPoints: [
//                 { name: "Done", y: done, color: '#FFB200' },
//                 { name: "yet to doIT", y: pending, color: '#00A9F4' },
//             ]
//         }]
//     }
//     return (



//         <CanvasJSReact.CanvasJSChart options={options}

//         >
//         </CanvasJSReact.CanvasJSChart>

//     )
// }

// export default Analytics


import { useContext, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { GlobalContext } from "../context/GlobalContext";
import axios from "../../utils/axiosInstance.js";

const COLORS = ["#FFB200", "#00A9F4"];

function Analytics() {
  const { tasks, setTotalTasks } = useContext(GlobalContext);

  const done = tasks.filter((t) => t.isCompleted).length;
  const pending = tasks.length - done;

  useEffect(() => {
    const fetchTotalTasks = async () => {
      try {
        const res = await axios.get(
          `/api/${localStorage.getItem("user")}/total`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTotalTasks(res.data.total);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTotalTasks();
  }, []);

  const data = [
    { name: "Done", value: done },
    { name: "yet to doIT", value: pending },
  ];

  return (
    <div className="w-full h-[400px] md:w-2/3 mx-auto bg-[#101828] p-4 rounded-xl shadow-lg">
      <h2 className="text-white text-xl font-semibold text-center mb-4">Task Analytics</h2>
      <ResponsiveContainer >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" iconSize={10} wrapperStyle={{ color: "white" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analytics;

