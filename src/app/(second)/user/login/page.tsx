import React from 'react'
import Login from '../../../_Components/login/Login'
import { toast } from 'react-toastify';
import Alarte from '@/src/app/_Components/alart/Alarte';
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
            <Alarte text={massage} type={false} />
            <Login />
        </div>
    );
}

export default page