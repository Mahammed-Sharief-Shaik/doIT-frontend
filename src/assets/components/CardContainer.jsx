import { GiOnTarget, GiStairsGoal } from 'react-icons/gi'
import { HiTrendingUp } from 'react-icons/hi'
import { BsSpeedometer2 } from 'react-icons/bs'

function CardContainer() {


    const cards = [
        {
            title: "Attain Your Goals",
            desc: "Stay on track with a clear plan and purpose.",
            icon: <GiStairsGoal size={100} />,
        },
        {
            title: "Hit Your Targets",
            desc: "Set tasks and accomplish them with precision.",
            icon: <GiOnTarget size={100} />,
        },
        {
            title: "Dopamine Boost",
            desc: "Feel the reward of checking off each task.",
            icon: <HiTrendingUp size={100} />,
        },
        {
            title: "Fast & Effortless",
            desc: "Clean UI designed for speed and simplicity.",
            icon: <BsSpeedometer2 size={100} />,
        }
    ]


    return (

        <div className="flex justify-evenly items-center w-9/10 flex-wrap gap-5" >
            {

                cards.map(({ title, desc, icon }) => (

                    <article key={title} className='rounded-md p-2
                    transition-transform 
                    bg-aqua-blue w-70 h-60 sm:w-50 shadow-[-1px_3px_10px_2px_#00A9F4] hover:scale-105  flex justify-between items-center flex-col '>
                        <h2 className='text-black text-xl font-bold text-center' >{title}</h2>
                        {icon}
                        <h3 className='text-text1 text-md text-center'>{desc}</h3>
                    </article>
                )
                )
            }
        </div >
    )
}

export default CardContainer