import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
});

export const requestGetAllTasks = async () => {
  const { data } = await api.get('/task');
  return data;
};

export const requestDeleteTask = async (id) => api.delete('/task', { data: { id } });

export const requestPostTask = async ({ task, status, priority }) => {
  await api.post('/task', { task, status, priority });
};

export const requestPutTask = async ({
  id, task, status, priority,
}) => {
  await api.put('/task', {
    id, task, status, priority,
  });
};
