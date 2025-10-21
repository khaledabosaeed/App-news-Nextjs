"use client";
import  {useEffect } from 'react'
import { toast } from 'react-toastify'
interface Iprops {
    text: string, type: boolean
}

function Alarte(Props: Iprops) {
    
    useEffect(() => {
        if (Props.type) {
            toast.success(Props.text);
        } else {
            toast.warning(Props.text);
        }
    }, [Props.text, Props.type]);

    return null; // Don't render anything visually
}

export default Alarte