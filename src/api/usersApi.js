import axios from "axios";

const baseURL = "http://localhost:8081/users";

const userService = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const fetchUsers = () => {
  return userService.get("/findAll");
};

export const getUserById = (userId) => {
  return userService.get(`/findOne/${userId}`);
};

export const addUser = (payload) => {
  return userService.post("/", payload);
};

export const updateUser = (payload) => {
  return userService.put("/", payload);
};

export const deleteUser = (userId) => {
  return userService.delete(`/delete/${userId}`);
};
