import {
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContextLocation } from "../App";
import { getCurrentAccount } from "../utils";

const Header = () => {
  const isLogin: boolean = localStorage.getItem("account") !== null;
  const account = getCurrentAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const contextLocation: any = useContext(ContextLocation);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div onClick={handleLogout}>
          <LogoutOutlined />
          <span style={{ marginLeft: "4px" }}>Đăng xuất</span>
        </div>
      ),
    },
  ];

  return (
    <div className="header">
      <div className="header__left" onClick={() => navigate("/")}>
        <VideoCameraOutlined className="logo" /> <span>The Movie Database</span>
      </div>

      <div className="header__right">
        <div
          className="header__right__search-text"
          onClick={() => navigate("/search")}
        >
          Tìm kiếm phim
        </div>

        <SearchOutlined
          className="header__right__search-icon"
          onClick={() => navigate("/search")}
        />

        <div className="divider"></div>

        {isLogin ? (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <div className="header__right__btn">
              <UserOutlined className="header__right__btn__avatar" />
              <span>{account?.username}</span>
            </div>
          </Dropdown>
        ) : (
          <>
            <div
              className="header__right__btn"
              onClick={() => {
                contextLocation.setPreLocation(
                  location.pathname + location.search
                );
                navigate("/login");
              }}
            >
              Đăng nhập
            </div>

            <div className="divider"></div>

            <div
              className="header__right__btn"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
