import React, { useEffect, useState } from "react";

export default function Home(){
    const[display,setDisplay] = useState();

    useEffect(()=>{
        fetch(`http://localhost:8080/api/get`)
        .then((res)=>res.json())
        .then((res)=>setDisplay(res))
        .catch((err)=>console.log(err))
    })

    return(
        <>
            <div>
                <ul>
                   
                </ul>
            </div>
        </>
    )
}