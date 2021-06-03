import React from "react";
import {Helmet} from "react-helmet";
import MainHeader from "../../commons/HeaderV1";
import GeneralFooter from "../../commons/GeneralFooter";
import ProgressSlider from "../../commons/ProgressSlider";
import AfordabilityFormStepOne from "../../commons/Forms/AforadabilityFormStepOne";

import "./AffordabilityTestPage.css";

const affordabilityTestPage = () => {
  return (
    <main className='theme-bg'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          Affordability Test - Housing Solution Fund | Real Estate, NHF,
          Mortgages &amp; Home Loans
        </title>
        <link rel='canonical' href='' />
      </Helmet>
      <MainHeader />

      <section className='affordability-form'>
        <div className='container'>
          <div className='row'>
            <div className='offset-lg-2 col-lg-8'>
              <div className='affordability-form-top-content'>
                <h2>How much can I Afford</h2>
                <p>
                  Calculate the home loan you qualify for, and how much you can
                  expect to pay monthly on your home loan repayments.
                </p>
              </div>
              <div className='affordability-form-wrapper standalone'>
                <ProgressSlider stage='stepOne' />
                <AfordabilityFormStepOne />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GeneralFooter />
    </main>
  );
};
export default affordabilityTestPage;
