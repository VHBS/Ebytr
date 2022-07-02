import axios from 'axios'

const api = axios.create({
  baseURL: `http://localhost:3001/task`,
  timeout: 1000,
});

export const requestTasks = async () => {
  const {data} = await api.get();
  return data;
}

