import React, { useState } from "react";
import "./Forms.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import Axios from "axios";
import { API } from "../../config";

const AfordabilityFormStepOne = (props) => {
  const [state, setState] = useState({
    monthly_income: "",
    net_monthly: "",
    loanObligations: "",
    additional_income: "",
    monthly_repayment: "",
    have_other_loan: false,
    additonalIncome: false,
    borrowType: "",
    borrowed_from_partner: false,
    date_of_birth: "",
    loan_period: "",
    location: "",
    retirement_age: 55,
  });
  const [period, setPeriod] = useState({
    max_loan_period: 30,
    min_loan_period: 1,
  });
  const handleOnChange = (value) => {
    setState({
      ...state,
      volume: value,
    });
  };
  // const history = useHistory();
  // const navigateTo = () => history.push("/componentURL");
  const FormatAmount = (amount) => {
    if (amount) {
      return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "date_of_birth") {
      calculate_period(e.target.value);
    }
  };
  const calculate_period = (x) => {
    const today = new Date();
    const thisyear = today.getFullYear();
    const user_age = thisyear - parseInt(x.split("-")[0]);
    console.log(retirement_age - user_age);
    if (retirement_age - user_age < 30) {
      console.log("lower");
      return setPeriod({
        ...period,
        max_loan_period: retirement_age - user_age,
      });
    }
    if (retirement_age - user_age >= 30) {
      console.log("higher");
      return setPeriod({
        ...period,
        max_loan_period: 30,
      });
    }
  };
  const onInputChange = (e) => {
    const letterNumber = /^[A-Za-z]+$/;
    if (e.target.value) {
      return setState({
        ...state,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, ""), //only accept numbers
      });
    }
    if (e.target.value < 0) {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
    if (e.target.value === "") {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
  };
  const submitAffordabilityTestStage1 = () => {
    Axios.post(`${API}/general/affordability-test`)
      .then((resp) => {

        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let {
    volume,
    date_of_birth,
    retirement_age,
    net_monthly,
    location,
    additonalIncome,
    additional_income,
    loanObligations,
    monthly_repayment,
    borrowType,
  } = state;

  console.log(monthly_repayment);
  return (
    <>
      <form>
        <div className="form-wrapper step-one-form">
          <div className="form-group row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label className="form-control-label">
                Net Monthly Income
                <span className="text-danger">*</span>
              </label>
              <div className="input-group input-group-merge">
                <div className="input-group-prepend">
                  <span className="input-group-text">₦</span>
                </div>
                <input
                  type="text"
                  name="net_monthly"
                  className="form-control "
                  value={FormatAmount(net_monthly)}
                  onChange={onInputChange}
                  placeholder="What is your Net Monthly Income"
                />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <legend className="form-control-label">
                Do you have Additional Income?
                <span className="text-danger">*</span>
              </legend>
              <div className="form-checkbox row">
                <div className="col-lg-6">
                  <label>
                    <input
                      type="radio"
                      name="additonalIncome"
                      onChange={onchange}
                      value="Yes"
                    />
                    <span> Yes i do</span>
                  </label>
                </div>
                <div className="col-lg-6">
                  <label>
                    <input
                      type="radio"
                      onChange={onchange}
                      name="additonalIncome"
                      value="No"
                    />
                    <span> No i do not</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {additonalIncome == "Yes" && (
            <div className="form-group row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <label className="form-control-label">
                  Net Monthly Additional Income
                  <span className="text-danger">*</span>
                </label>
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">₦</span>
                  </div>
                  <input
                    type="text"
                    name="additional_income"
                    value={FormatAmount(additional_income)}
                    onChange={onInputChange}
                    className="form-control "
                    placeholder="How much Additional Income do you earn Monthly"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="form-group row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <legend className="form-control-label">
                Do you have other Loan obligations?
                <span className="text-danger">*</span>
              </legend>
              <div className="form-checkbox row">
                <div className="col-lg-6">
                  <label>
                    <input
                      type="radio"
                      onChange={onchange}
                      name="loanObligations"
                      value="Yes"
                    />
                    <span> Yes i do</span>
                  </label>
                </div>
                <div className="col-lg-6">
                  <label>
                    <input
                      type="radio"
                      onChange={onchange}
                      name="loanObligations"
                      value="No"
                    />
                    <span> No i do not</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {loanObligations == "Yes" && (
            <div className="form-group row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <label className="form-control-label">
                  Monthly Loan Repayment
                  <span className="text-danger">*</span>
                </label>
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">₦</span>
                  </div>
                  <input
                    type="text"
                    value={monthly_repayment}
                    name="monthly_repayment"
                    className="form-control "
                    placeholder="Currently Monthly Loan Repayments (If Any)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* <div className="form-group row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label className="form-control-label">
                Partners net monthly income
                <span className="text-danger">*</span>
              </label>
              <div className="input-group input-group-merge">
                <div className="input-group-prepend">
                  <span className="input-group-text">₦</span>
                </div>
                <input
                  type="text"
                  name="title"
                  min={"2021-01-01"}
                  className="form-control "
                  placeholder="Date of Birth"
                />
              </div>
            </div>
          </div> */}

          <div className="form-group row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <legend className="form-control-label">
                Are you borrowing with a Partner?
                <span className="text-danger">*</span>
              </legend>

              <div className="form-checkbox row">
                <div className="col-lg-6">
                  <label>
                    <input
                      type="radio"
                      onChange={onchange}
                      name="borrowType"
                      value="Yes"
                    />
                    <span> Yes i am</span>
                  </label>
                </div>
                <div className="col-lg-6">
                  <label>
                    <input
                      type="radio"
                      onChange={onchange}
                      name="borrowType"
                      value="No"
                    />
                    <span> No i am not</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {borrowType == "Yes" && (
            <div className="form-group row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <label className="form-control-label">
                  Partner’s Net Monthly Income
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
                    placeholder="What is your Current Partner’s Net Monthly Income?"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="form-group row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label className="form-control-label">
                Date of Birth
                <span className="text-danger">*</span>
              </label>
              <div className="input-group input-group-merge">
                <div className="input-group-prepend">
                  {/* <span className="input-group-text">₦</span> */}
                </div>
                <input
                  type="date"
                  name="date_of_birth"
                  value={date_of_birth}
                  onChange={onchange}
                  min={"1966-01-01"}
                  max={"2000-01-01"}
                  className="form-control "
                  placeholder="Date of Birth"
                />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label className="form-control-label">
                How long do you want this Loan for?
                <span className="text-danger">*</span>
              </label>
              <Slider
                value={volume}
                min={1}
                max={period.max_loan_period}
                title={volume}
                orientation="horizontal"
                onChange={handleOnChange}
              />
              <div className="amountwrap">
                <div className="amountwrap2">{period.min_loan_period}</div>
                <div className="amountwrap2">{period.max_loan_period}</div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label className="form-control-label">
                Location
                <span className="text-danger">*</span>
              </label>
              <div className="input-group input-group-merge">
                <div className="input-group-prepend">
                  {/* <span className="input-group-text">₦</span> */}
                </div>
                <input
                  type="text"
                  name="location"
                  className="form-control "
                  value={location}
                  onChange={onchange}
                  placeholder="Where is your preferred Location (Eg. Lagos, Abuja)"
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
              onClick={() =>
                (window.location.href = "/affordability-test/result")
              }
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default AfordabilityFormStepOne;
