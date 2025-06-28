import React from 'react'

function ShowLoading() {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-gray-500/30 flex-center">
            <img src="./loading.gif" alt="loading" />
        </div>
    )
}

export default ShowLoading;