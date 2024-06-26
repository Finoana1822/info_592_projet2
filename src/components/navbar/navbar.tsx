import React, { useRef } from "react";
import { menuLink } from "./link";
import { MenuType } from "../../@types/menu.type";
import { Link } from "react-router-dom";
import LogoutModal from "../modals/logout.modal";

const Navbar: React.FC = () => {
  const sidebarToogle = useRef<HTMLElement | null>(null);
  return (
    <>
      <aside id="sidebar" ref={sidebarToogle}>
        <div className="d-flex">
          <button
            className="toggle-btn"
            type="button"
            onClick={() => {
              if (sidebarToogle)
                sidebarToogle.current?.classList.toggle("expand");
            }}
          >
            <i className="lni lni-grid-alt"></i>
          </button>
          <div className="sidebar-logo">
            <a href="#">KeFiElFa</a>
          </div>
        </div>
        <ul className="sidebar-nav">
          {menuLink.map((menu: MenuType, index: number) => (
            <li key={index} className="sidebar-item">
              {menu.subMenu ? (
                <>
                  <a
                    href={""}
                    className="sidebar-link collapsed has-dropdown"
                    data-bs-toggle="collapse"
                    data-bs-target={`#auth-${index}`}
                    aria-expanded="false"
                    aria-controls={`auth-${index}`}
                  >
                    <i className={menu.iconName}></i>
                    <span>{menu.menu}</span>
                  </a>
                  <ul
                    id={`auth-${index}`}
                    className="sidebar-dropdown list-unstyled collapse"
                    data-bs-parent="#sidebar"
                  >
                    {menu.subMenu.map((sub: MenuType, subIndex: number) => (
                      <li key={subIndex} className="sidebar-item">
                        <Link to={sub.route} className="sidebar-link">
                          {sub.menu}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={menu.route} className="sidebar-link">
                  <i className={menu.iconName}></i>
                  <span>{menu.menu}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div
          className="sidebar-footer d-flex justify-content-center"
          title="logout"
        >
          <a className="sidebar-link" href="#logout" data-bs-toggle="modal">
            <i className="lni lni-exit"></i>
            <span>Logout</span>
          </a>
        </div>
      </aside>
      <LogoutModal />
    </>
  );
};

export default Navbar;
