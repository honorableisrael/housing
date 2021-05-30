import React from "react";
import {Helmet} from "react-helmet";
import MainHeader from "../../commons/HeaderV1";
import AuthLoginForm from "../../commons/Forms/AuthLoginForm";

import "./Auth.css";

const AuthPageLogin = () => {
  return (
    <main className='theme-bg auth'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          Login - Housing Solution Fund | Real Estate, NHF, Mortgages &amp; Home
          Loans
        </title>
        <link rel='canonical' href='/auth/login' />
      </Helmet>
      <MainHeader />
      <section className='auth-page login'>
        <div className='container'>
          <div className='row'>
            <div className='offset-lg-3 col-lg-6'>
              <AuthLoginForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default AuthPageLogin;
