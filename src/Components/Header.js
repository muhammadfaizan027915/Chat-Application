import React from "react";
import { logout } from "../Api/api";

const Header = ({ user, setUser, open, socket }) => {
  const handleClick = () => {
    logout().then(() => {
      setUser(null);
      open(true);
      socket.emit("logout");
    });
  };

  return (
    <div className="page-title">
      <div className="row gutters px-3">
        <div
          className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h5 className="title">Chat App</h5>
          {user ? (
            <a
              onClick={handleClick}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Logout
            </a>
          ) : (
            ""
          )}
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
      </div>
    </div>
  );
};

export default Header;
