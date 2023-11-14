import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [data,setData]=useState("")

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
        axios.post("http://localhost:5001/api/todos/",{"task":data}).
        then(()=>setTasks([...tasks,data])).
        catch((err)=>console.log(err))
    }

    const HandleDelete=(id)=>{
        axios.delete(`http://localhost:5001/api/todos/${id}`).then(()=>alert("Deleted successfully")).
        catch((err)=>console.log(err))
    }

    return (
        <div>
            <input type="text" onChange={(e)=>{setData(e.target.value)}}/>
            <button onClick={Handlesubmit}>SUBMIT</button>
            {tasks.length === 0 ?
             <h6>No tasks</h6> :
                tasks.map((task) =>
                <>
                    <h5 key={task._id}>{task.task}</h5>
                    <button onClick={()=>{HandleDelete(task._id)}}>Delete</button>
                </>   
                )
            }
        </div>
    );
}

export default Todo;
