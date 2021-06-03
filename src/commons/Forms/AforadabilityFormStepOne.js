import React, { useEffect, useState } from "react";
import "./Forms.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import Axios from "axios";
import { API } from "../../config";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import successfullysaved from "../../assets/successfullysaved.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

const AfordabilityFormStepOne = withRouter((props) => {
  const inputEl = React.useRef("");
  const inputE2 = React.useRef("");
  const inputE3 = React.useRef("");
  const inputE4 = React.useRef("");
  const inputE5 = React.useRef("");
  const inputE6 = React.useRef("");
  const [state, setState] = useState({
    monthly_income: "",
    net_monthly: "",
    loanObligations: "",
    additional_income: "",
    monthly_repayment: "0",
    isloading: "",
    have_other_loan: false,
    additonalIncome: false,
    borrowType: "",
    partner_income: "",
    date_of_birth: "",
    loan_period: "",
    modalIsOpen: "",
    location: "",
    condition: false,
    errorMessage: "",
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
  const customStyles = {
    content: {
      top: "56%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "3rem 2rem",
      borderRadius: "20px",
      zIndex: "3333",
    },
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
  };
  const changeHandler = (e) => {
    const inputValdate = inputEl.current.value;
    console.log(inputValdate);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "date_of_birth") {
      calculate_period(inputValdate.toString());
    }
  };
  const calculate_period = (x) => {
    console.log(x);
    if (parseInt(x.split("-")[0])) {
      console.log("Condition 1");
      const today = new Date();
      const thisyear = today.getFullYear();
      const user_age = thisyear - parseInt(x.split("-")[0]);
      console.log(user_age);
      const retirement_age = 55;
      console.log(retirement_age - user_age);
      if (retirement_age - user_age < 30 && retirement_age - user_age > 0) {
        console.log("lower");
        return setPeriod({
          ...period,
          max_loan_period: retirement_age - user_age,
        });
      }
      if (user_age >= 55 && user_age < 1400) {
        setTimeout(() => {
          setState({
            ...state,
            modalIsOpen: true,
            errorMessage:
              "Age validation failed user cannot apply for loan after the retirement age of 55",
          });
        }, 2000);
      }
      if (retirement_age - user_age < 0) {
        console.log("Condition 3");
        return setPeriod({
          ...period,
          max_loan_period: 0,
        });
      }
      if (retirement_age - user_age >= 30) {
        console.log("Condition 4");
        console.log("higher");
        return setPeriod({
          ...period,
          max_loan_period: 30,
        });
      }
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
    const today = new Date();
    const thisyear = today.getFullYear();
    const user_age = thisyear - parseInt(date_of_birth.split("-")[0]);
    if (!user_age) {
      return setState({
        ...state,
        errorMessage: "Invalid date of birth",
        modalIsOpen: true,
      });
    }
    if (user_age < 21) {
      return setState({
        ...state,
        modalIsOpen: true,
        errorMessage: "The minimum age is 21",
      });
    }
    if (user_age > 55) {
      return setState({
        ...state,
        modalIsOpen: true,
        errorMessage: "The minimum age is 21",
      });
    }
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      monthly_net_pay: net_monthly,
      monthly_expenses: 0,
      loan_obligation: monthly_repayment,
      age: user_age,
      dob: date_of_birth,
      loan_tenure: volume,
    };
    console.log(data);
    Axios.post(`${API}/general/affordability-test`, data)
      .then((resp) => {
        console.log(resp.data.data);
        localStorage.setItem("loan_result", JSON.stringify(resp.data.data));
        setState({
          ...state,
          isloading: false,
        });
        !state.condition
          ? setTimeout(() => {
              props.history.push("/affordability-test/down-payment");
            }, 1000)
          : setTimeout(() => {
              props.history.push("/affordability-test/result");
            }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const closeModal = () => {
    setState({
      ...state,
      modalIsOpen: false,
    });
    window.location.reload();
  };
  let {
    volume,
    date_of_birth,
    retirement_age,
    net_monthly,
    partner_income,
    location,
    additonalIncome,
    isloading,
    additional_income,
    loanObligations,
    monthly_repayment,
    borrowType,
    modalIsOpen,
    errorMessage,
  } = state;
  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const condition = query.get("noselection");
    console.log(condition);
    if (condition == "true") {
      setState({
        ...state,
        condition: true,
      });
    }
  }, []);
  console.log(net_monthly);
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="schcc12 retirmt">
          {/* <img
              src={successfullysaved}
              className="successfullysaved"
              alt="successfullysaved"
            /> */}
        </div>
        <div className="schcc">{errorMessage}</div>
        <div className="schcc2"> </div>
        <div className="text-center"></div>
      </Modal>
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
                    value={FormatAmount(monthly_repayment)}
                    onChange={onInputChange}
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
                    name="partner_income"
                    value={FormatAmount(partner_income)}
                    onChange={onInputChange}
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
                  onChange={changeHandler}
                  ref={inputEl}
                  min={"1967-01-01"}
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
              onClick={submitAffordabilityTestStage1}
            >
              {!isloading ? "Continue" : "Loading"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
});
export default AfordabilityFormStepOne;
