import React from "react";
import { Helmet } from "react-helmet";
import MainHeader from "../../commons/HeaderV1";
import GeneralFooter from "../../commons/GeneralFooter";
import ProgressSlider from "../../commons/ProgressSlider";
import AfordabilityFormStepTwo from "../../commons/Forms/AfordabilityFormStepTwo";
import ConfirmationModal from "../../commons/Modals/confirmationModal";

import "../AffordabilityResultPage/AffordabilityResultPage.css";
import "./AffordabilityTestDownPayment.css";
import { FormatAmount } from "../../commons/User_Dashboard/controller";

const ResultHeader = (props) => {
    console.log(props)
  return (
    <>
      <section className="affordability-result-page">
        <div className="container">
          <div className="affordability-result-top-content">
            <div className="row">
              <div className="col-lg-12">
                <div className="affordability-result-card">
                  <div className="maximum-loan-amount-card w30">
                    <h4>Your Maximum Loanable Amount</h4>
                    <h2>
                      ₦ {FormatAmount(props?.loandetails?.loanable_amount)}<small></small>
                    </h2>
                  </div>
                  <div className="monthly-repayment-card w30">
                    <h4>Estimated Monthly Repayment</h4>
                    <h2>
                      ₦ {FormatAmount(props?.loandetails?.monthly_payment)}<small></small>
                    </h2>
                  </div>
                  <div className="maximum-tenure-card w30">
                    <h4>Maximum Tenure</h4>
                    <h2>{props?.loandetails?.loan_tenure} Years</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ResultHeader;
