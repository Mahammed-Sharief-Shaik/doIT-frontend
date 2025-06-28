import CanvasJSReact from "@canvasjs/react-charts";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "../../utils/axiosInstance.js";


function Analytics() {
    const { tasks, setTotalTasks } = useContext(GlobalContext);

    const done = tasks.filter(t => t.isCompleted).length;
    const pending = tasks.length - done;

    useEffect(
        () => {
            const fetchTotalTasks = async () => {
                try {

                    const res = await axios.get(
                        `/api/${localStorage.getItem('user')}/total`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    );
                    setTotalTasks(res.data.total);

                } catch (e) {
                    console.log(e);
                }
            }
            fetchTotalTasks();
        },
        []
    );
    const options = {
        animationEnabled: true,
        animationDuration: 500,
        title: {
            text: "Task Analytics",
            fontColor: 'white'
        },
        subtitles: [{
            text: "You're a doER",
            verticalAlign: "center",
            fontColor: 'white',
            // fontSize: 24,
            dockInsidePlotArea: true
        }],
        backgroundColor: '#101828',
        fontColor: 'white',
        legend: {
            fontColor: 'white'
        },
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name} : {y}",
            indexLabelFontColor: 'white',
            indexLabelFontSize: 10,
            dataPoints: [
                { name: "Done", y: done, color: '#FFB200' },
                { name: "yet to doIT", y: pending, color: '#00A9F4' },
            ]
        }]
    }
    return (



        <CanvasJSReact.CanvasJSChart options={options}

        >
        </CanvasJSReact.CanvasJSChart>

    )
}

export default Analytics