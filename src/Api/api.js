import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: { "Access-Control-Allow-Credentials": true },
});

export const signUp = (name, email, username, imagelink) => {
  return api
    .post("/signup", { name, email, username, imagelink })
    .then((response) => {
      return response.data;
    });
};

export const logIn = (username) => {
  return api.post("/login", {}, { params: { username } }).then((response) => {
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

export const getMessages = (reciever) => {
  return api
    .get("/messages", { params: reciever })
    .then((response) => response.data);
};

export const sendMessage = (text, sender, conversationId, reciever, status) => {
  return api
    .post("/messages", { text, sender, conversationId, reciever, status })
    .then((response) => response.data);
};
