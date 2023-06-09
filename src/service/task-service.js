import axios from "axios";
import { json } from "sequelize";

const apiUrl = "http://localhost:8555/tasks";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

class _TaskService {
  //metodo p/ buscar tarefas
  async getTasks(page = 1, limit = 10) {
    try {
      //Faz uma chamada GET à API passando os parâmetros de página e limite
      const response = await axiosInstance.get(`?page=${page}&${limit}`);
      //Retorna os dados da resposta
      return response.data;
    } catch (error) {
      //tratamento em caso de error
      throw error;
    }
  }
  async getTask(id) {
    try {
      const response = await axiosInstance.get(`/${id}`);
      return response.data.task;
    } catch (error) {
      throw error;
    }
  }
  async createTask(task) {
    try {
      const response = await axiosInstance.post("/task");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async updateTask(id, task) {
    try {
      const response = await axiosInstance.patch(`/${id}`, task);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async deleteTask(id) {
    try {
      const response = await axiosInstance.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const TaskService = new _TaskService()

export default TaskService;
