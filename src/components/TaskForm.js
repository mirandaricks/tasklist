import React, { useState, useEffect } from "react";
import TaskService from "../service/task-service";

const TaskForm = (props) => {
  const [task, setTask] = useState({});
  const [id, onSave] = useState();

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const task = await TaskService.getTask(id);
      setTask(task);
    }
    load();
  }, [id]);

  const handleChange = (event) => {
    setTask({
      ...task,
      description: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.id) {//editdo
      TaskService.updateTask(props.id, task)//editado
        .then(() => {
          props.onSave();//editado
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      TaskService.createTask(task)
        .then(() => {
          props.onSave();//editado
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        placeholder="Descrição da tarefa..."
        onChange={handleChange}
        value={task.description? task.description : ""}
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default TaskForm;
