import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [data,setData]=useState("")
    const [status,Setstatus]=useState(false);

    useEffect(() => {
        axios.get("http://localhost:5001/api/todos/")
            .then((res) => setTasks(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5001/api/todos/")
            .then((res) => setTasks(res.data))
            .catch((err) => console.log(err));
    }, [tasks]);

    const Handlesubmit=()=>{
        axios.post("http://localhost:5001/api/todos/",{"task":data,"status":false}).
        then(()=>setTasks([...tasks,data])).
        catch((err)=>console.log(err))
    }

    const HandleDelete=(id)=>{
        axios.delete(`http://localhost:5001/api/todos/${id}`).then(()=>alert("Deleted successfully")).
        catch((err)=>console.log(err))
    }

    const handleComplete = (id) => {
        const updatedTasks = tasks.map((task) =>
            task._id === id ? { ...task, status: !task.status } : task
        );
    
        axios.put(`http://localhost:5001/api/todos/${id}`, { status: !tasks.find(task => task._id === id).status })
            .then(() => setTasks(updatedTasks))
            .catch((err) => console.log(err));
         
    };
    

    return (
        <div>
            <input type="text" onChange={(e)=>{setData(e.target.value)}}/>
            <button onClick={Handlesubmit}>SUBMIT</button>
            {tasks.length === 0 ?
             <h6>No tasks</h6> :
                tasks.map((task) =>
                <>
                    <h5 key={task._id}>{!task.status?task.task:<del>{task.task}</del>}</h5>
                    <button onClick={()=>{HandleDelete(task._id)}}>Delete</button>
                    <button onClick={()=>{handleComplete(task._id)}}>{task.status?"Not complete":"Complete"}</button>
                </>   
                )
            }
        </div>
    );
}

export default Todo;
