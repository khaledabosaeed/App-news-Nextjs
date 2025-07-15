import React from 'react'
import Login from '../../../_Components/login/Login'
import { NextRequest } from 'next/server'
import { toast } from 'react-toastify';

interface Iprops {
    searchParams: Promise<{ mag: string }>;
}
async function page(props: Iprops) {
    const parm = await (props.searchParams);
    const massage = parm.mag;
    if (massage) {
        toast.warning(massage)
    }
    return (
        <div>
            <Login />
        </div>
    );
}

export default page