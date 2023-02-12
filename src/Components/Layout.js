import React, { useState, useEffect } from "react";
import Contacts from "./Contacts";
import Header from "./Header";
import Messages from "./Messages";
import Modal from "react-modal";
import Signup from "./Signup";
import Login from "./Login";
import { getUser } from "../Api/api";
import { io } from "socket.io-client";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Layout = () => {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [haveAccount, setHaveAccount] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);

  useEffect(() => {
    setSocket(io.connect("http://localhost:4000"));
    getUser()
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setOpen(true);
      });
  }, []);

  useEffect(() => {
    if (!user) {
      setContacts(null);
      setSelectedContact(null);
      setOnlineUsers(null);
    }
    socket?.emit("register", user?._id);
  }, [user]);

  useEffect(() => {
    if (user)
      socket?.on("active", (users) => {
        setOnlineUsers(users);
      });
  }, [socket, user]);

  return (
    <>
      <Header user={user} setUser={setUser} open={setOpen} socket={socket} />
      <div className="content-wrapper">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card m-0">
              <div className="row no-gutters" style={{ height: "92vh" }}>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                  <Contacts
                    user={user}
                    contacts={contacts}
                    setContacts={setContacts}
                    selectedContact={selectedContact}
                    setSelectedContact={setSelectedContact}
                    onlineUsers={onlineUsers}
                    setOnlineUsers={setOnlineUsers}
                    socket={socket}
                  />
                </div>
                <Messages
                  contacts={contacts}
                  messages={messages}
                  setMessages={setMessages}
                  selectedContact={selectedContact}
                  user={user}
                  socket={socket}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
        {haveAccount ? (
          <Login
            open={setOpen}
            haveAccount={setHaveAccount}
            setUser={setUser}
            socket={socket}
          />
        ) : (
          <Signup
            open={setOpen}
            haveAccount={setHaveAccount}
            setUser={setUser}
            socket={socket}
          />
        )}
      </Modal>
    </>
  );
};

export default Layout;
