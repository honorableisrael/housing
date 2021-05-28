import React, {useEffect} from "react";
import "./style.scss";
import {Button, Dropdown, Spinner} from "react-bootstrap";
import logo from "../../assets/HSF-LOGO.png";
import "../User_Dashboard/animate.css";
import {Link} from "react-router-dom";
import userimg from "../../assets/avatar.svg";
import arrowhead from "../../assets/arrowhead.png";
import settings from "../../assets/settings.png";
import exit from "../../assets/exit.png";
import {logOut} from "../User_Dashboard/controller";
import {API} from "../../config";
import axios from "axios";

const HomeNav = (props) => {
  const [state, setState] = React.useState({
    NavisOpen: false,
    theUserIsLoggedIn: false,
    isloading: false,
  });
  const {NavisOpen, isloading} = state;

  useEffect(() => {
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData ? JSON.parse(userData) : null;
    if (currentUser) {
      setState({
        ...state,
        theUserIsLoggedIn: true,
      });
    }
  }, []);
  const checkifuserisverifiedbeforemovingtodashboard = () => {
    window.scrollTo(-0, -0);
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/signin");
    console.log(currentUser);
    setState({
      ...state,
      email: currentUser?.user?.email,
      isloading: true,
    });
    const userToken = localStorage.getItem("jwtToken");
    axios
      .all([
        axios.get(`${API}/user/get-profile`, {
          headers: {Authorization: `Bearer ${userToken}`},
        }),
      ])
      .then(
        axios.spread((res4) => {
          if (res4?.data?.data?.is_verified == 0) {
            return window.location.assign("/account-verification");
          }
          console.log(res4);
          if (res4.status === 200) {
            window.location.assign("/userdashboard");
            setState({
              ...state,
              loggedinuser: res4.data.data,
              isloading: false,
            });
          }
          if (res4.status == 400) {
            props.history.push("/signin");
          }
        })
      )
      .catch((err) => {
        console.log(err.response);
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  return (
    <div className='fixfdnav'>
      <div className='navwrap'>
        <div className='logoarea'>
          <Link to='/'>
            <img src={logo} alt='logo' className='logo2' />
          </Link>
        </div>

        {!state.theUserIsLoggedIn && (
          <div className='otherwrap'>
            <Link to={"/"} className='flex-12a'>
              {" "}
              <span
                className={
                  window.location.pathname == "/"
                    ? "navlink_is_active"
                    : "navlink_is_active1"
                }
              >
                Home
              </span>
              {window.location.pathname == "/" && (
                <span className='boxdes'></span>
              )}
            </Link>
            <Link to={"/properties"} className='flex-12a'>
              {" "}
              <span
                className={
                  window.location.pathname == "/properties"
                    ? "navlink_is_active"
                    : "navlink_is_active1"
                }
              >
                Properties
              </span>
              {window.location.pathname == "/properties" && (
                <span className='boxdes'></span>
              )}
            </Link>
            <Link to={"/"} className='flex-12a'>
              {" "}
              <span
                className={
                  window.location.pathname == "/mortgage"
                    ? "navlink_is_active"
                    : "navlink_is_active1"
                }
              >
                Mortgage
              </span>
              {window.location.pathname == "/mortgage" && (
                <span className='boxdes'></span>
              )}
            </Link>
            <Link to='/support/contact-us' className='flex-12a'>
              <span
                className={
                  window.location.pathname == "/support/contact-us"
                    ? "navlink_is_active"
                    : "navlink_is_active1"
                }
              >
                Contact Us
              </span>
              {window.location.pathname == "/support/contact-us" && (
                <span className='boxdes'></span>
              )}
            </Link>
            <Link to={"/"} className='flex-12a'>
              {" "}
              <span
                className={
                  window.location.pathname == "/faq"
                    ? "navlink_is_active"
                    : "navlink_is_active1"
                }
              >
                FAQ
              </span>
              {window.location.pathname == "/faq" && (
                <span className='boxdes'></span>
              )}
            </Link>
            <Link to={"/"} className='flex-12a loginbtn_12'>
              {" "}
              <span className='navlink_is_active1 loginftcol'>Login</span>
              {window.location.pathname == "/mortgage" && (
                <span className='boxdes'></span>
              )}
            </Link>
            <Link to={"/signup"} className='height_fix'>
              <Button className='navsignup drkgrrn navsignup1 '>Sign Up</Button>
            </Link>
          </div>
        )}
        {state.theUserIsLoggedIn && (
          <div className='prrf'>
            <Dropdown className='uddrpdwndiv'>
              <Dropdown.Toggle className='ddprdown' id='dropdown-basic'>
                <img src={userimg} className='uimg' />
              </Dropdown.Toggle>
              <Dropdown.Toggle id='dropdown-basic' className='usernavdrpdwn' />
              <Dropdown.Menu className='animated fadeIn'>
                {/* <Dropdown.Item
                  href="#/action-1"
                  className="animated fadeInLeft"
                >
                  <img src={settings} className="exit" />{" "}
                  <Link to="/user-profile">Profile</Link>
                </Dropdown.Item> */}
                <Dropdown.Item className='animated fadeInLeft'>
                  <img src={settings} className='exit' />{" "}
                  <Link onClick={checkifuserisverifiedbeforemovingtodashboard}>
                    My Account
                  </Link>
                  {isloading && <Spinner animation='grow' />}
                </Dropdown.Item>
                {/* <Dropdown.Item href="#/action-1"><Link to="/user-profile">Settings</Link></Dropdown.Item> */}
                <Dropdown.Item
                  href='#/action-2'
                  className='animated fadeInLeft'
                  onClick={logOut}
                >
                  <img src={exit} className='exit' /> Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        <div
          className='mobileham'
          onClick={() => {
            setState({
              NavisOpen: NavisOpen ? false : true,
            });
          }}
        >
          {!NavisOpen ? (
            <>
              <div className='ham1 animated slideInLeft'></div>
              <div className='ham2 animated slideInLeft'></div>
              <div className='ham3 animated slideInLeft'></div>
            </>
          ) : (
            <span className='nvtimes animated slideInLeft'>&times;</span>
          )}
        </div>
      </div>
      {NavisOpen ? (
        <div className='ismobile animated slideInDown'>
          <div className='siggnup1 animated slideInRight'>
            {" "}
            <Link to='/'>
              <span className='navsignup2'>Home</span>
            </Link>
          </div>
          <div className='siggnup1 animated slideInRight'>
            {" "}
            <Link to='/properties'>
              <span className='navsignup2'>Properties</span>
            </Link>
          </div>
          <div className='siggnup1 animated slideInRight'>
            {" "}
            <Link to='/mortgage'>
              <span className='navsignup2'>Mortgage</span>
            </Link>
          </div>
          <div className='siggnup1 animated slideInRight'>
            {" "}
            <Link to='/contact'>
              <span className='navsignup2'>Contact Us</span>
            </Link>
          </div>
          <div className='siggnup1 animated slideInRight'>
            {" "}
            <Link to='/faq'>
              <span className='navsignup2'>FAQ</span>
            </Link>
          </div>
          <div className='siggnup1 animated slideInRight'>
            {" "}
            <Link to='/signin'>
              <Button className='navsignup1'>Sign In</Button>
            </Link>
          </div>
          <div className='siggnup animated slideInRight'>
            {" "}
            <Link to='/signup'>
              <Button className='navsignup navsignup1'>Sign Up</Button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomeNav;
