'use client'
import React from 'react'
interface Iporps {
    error: Error,
    reset: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Error(props: Iporps) {

    return (
        <div>Error</div>
    )
}

export default Error