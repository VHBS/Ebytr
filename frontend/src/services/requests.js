import axios from 'axios';

const url = 'http://localhost:3001/task';

export const requestGetAllTasks = async () => {
  const { data } = await axios.get(url);
  return data;
};

export const requestDeleteTask = async (id) => axios.delete(url, { data: { id } });

export const requestPostTask = async ({ task, status, priority }) => {
  await axios.post(url, { task, status, priority });
};

export const requestPutTask = async ({
  id, task, status, priority,
}) => {
  await axios.put(url, {
    id, task, status, priority,
  });
};
