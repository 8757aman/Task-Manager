import axios from "axios";
const base_url = "https://task-manager-7voj.onrender.com";

export const fetchData = async (token) => {
  const res = await axios.get(`${base_url}/Gettask`, {
    headers: {
      token,
    },
  });
  return res;
};

export const addTask = async (token, text) => {
  await axios.post(
    `${base_url}/Addtask`,
    { task: text },
    { headers: { token } }
  );
};

export const deleteTask = async (e_id, token) => {
  await axios.delete(`${base_url}/Deletetask/${e_id}`, { headers: { token } });
};

export const signupUser = async (username, email, password) => {
  const res = await axios.post(`${base_url}/Signup`, {
    username,
    email,
    password,
  });
  return res;
};

export const loginUser = async (username, password) => {
  const res = await axios.post(`${base_url}/Login`, { username, password });
  return res;
};

export const getOneTask = async (params, token) => {
  const res = await axios.get(`${base_url}/Getonetask/${params}`, {
    headers: { token },
  });
  return res;
};

export const editOneTask = async (params, token, task) => {
  await axios.put(
    `${base_url}/Updatetask/${params}`,
    { task: task },
    { headers: { token } }
  );
};
