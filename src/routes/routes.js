const express = require("express");
const router = express.Router();
const Task = require("../model/Task");

router.get("/tasks", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  Task.findAll({
    offset: (page - 1) * limit,
    limit: +limit,
    order: [["updatedAt", "desc"]],
  }).then((tasks) => {
    res.json(tasks);
  });
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      res.status(404).json({
        success: false,
        message: "Tarefa não encontrada",
      });
    } else {
      res.json({
        success: true,
        task: task,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const task = new Task({
      description: req.body.description,
    });
    await task.save();
    res.status(201).json({
      success: true,
      message: "Tarefa criada com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put('/tasks/:id', async (req,res)=>{
  try{
    const task = await Task.findByPk(req.params.id)
    if(!task){
      res.status(404).json({
        success:false,
        message: 'Tarefa Não encontrada!'
      })
    }else{
      await task.update({
        description: req.body.description,
      })
      res.json({
        success: true,
        message: "Tarefa atualizada com sucesso!"
      })
    }
  }catch(error){
    res.status(500).json({
      success:false,
      message: error.message
    })
  }
})

router.delete('/tasks/:id', async (req,res)=>{
  try{
    const task = await Task.findByPk(req.params.id)
    if(!task){
      res.status(404).json({
        success:false,
        message: 'Tarefa Não encontrada!'
      })
    }else{
      await task.destroy()
      res.json({
        success: true,
        message: "Tarefa excluída com sucesso!"
      })
    }
  }catch(error){
    res.status(500).json({
      success:false,
      message: error.message
    })
  }
})

module.exports = router;
