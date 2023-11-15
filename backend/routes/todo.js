const express=require("express")
const route=express.Router()
const todomodel = require("../models/todomodel");

route.get("/",async (req,res)=>{
    try{
        const result=await todomodel.find();
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({"err":err.message})
    } 
})

route.post("/", async (req,res)=>{
    try
    {
        if(req.body.task)
        {
            const create=new todomodel({
                "task":req.body.task
            })
            const result=await create.save()
            res.status(200).json(result)
        }
        else{
            res.status(400).json({error:"Please enter task..."})
        }
        
    }
    catch(err){
        res.status(500).json({"err":err.message})
    }
})

route.get("/:id",async (req,res)=>{
    try{
        const result=await todomodel.findById(req.params.id);
    res.status(200).json(result)
    }
    catch(err)
    {
        res.status(500).json({"error":err.message})
    }
})

route.delete("/:id",async (req,res)=>{
    try{
        const result=await todomodel.findByIdAndDelete(req.params.id);
        res.status(200).json(result)
    }
    catch(err)
    {
        res.status(500).json({"error":err.message})
    }
})

route.put("/:id", async (req, res) => {
    try {
        const updatedTodo = await todomodel.findByIdAndUpdate(
            req.params.id,
            {
                task: req.body.task,
                status: req.body.status || false, 
            },
            { new: true }
        );

        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports=route;