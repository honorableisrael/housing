import React, {useState} from "react";
import {Link} from "react-router-dom";
import * as Icons from "react-feather";
import Lock from "../../assets/icons/Lock.png";
import Message from "../../assets/icons/Message.png";
import User from "../../assets/icons/Profile.png";
import "./Forms.css";

const AuthRegisterForm = () => {
  const [hidden, setHidden] = useState(true);
  const toggleShow = () => setHidden(!hidden);
  return (
    <form>
      <div className='auth-wrapper'>
        <div className='auth-wrapper-top text-center'>
          <h2>Register</h2>
          <p>
            <span class='divider'>Welcome Back, Lets get back to it</span>
          </p>
        </div>
        <div className='form-wrapper'>
          <div className='form-group row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <div className='auth-input-icon user'>
                <img src={User} alt='Full Name' />
              </div>
              <input
                type='text'
                name='title'
                className='form-control '
                placeholder='Full Name'
              />
            </div>
          </div>

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
              <p>
                By signing up to Housing Solution Fund you agree to our{" "}
                <Link to='' className='site-link-btn'>
                  Private Policy
                </Link>{" "}
                and{" "}
                <Link to='' className='site-link-btn'>
                  Terms of Service
                </Link>
              </p>

              <button type='button' className='auth-btn'>
                Sign up
              </button>
              <p>
                Already have an Account?{" "}
                <Link to='/auth/login' className='site-link-btn'>
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
export default AuthRegisterForm;
