import React from "react";
import {Helmet} from "react-helmet";
import MainHeader from "../../commons/HeaderV1";
import GeneralFooter from "../../commons/GeneralFooter";
import ProgressSlider from "../../commons/ProgressSlider";
import AfordabilityFormStepTwo from "../../commons/Forms/AfordabilityFormStepTwo";
import ConfirmationModal from "../../commons/Modals/confirmationModal";

import "../AffordabilityResultPage/AffordabilityResultPage.css";
import "./AffordabilityTestDownPayment.css";

const affordabilityTestDownPayment = () => {
  return (
    <main className='theme-bg'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          Affordability Result - Housing Solution Fund | Real Estate, NHF,
          Mortgages &amp; Home Loans
        </title>
        <link rel='canonical' href='' />
      </Helmet>
      <MainHeader />
      <section className='affordability-result-page'>
        <div className='container'>
          <div className='affordability-result-top-content'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='affordability-result-card'>
                  <div className='maximum-loan-amount-card w30'>
                    <h4>Your Maximum Loanable Amount</h4>
                    <h2>
                      $ 68,000,000.<small>00</small>
                    </h2>
                  </div>

                  <div className='monthly-repayment-card w30'>
                    <h4>Estimated Monthly Repayment</h4>
                    <h2>
                      $ 68,000,000.<small>00</small>
                    </h2>
                  </div>

                  <div className='maximum-tenure-card w30'>
                    <h4>Maximum Tenure</h4>
                    <h2>20 Years</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='affordability-form'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='affordability-form-top-content'>
                <h2>You are almost there</h2>
                <p>
                  These steps are necessary to complete your mortgage
                  application
                </p>
              </div>

              <div className='affordability-form-wrapper'>
                <ProgressSlider stage='stepTwo' />
                <AfordabilityFormStepTwo />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ConfirmationModal />
      <GeneralFooter />
    </main>
  );
};
export default affordabilityTestDownPayment;
