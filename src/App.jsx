import React from "react";
import { useState } from "react";
import axios from "axios";
import {ToastContainer , toast} from "react-toastify";
import TodoView from "./components/TodoView";
import { Link } from "react-router-dom";

function App() {

  const[data,setData] = useState({
    list:"",
    completed:false,
    category:"",
    priority:""
  }); 

  const setList = (e) => {
    e.preventDefault();
    let value = e.currentTarget.value;
    setData((prev)=>{
      return {...prev,list:value}
    });
  }

  const setCategory = (e) => {
    e.preventDefault();
    let value = e.currentTarget.value;
    setData((prev) => (
      {...prev,category: value}
    ));
  };

  const setPriority = (e) => {
      e.preventDefault();
      let value = e.currentTarget.value;
      setData((prev)=> (
        {...prev,priority:value}
      ));
  }

  const handleData = async(e) => {
    e.preventDefault();
    if(!data.list.trim()){
        toast.error(`Kindly add the task`);
    }
    else{
      try{
        const req = await axios.post(`http://localhost:8080/api/new`,data);
        toast.success(`Task added successfully`);
      }
      catch(err){
        console.log(err);
      }
    }
    setData({
      list:"",
      completed:false,
      category:"",
      priority:""
    })
  }
  

  return (
    <>
      <div className="container mx-auto border-4 rounded-3xl md:w-2/5 md:fixed md:top-20 md:left-10  ">
        <form onSubmit={handleData} >
          <div className="relative text-center mt-7">
            <h1 className="absolute top-0 left-52 transform -translate-y-3 bg-white px-1 md:absolute md:left-14 lg:absolute lg:left-52">Add your task</h1>
            <input className="p-2 border-2 rounded-lg text-xl hover:shadow-lg" type="text" id="list" name="list" value={data.list} onChange={setList} />
          </div>

          <div className="flex flex-col items-center mt-3">
            <div>
                <p className="text-2xl my-4">Category ({data.category})</p>
            </div>
            <div className="flex flex-row space-x-4 md:grid md:grid-cols-2 md:gap-4">
                <div className="border-2 rounded-xl p-2 hover:shadow-lg active:bg-gray-200 focus-within:ring-2 focus-within:ring-slate-900">
                  <button className="flex flex-row" value="Home" onClick={setCategory}>
                       <svg className="h-10 w-10 " width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.5" d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z" stroke="#1C274C" strokeWidth="1.5"/>
                          <path d="M15 14L12 14M12 14L9 14M12 14L12 11M12 14L12 17" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                       </svg>
                       <p className="my-auto mx-2">Home</p>
                  </button>
                </div>
                <div className="border-2 rounded-xl p-2 hover:shadow-lg active:bg-gray-200 focus-within:ring-2 focus-within:ring-slate-900">
                  <button className="flex flex-row" value="Work" onClick={setCategory} >
                         <svg className="h-10 w-10" width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M9 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H15M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7M9 7H15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                        <p className="my-auto mx-2">Work</p>
                  </button>
                </div>
                <div className="border-2 rounded-xl p-2 hover:shadow-lg active:bg-gray-200 focus-within:ring-2 focus-within:ring-slate-900">
                  <button className="flex flex-row" value="Gym" onClick={setCategory}>
                        <svg className="h-10 w-10" width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.4 7H4.6C4.26863 7 4 7.26863 4 7.6V16.4C4 16.7314 4.26863 17 4.6 17H7.4C7.73137 17 8 16.7314 8 16.4V7.6C8 7.26863 7.73137 7 7.4 7Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19.4 7H16.6C16.2686 7 16 7.26863 16 7.6V16.4C16 16.7314 16.2686 17 16.6 17H19.4C19.7314 17 20 16.7314 20 16.4V7.6C20 7.26863 19.7314 7 19.4 7Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 14.4V9.6C1 9.26863 1.26863 9 1.6 9H3.4C3.73137 9 4 9.26863 4 9.6V14.4C4 14.7314 3.73137 15 3.4 15H1.6C1.26863 15 1 14.7314 1 14.4Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M23 14.4V9.6C23 9.26863 22.7314 9 22.4 9H20.6C20.2686 9 20 9.26863 20 9.6V14.4C20 14.7314 20.2686 15 20.6 15H22.4C22.7314 15 23 14.7314 23 14.4Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 12H16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="my-auto mx-2">Gym</p>
                  </button>
                </div>
                <div className="border-2 rounded-xl p-2 hover:shadow-lg active:bg-gray-200 focus-within:ring-2 focus-within:ring-slate-900">
                  <button value="Others" onClick={setCategory}>
                        <p className="my-2 px-1.5 mx-2">Others</p>  
                  </button>
                </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center mt-5">
              <div>
                <p className="text-2xl my-4">Priority Level ({data.priority})</p>
              </div>
              <div className="flex flex-row space-x-10">
                <button className="border-2 rounded-xl p-3 hover:shadow-lg active:bg-gray-200 focus-within:ring-2 focus-within:ring-slate-900" value="high" onClick={setPriority} >High</button>
                <button className="border-2 rounded-xl p-3 hover:shadow-lg active:bg-gray-200 focus-within:ring-2 focus-within:ring-slate-900" value="medium" onClick={setPriority} >Medium</button>
                <button className="border-2 rounded-xl p-3 hover:shadow-lg active:bg-gray-200 focus-within:ring-2 focus-within:ring-slate-900" value="low" onClick={setPriority} >Low</button>
              </div>
          </div>

          <button className=" flex flex-row justify-center mx-auto my-8 border rounded-xl hover:shadow-lg w-4/5">
            <div className="text-3xl p-1" type="submit">Add Task</div>
          </button>
        </form>
        <ToastContainer position="top-center" theme="dark"/>
      </div>
      
      <TodoView/>
    </>
  )
}

export default App