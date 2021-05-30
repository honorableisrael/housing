import React, {useState} from "react";
import {Link} from "react-router-dom";
import * as Icons from "react-feather";
import Lock from "../../assets/icons/Lock.png";
import Message from "../../assets/icons/Message.png";
import "./Forms.css";

const AuthLoginForm = () => {
  const [hidden, setHidden] = useState(true);
  const toggleShow = () => setHidden(!hidden);
  return (
    <form>
      <div className='auth-wrapper'>
        <div className='auth-wrapper-top text-center'>
          <h2>Login</h2>
          <p>
            <span class='divider login'>Welcome Back, Lets get back to it</span>
          </p>
        </div>
        <div className='form-wrapper'>
          <div className='form-group row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <div className='auth-input-icon email'>
                <img src={Message} alt='Email Address' />
              </div>
              <input
                type='text'
                name='title'
                className='form-control '
                placeholder='Email Address'
              />
            </div>
          </div>

          <div className='form-group row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <div className='auth-input-icon password'>
                <img src={Lock} alt='Password' />
              </div>
              <input
                type={hidden ? "password" : "text"}
                name='title'
                className='form-control '
                placeholder='Password'
              />
              <div className='auth-password-show-hide-icon'>
                {hidden ? (
                  <Icons.Eye onClick={toggleShow} size='20px' />
                ) : (
                  <Icons.EyeOff onClick={toggleShow} size='20px' />
                )}
              </div>
            </div>
          </div>

          <div className='form-group row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <button type='button' className='auth-btn'>
                Login
              </button>
              <p>
                Don't have an Account?{" "}
                <Link to='/auth/register' className='site-link-btn'>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default AuthLoginForm;
