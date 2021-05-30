import React, {useState} from "react";
import {Helmet} from "react-helmet";
import MainHeader from "../../commons/HeaderV1";
import AuthRegisterForm from "../../commons/Forms/AuthRegisterForm";

import "./Auth.css";

const AuthPageRegister = () => {
  return (
    <main className='theme-bg auth'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          Register - Housing Solution Fund | Real Estate, NHF, Mortgages &amp;
          Home Loans
        </title>
        <link rel='canonical' href='/auth/register' />
      </Helmet>
      <MainHeader />
      <section className='auth-page'>
        <div className='container'>
          <div className='row'>
            <div className='offset-lg-3 col-lg-6'>
              <AuthRegisterForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default AuthPageRegister;
