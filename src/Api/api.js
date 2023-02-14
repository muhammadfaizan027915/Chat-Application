import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: { "Access-Control-Allow-Credentials": true },
});

export const signUp = (name, email, username, password, imagelink) => {
  return api
    .post("/signup", { name, email, username, password, imagelink })
    .then((response) => {
      return response.data;
    });
};

export const logIn = (username, password) => {
  return api
    .post("/login", {}, { params: { username, password } })
    .then((response) => {
      return response.data;
    });
};

export const getUser = () => {
  return api.get("/user").then((response) => response.data);
};

export const getUsers = () => {
  return api.get("/users").then((response) => response.data);
};

export const logout = () => {
  return api.post("/logout").then((response) => response.data);
};

export const getMessages = (sender) => {
  return api
    .get("/messages", { params: sender })
    .then((response) => response.data);
};

export const sendMessage = (text, sender, conversationId, reciever, status) => {
  return api
    .post("/messages", { text, sender, conversationId, reciever, status })
    .then((response) => response.data);
};
