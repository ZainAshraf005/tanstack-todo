import axios from "axios";

const BASE_URL = "api/todo";

export const fetchTodos = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addTodo = async (title: string) => {
  const res = await axios.post(BASE_URL, { title });
  return res.data;
};

export const updateTodo = async (id: string, newTitle: string) => {
  const res = await axios.patch(BASE_URL, { id, newTitle });
  return res.data;
};

export const deleteTodo = async (id: string) => {
  const res = await axios.delete(BASE_URL, { data: { id } });
  return res.data;
};
