import React, { useEffect, useState } from "react";
import "./Forms.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const AfordabilityFormStepTwo = () => {
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
  const handleOnChange = (value) => {
    setState({
      ...state,
      volume: value,
    });
  };
  const { volume,max_down_payment,loaninformation } = state;
  console.log(loaninformation);
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
              min={1}
              max={max_down_payment}
              title={volume}
              orientation="horizontal"
              onChange={handleOnChange}
            />
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
                className="form-control "
                placeholder=""
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
