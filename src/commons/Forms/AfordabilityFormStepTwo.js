import React, { useEffect, useState } from "react";
import "./Forms.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { FormatAmount } from "../User_Dashboard/controller";

const AfordabilityFormStepTwo = () => {
  const [state, setState] = useState({
    loaninformation: {},
    down_payment: "",
    loanable_amount: "",
    property_value: "",
    expected_equity_contribution: "",
    max_down_payment: 30,
  });
  const [period, setPeriod] = useState({
    max_loan_period: 99,
    min_loan_period: 10,
  });
  useEffect(() => {
    const loan_ = localStorage.getItem("loan_result");
    const loan_info = JSON.parse(loan_);
    const property_details_ = localStorage.getItem("property_details");
    const property_details = JSON.parse(property_details_);
    console.log(loan_info)
    setState({
      ...state,
      loaninformation: loan_info,
      loanable_amount: loan_info.loanable_amount,
      property_value: property_details.property_price,
    });
  }, []);
  const handleOnChange = (value) => {
    setState({
      ...state,
      volume: value,
    });
  };

  const calculator = () => {
    let loanable_amount_ = parseInt(loanable_amount);
    let property_value_ = parseInt(property_value);
    console.log(loanable_amount);
    console.log(property_value_);
    let p = (loanable_amount_ / property_value_) * 100;
    if (p > 100) {
      const expectedEquityContributionPercent = 10;
      const equity_contribution_value =
        (expectedEquityContributionPercent / 100) * property_value_;
      console.log(equity_contribution_value);
      const newloanableamount = (90 / 100) * property_value;
      return {
        equity_contribution_value,
        expectedEquityContributionPercent,
        newloanableamount,
      };
    }
    if (p !== 100) {
      const expectedEquityContributionPercent = 100 - p;
      console.log(expectedEquityContributionPercent);
      const equity_contribution_value =
        (expectedEquityContributionPercent / 100) * property_value_;
      console.log(equity_contribution_value);
      return { equity_contribution_value, expectedEquityContributionPercent };
    }
    if (p == 100 || p > 100) {
      let p = 90;
      loanable_amount_ = (p / 100) * property_value_;
      console.log(loanable_amount_);
      const expectedEquityContributionPercent = 100 - p;
      console.log(expectedEquityContributionPercent);
      const equity_contribution_value =
        (expectedEquityContributionPercent / 100) * property_value_;
      console.log(equity_contribution_value);
      return { equity_contribution_value, expectedEquityContributionPercent };
    }
  };
  const {
    volume,
    max_down_payment,
    loaninformation,
    down_payment,
    loanable_amount,
    property_value,
    expected_equity_contribution,
  } = state;
  console.log(property_value);
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
                  property_value - down_payment > 0
                    ? FormatAmount(property_value - calculator()?.equity_contribution_value?.toFixed(2))
                    : 0
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
              value={calculator().expectedEquityContributionPercent}
              min={10}
              max={calculator().expectedEquityContributionPercent}
              title={calculator().expectedEquityContributionPercent}
              orientation="horizontal"
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
                value={FormatAmount(
                  calculator()?.equity_contribution_value?.toFixed(2)
                )}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group row">
        <div className="offset-lg-3 col-lg-6">
          <button
            type="button"
            className="affordability-form-btn"
            data-toggle="modal"
            data-target="#confirmationModal"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};
export default AfordabilityFormStepTwo;
