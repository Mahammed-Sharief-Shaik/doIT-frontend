import SpandoIT from './SpandoIT'

const MustLogin = () => {
    return (

        <div
            className='bg-red-500/50 w-full h-screen  flex-center'
        >
            <h1 className='text-center sm:text-4xl text-2xl/10 rubik-font text-aqua-blue' >
                You Must Login/Register to <SpandoIT />
            </h1>
        </div>
    )
}

export default MustLogin