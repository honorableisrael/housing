import React, { useEffect, useState }  from "react";
import { Helmet } from "react-helmet";
import MainHeader from "../../commons/HeaderV1";
import GeneralFooter from "../../commons/GeneralFooter";
import ProgressSlider from "../../commons/ProgressSlider";
import AfordabilityFormStepTwo from "../../commons/Forms/AfordabilityFormStepTwo";
import ConfirmationModal from "../../commons/Modals/confirmationModal";

import "../AffordabilityResultPage/AffordabilityResultPage.css";
import "./AffordabilityTestDownPayment.css";
import ResultHeader from "./Resultheader";

const AffordabilityTestDownPayment = () => {
  const [state, setState] = useState({
    loaninformation: {},
    max_down_payment:30
  });
  useEffect(() => {
    const loan_ = localStorage.getItem("loan_result");
    const loan_info = JSON.parse(loan_);
    setState({
      ...state,
      loaninformation: loan_info,
    });
    
  }, []);
  const { volume,max_down_payment,loaninformation } = state;
  console.log(loaninformation);
  return (
    <main className="theme-bg">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Affordability Result - Housing Solution Fund | Real Estate, NHF,
          Mortgages &amp; Home Loans
        </title>
        <link rel="canonical" href="" />
      </Helmet>
      <MainHeader />
      <ResultHeader loandetails={loaninformation}/>

      <section className="affordability-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="affordability-form-top-content">
                <h2>You are almost there</h2>
                <p>
                  These steps are necessary to complete your mortgage
                  application
                </p>
              </div>

              <div className="affordability-form-wrapper">
                <ProgressSlider stage="stepTwo" />
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
export default AffordabilityTestDownPayment;
