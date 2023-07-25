import React from 'react'

const Loading = () => {
    return (
        <div>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-900 z-50">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500" />
            </div>
        </div>
    )
}

export default Loading