import React, { useEffect } from "react";
import { getUsers } from "../Api/api";

const Contacts = ({
  user,
  contacts,
  setContacts,
  selectedContact,
  setSelectedContact,
  onlineUsers,
}) => {
  useEffect(() => {
    if (user) {
      getUsers()
        .then((data) => {
          setContacts(data.users.filter((contact) => contact._id !== user._id));
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="users-container">
      <div className="chat-search-box">
        <div className="input-group">
          <input className="form-control" placeholder="Search" />
          <div className="input-group-btn">
            <button type="button" className="btn btn-info">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <ul className="users" style={{ height: "65vh", overflow: "auto" }}>
        {contacts ? (
          contacts.map((contact) => (
            <li
              className={
                contact._id === selectedContact
                  ? "person active-user"
                  : "person"
              }
              data-chat="person1"
              key={contact._id}
              onClick={() => setSelectedContact(contact._id)}
            >
              <div className="user">
                <img
                  src={
                    contact.imagelink
                      ? contact.imagelink
                      : "https://th.bing.com/th/id/R.945f33b643f2ceffcdae90fb57c61854?rik=XcI0SYBgSefoCA&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon-bw%2fanonymous-avatar-icon-19.png&ehk=5n%2buJG66CeLQZsmhaMt8gag5rXuM3TdebAL6W35K1E4%3d&risl=&pid=ImgRaw&r=0"
                  }
                  alt="Retail Admin"
                />
                <span
                  className={
                    onlineUsers?.find((user) => user?.userId === contact?._id)
                      ? "status online"
                      : "status offline"
                  }
                ></span>
              </div>
              <p className="name-time ">
                <span className="name">{contact.name}</span>
                <span className="time pl-2">{`@${contact.username}`}</span>
              </p>
            </li>
          ))
        ) : (
          <p className="px-4"> No any contact exists!</p>
        )}
      </ul>
    </div>
  );
};

export default Contacts;
