import React, { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../Api/api";
import ScrollToBottom from "react-scroll-to-bottom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

const Messages = ({
  contacts,
  messages,
  setMessages,
  selectedContact,
  user,
  socket,
}) => {
  const timeAgo = new TimeAgo("en-US");
  const [conversationId, setConversationId] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    getMessages({ reciever: selectedContact })
      .then((data) => {
        setMessages(data.messages);
        setConversationId(data.conversationId);
      })
      .catch((err) => setMessages(null));
  }, [selectedContact, setMessages]);

  useEffect(() => {
    if (user)
      socket.on("sendmessage", (message) => {
        if (message.sender._id === selectedContact)
          setMessages((prev) => {
            if (!prev?.length) return [message];
            return [...prev, message];
          });
      });
  }, [user, socket, selectedContact, setMessages]);

  const getContact = (contacts, id) => {
    if (!contacts) return;
    return contacts.find((contact) => contact._id === id);
  };

  const handleClick = () => {
    if (text.length) {
      sendMessage(text, user._id, conversationId, selectedContact)
        .then((data) => {
          setMessages((prev) => {
            if (!prev?.length) return [data?.message];
            return [...prev, data?.message];
          });
          setText("");
          const elem = document.querySelector(".chat-box");
          elem.scrollTop = elem.scrollHeight;
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
      <div className="selected-user">
        <span>
          To:{" "}
          <span className="name">
            {contacts && selectedContact
              ? getContact(contacts, selectedContact)?.name
              : "Select contact"}
          </span>
        </span>
      </div>

      {selectedContact ? (
        <div className="chat-container">
          <ul className="chat-box">
            <ScrollToBottom className="chatContainerScroll">
              {messages && messages?.length
                ? messages?.map((message) => (
                    <li
                      className={
                        message?.sender?._id === user?._id
                          ? "chat-right"
                          : "chat-left"
                      }
                      key={message?._id}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignContent: "flex-start",
                        }}
                      >
                        <div
                          className="chat-avatar"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={
                              message?.sender?.imagelink !== ""
                                ? message?.sender?.imagelink
                                : "https://th.bing.com/th/id/R.945f33b643f2ceffcdae90fb57c61854?rik=XcI0SYBgSefoCA&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon-bw%2fanonymous-avatar-icon-19.png&ehk=5n%2buJG66CeLQZsmhaMt8gag5rXuM3TdebAL6W35K1E4%3d&risl=&pid=ImgRaw&r=0"
                            }
                            style={{ width: "30px", height: "30px" }}
                            alt={message?.sender?.name}
                          />
                          <div
                            className="chat-name"
                            style={{
                              maxWidth: "50px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {message?.sender?.name}
                          </div>
                        </div>
                        <div
                          className="chat-text"
                          style={{ height: "auto", maxWidth: "280px" }}
                        >
                          {message?.text}
                        </div>
                      </div>
                      <div className="chat-hour ml-2">
                        {timeAgo.format(new Date(message?.createdAt))}{" "}
                        <span className="fa fa-check-circle ml-1"></span>
                      </div>
                    </li>
                  ))
                : ""}
            </ScrollToBottom>
          </ul>
          <div
            className="form-group mt-3 mb-0"
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
          >
            <textarea
              className="form-control"
              rows="3"
              value={text}
              onChange={({ target }) => setText(target.value)}
              placeholder="Type your message here..."
            ></textarea>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleClick}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Messages;
