import Button from "./Button"
import SpandoIT from "./SpandoIT"

export default function Hero() {
  return (
    <section className="mx-auto mt-10 w-9/10 h-[50vh] flex justify-evenly items-center  rounded-4xl bg-gray-800/50 subtle-shadow p-2">
                <img src="./spark.png" alt="spark" className="h-2/5 sm:h-8/10 " />
                <div
                    className=" gap-3 flex-center flex-col w-4/5"
                >

                    <h1 className="text-center sm:text-4xl text-2xl/10 rubik-font text-aqua-blue">
                        Organize Your Day, the <SpandoIT/> Way!
                    </h1>
                    <p className="text-md sm:text-xl/8 text-center">
                        Stay focused. Be productive. Track your tasks and get things done with doIT – your smart task companion.
                    </p>
                    <Button text={"Let's doIT"} col={"spark-yellow"} />
                </div>
            </section>
  )
}
