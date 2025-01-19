import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function TodoView(){

    const[display,setList] = useState();

    useEffect(()=>{
        fetch(`http://localhost:8080/api/get`)
        .then((res)=>res.json())
        .then((res)=>setList(res))
        .catch((err)=>console.log(err));
    })

    const del = async(id) => {
         try{
            const delRes = await axios.delete(`http://localhost:8080/api/del/${id}`)
            toast.error("Task removed successfully");
         }
         catch(err){
            console.log(err);
            toast.error("Server error")
         }
    }

    const updateTask = async(item) => {
        const update = {...item,completed:true};
        if(update!==null){
            try{
                const res = await axios.patch(`http://localhost:8080/api/completed/${update.id}`,update);
                toast.info(`Task Completed successfully`);
            }
            catch(err){
                console.log(err);
                toast.error(`Try again later`);
            }
        }
    }

    return(
        <>
           <div className="container mx-auto border-2 rounded-3xl mt-5 md:w-2/5 md:fixed md:right-20 md:top-12 md:h-4/5">
                <p className="font-semibold text-2xl text-center my-10">Your Remaining tasks</p>
                <div>
                    <ul className="text-center my-5">
                        {
                            display && display.map((todo,index)=>(
                                <div key={index} className="flex flex-row mx-auto border-2 rounded-lg my-4 h-16 w-4/5 ">

                                    <button className={`h-10 w-10 my-auto mx-5 rounded-3xl bg-white ${!todo.completed?'animate-pulse hover:bg-gray-400 active:bg-gray-300 focus-within:ring-4 focus-within:ring-orange-300':'border-2 border-orange-500'} `} onClick={()=>updateTask(todo)}>
                                        <svg fill="currentColor" viewBox="0 0 24 24" id="d9090658-f907-4d85-8bc1-743b70378e93" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg"><title>Click if task done</title><path id="70fa6808-131f-4233-9c3a-fc089fd0c1c4" data-name="done circle" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z"/></svg>
                                    </button>

                                    <li className=" flex flex-row p-3 text-xl border-2" key={index}>{todo.list}</li>

                                    <button className="ml-9" onClick={()=>del(todo.id)}>
                                            <svg className="w-8 h-8" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                    </button>
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </div> 
        </>
    )
}