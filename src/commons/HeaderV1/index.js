import React from "react";
import {Link} from "react-router-dom";

import logo from "../../assets/HSF-LOGO.png";

import "./HeaderV1.css";

const main_header_page = () => {
  return (
    <nav
      id='nav-scroll'
      className='navbar navbar-expand-md navbar-dark navbar-light custom-navbar sticky-top'
    >
      <div className='container-fluid'>
        <a className='d-none d-xl-block' href='/'>
          <img
            className='navbar-brand'
            src={logo}
            alt='Gecenyi Oil &amp; Gas Services '
          />
        </a>
        <div className='navbar-collapse' id='navbarText'>
          <ul className='navbar-nav ml-auto d-none d-xl-block navigation'>
            <li
              className={
                window.location.pathname == "/" ? "nav-item active" : "nav-item"
              }
            >
              <Link className='nav-link' to={"/"}>
                Home
              </Link>
            </li>

            <li
              className={
                window.location.pathname == "/" ? "nav-item active" : "nav-item"
              }
            >
              <Link className='nav-link' to='/'>
                Properties
              </Link>
            </li>

            <li
              className={
                window.location.pathname == "/" ? "nav-item active" : "nav-item"
              }
            >
              <Link className='nav-link' to='/'>
                Mortgage
              </Link>
            </li>

            <li
              className={
                window.location.pathname == "/support/contact-us"
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link className='nav-link' to='/support/contact-us'>
                Contact Us
              </Link>
            </li>

            <li
              className={
                window.location.pathname ==
                "/support/frequently-asked-questions"
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link
                className='nav-link'
                to='/support/frequently-asked-questions'
              >
                FAQs
              </Link>
            </li>

            <li
              className={
                window.location.pathname == "/" ? "nav-item active" : "nav-item"
              }
            >
              <Link className='nav-link' to='/'>
                Login
              </Link>
            </li>

            <li className='nav-item'>
              <a className='nav-link btnGetStarted' href=''>
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default main_header_page;
