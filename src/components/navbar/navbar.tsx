import React, { useEffect, useState } from "react";
import "../../styles/Navbar.scss";
import logo from "../../assets/blockbuster1.png";
import { Link, useLocation } from "react-router-dom";
import { menuLink } from "./link";
import { MenuType } from "../../@types/menu.type";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>("");
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand me-auto" to="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
              loading="lazy"
            />
            <span className="fs-4 fw-bold ms-2">BLOCKBUSTER</span>
          </Link>
          <div
            className="offcanvas offcanvas-end"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt=""
                  loading="lazy"
                />
                <span className="fs-4 fw-bold ms-2"> BLOCKBUSTER</span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                {menuLink.map((menu: MenuType, index: number) => (
                  <li className="nav-item" key={index}>
                    {menu.subMenu ? (
                      <div className="dropdown">
                        <a
                          className={`nav-link dropdown-toggle ${
                            activeLink === menu.route ? "active" : ""
                          }`}
                          href="#"
                          role="button"
                          id={`dropdown-link-${index}`}
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {menu.menu}
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby={`dropdown-link-${index}`}
                        >
                          {menu.subMenu.map(
                            (subMenuItem: MenuType, subIndex: number) => (
                              <Link
                                key={subIndex}
                                to={subMenuItem.route}
                                className={`dropdown-item ${
                                  activeLink === subMenuItem.route
                                    ? "active"
                                    : ""
                                }`}
                              >
                                {subMenuItem.menu}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={menu.route}
                        className={`nav-link mx-lg-2 ${
                          activeLink === menu.route ? "active" : ""
                        }`}
                        aria-current="page"
                      >
                        {menu.menu}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            className="navbar-toggler text-center"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
