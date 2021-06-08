import React, { useEffect, useState } from "react";
import "./Forms.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { FormatAmount } from "../User_Dashboard/controller";
import { withRouter } from "react-router";
import ConfirmationModal from "../Modals/confirmationModal";

const AfordabilityFormStepTwo = withRouter((props) => {
  const [state, setState] = useState({
    loaninformation: {},
    down_payment: "",
    loanable_amount: "",
    property_value: "",
    expected_equity_contribution: "",
    volume: 10,
    show: false,
  });
  const [period, setPeriod] = useState({
    max_loan_period: 99,
    min_loan_period: 10,
  });
  useEffect(() => {
    window.scrollTo(-0, -0);
    const loan_ = localStorage.getItem("loan_result");
    const loan_info = JSON.parse(loan_);
    const property_details_ = localStorage.getItem("property_details");
    const property_details = JSON.parse(property_details_);
    console.log(loan_info);
    setState({
      ...state,
      loaninformation: loan_info,
      loanable_amount: loan_info?.loanable_amount,
      property_value: property_details.property_price,
    });
  }, []);
  const handleOnChange = (value) => {
    setState({
      ...state,
      volume: value,
    });
  };
  const handleSubmit = () => {
    localStorage.setItem(
      "downpayment_summary",
      JSON.stringify({
        property_value,
        loanable_amount:
          property_value - calculator()?.equity_contribution_value?.toFixed(2),
        equity_contribution_value:
          calculator()?.equity_contribution_value?.toFixed(2),
      })
    );
    setState({
      ...state,
      show: true,
    });

    // props.history.push("/affordability-test/confirmation");
  };
  const calculator = () => {
    let loanable_amount_ = parseInt(loanable_amount);
    let property_value_ = parseInt(property_value);
    console.log(loanable_amount);
    console.log(property_value_);
    let p = (loanable_amount_ / property_value_) * 100;
    console.log(loanable_amount);
    if (p > 100) {
      console.log("step1");
      const expectedEquityContributionPercent = volume;
      const equity_contribution_value =
        (expectedEquityContributionPercent / 100) * property_value_;
      console.log(equity_contribution_value);
      const newloanableamount =
        (90 / 100) * property_value < loanable_amount
          ? (90 / 100) * property_value
          : loanable_amount;
      return {
        equity_contribution_value,
        expectedEquityContributionPercent,
        newloanableamount,
      };
    }
    if (p < 10) {
      console.log("step2a");
      const expectedEquityContributionPercent = volume;
      console.log(expectedEquityContributionPercent);
      const equity_contribution_value =
        (expectedEquityContributionPercent / 100) * property_value_;
      const newloanableamount =
        property_value_ - newloanableamount < loanable_amount
          ? property_value_ - newloanableamount
          : loanable_amount;
      return {
        equity_contribution_value,
        expectedEquityContributionPercent,
        newloanableamount,
      };
    }
    if (p !== 100) {
      console.log("step2");
      const expectedEquityContributionPercent = volume;
      console.log(expectedEquityContributionPercent);
      const equity_contribution_value =
        (expectedEquityContributionPercent / 100) * property_value_;
      console.log(equity_contribution_value);
      return { equity_contribution_value, expectedEquityContributionPercent };
    }
    if (p == 100 || p > 100) {
      console.log("step3");
      let p = 90;
      loanable_amount_ = (p / 100) * property_value_;
      console.log(loanable_amount_);
      const expectedEquityContributionPercent = 100 - p;
      console.log(expectedEquityContributionPercent);
      const equity_contribution_value =
        (expectedEquityContributionPercent / 100) * property_value_;
      console.log(equity_contribution_value);
      const newloanableamount =
        property_value_ - newloanableamount < loanable_amount
          ? property_value_ - newloanableamount
          : loanable_amount;
      return {
        equity_contribution_value,
        newloanableamount,
        expectedEquityContributionPercent,
      };
    }
  };
  const {
    volume,
    loaninformation,
    down_payment,
    loanable_amount,
    property_value,
    expected_equity_contribution,
  } = state;
  console.log(property_value-loanable_amount);
  return (
    <form>
      <div className="form-wrapper down-payment">
        <div className="form-group row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className="form-control-label">
              Property Value
              <span className="text-danger">*</span>
            </label>
            <div className="input-group input-group-merge">
              <div className="input-group-prepend">
                <span className="input-group-text">₦</span>
              </div>
              <input
                type="text"
                name="title"
                className="form-control "
                placeholder=""
                value={FormatAmount(property_value)}
                readOnly
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className="form-control-label">
              Loan Amount <span className="text-danger">*</span>
            </label>
            <div className="input-group input-group-merge">
              <div className="input-group-prepend">
                <span className="input-group-text">₦</span>
              </div>
              <input
                type="text"
                name="title"
                className="form-control "
                placeholder=""
                value={
                  property_value - calculator()?.equity_contribution_value <
                  loanable_amount
                    ? FormatAmount(
                        property_value -
                          calculator()?.equity_contribution_value?.toFixed(2)
                      )
                    : FormatAmount  (loanable_amount)
                }
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className="form-control-label">Equity Contribution</label>
            {/* <div className='range'>
              <input type='range' min='10' max='100' value='40' />
              <div className='d-flex justify-content-between'>
                <span>10%</span>
                <span>100%</span>
              </div>
              <div className='range-output'>
                <output
                  className='output'
                  name='output'
                  for='range'
                  style={{transform: "translate(155px, 25px)"}}
                >
                  60%
                </output>
              </div>
            </div> */}
            <Slider
              value={volume}
              min={10}
              max={period.max_loan_period}
              title={calculator().expectedEquityContributionPercent}
              orientation="horizontal"
              labels={calculator().expectedEquityContributionPercent}
              onChange={handleOnChange}
            />
            <div className="amountwrap">
              <div className="amountwrap2">{period.min_loan_period}</div>
              <div className="amountwrap2">{period.max_loan_period}</div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className="form-control-label">
              Equity Contribution Amount
              <span className="text-danger">*</span>
            </label>
            <div className="input-group input-group-merge">
              <div className="input-group-prepend">
                <span className="input-group-text">₦</span>
              </div>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder=""
                value={property_value - calculator()?.equity_contribution_value <
                  loanable_amount
                    ? FormatAmount(
                          calculator()?.equity_contribution_value?.toFixed(2)
                      )
                    : FormatAmount  (parseInt(property_value) - parseInt(calculator()?.equity_contribution_value))}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        show=""
        display=""
        equity_percent={calculator().expectedEquityContributionPercent}
        equity_contribution={FormatAmount(
          calculator()?.equity_contribution_value?.toFixed(2)
        )}
      />
      <div className="form-group row">
        <div className="offset-lg-3 col-lg-6">
          <button
            type="button"
            className="affordability-form-btn"
            // data-toggle="modal"
            // data-target="#confirmationModal"
            onClick={handleSubmit}
          >
            Continue
          </button>
          {state.show && (
            <ConfirmationModal
              show=""
              display="block"
              equity_percent={calculator().expectedEquityContributionPercent}
              equity_contribution={FormatAmount(
                calculator()?.equity_contribution_value?.toFixed(2)
              )}
            />
          )}
        </div>
      </div>
    </form>
  );
});
export default AfordabilityFormStepTwo;
