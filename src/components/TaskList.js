import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import TaskForm from "./TaskForm";
import TaskService from "../service/task-service";
import "../style/style.css";

const TaskList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    const data = await TaskService.getTasks(page, 4);
    if (page === 1) {
      setTasks(data);
      return;
    }
    setTasks([...tasks, ...data]);
  };
  const loadMore = () => {
    setPage(page + 1);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const handleNew = () => {
    setModalIsOpen(true);
    setCurrentTaskId(0);
  };
  const handleEdit = (id) => {
    setCurrentTaskId(id);
    setModalIsOpen(true);
  };
  const handleDelete = (id) => {
    TaskService.deleteTask(id)
      .then(() => {
        fetchTasks();
        toast.success("Exclusão Realizada!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao deletar a Tarefa");
      });
  };
  const handleSave = async () => {
    handleCloseModal();
    toast.success("Dados salvos com sucesso!");
    setPage(1);
    await fetchTasks();
  };

  return (
    <div className="main">
      <h1>Lista de Tarefas</h1>
      <div className="button-new-task-container">
        <button className="success" onClick={() => handleNew()}>
          Novo
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DESCRIÇÃO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.description}</td>
              <td>
                <button onClick={() => handleEdit(task.id)}>Editar</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="load-button-container">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <button onClick={loadMore}>Mostrar Mais</button>
        )}
      </div>
      <Modal
        className="modal"
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
      >
        <h2>{currentTaskId ? "Editar tarefa" : "Nova tarefa"}</h2>
        <TaskForm id={currentTaskId} onSave={handleSave} />
      </Modal>
      <ToastContainer />
    </div>
  );
}; //final do component

export default TaskList;
