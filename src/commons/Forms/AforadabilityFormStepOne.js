import React from "react";
import "./Forms.css";

const afordabilityFormStepOne = (props) => {
  // const history = useHistory();
  // const navigateTo = () => history.push("/componentURL");
  return (
    <form>
      <div className='form-wrapper step-one-form'>
        <div className='form-group row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <label className='form-control-label'>
              Net Monthly Income
              <span className='text-danger'>*</span>
            </label>
            <div className='input-group input-group-merge'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>₦</span>
              </div>
              <input
                type='text'
                name='title'
                className='form-control '
                placeholder='What is your Net Monthly Income'
              />
            </div>
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <legend className='form-control-label'>
              Do you have Additional Income?
              <span className='text-danger'>*</span>
            </legend>

            <div className='form-checkbox row'>
              <div className='col-lg-6'>
                <label>
                  <input
                    type='radio'
                    name='additonalIncome'
                    value='Yes'
                    checked
                  />
                  <span> Yes i do</span>
                </label>
              </div>
              <div className='col-lg-6'>
                <label>
                  <input type='radio' name='additonalIncome' value='No' />
                  <span> No i do not</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <label className='form-control-label'>
              Net Monthly Additional Income
              <span className='text-danger'>*</span>
            </label>
            <div className='input-group input-group-merge'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>₦</span>
              </div>
              <input
                type='text'
                name='title'
                className='form-control '
                placeholder='How much Additional Income do you earn Monthly'
              />
            </div>
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <legend className='form-control-label'>
              Do you have other Loan obligations?
              <span className='text-danger'>*</span>
            </legend>

            <div className='form-checkbox row'>
              <div className='col-lg-6'>
                <label>
                  <input type='radio' name='loanObligations' value='Yes' />
                  <span> Yes i do</span>
                </label>
              </div>
              <div className='col-lg-6'>
                <label>
                  <input
                    type='radio'
                    name='loanObligations'
                    value='No'
                    checked
                  />
                  <span> No i do not</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <label className='form-control-label'>
              Monthly Loan Repayment
              <span className='text-danger'>*</span>
            </label>
            <div className='input-group input-group-merge'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>₦</span>
              </div>
              <input
                type='text'
                name='title'
                className='form-control '
                placeholder='Currently Monthly Loan Repayments (If Any)'
              />
            </div>
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <label className='form-control-label'>
              Date of Birth
              <span className='text-danger'>*</span>
            </label>
            <div className='input-group input-group-merge'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>₦</span>
              </div>
              <input
                type='text'
                name='title'
                className='form-control '
                placeholder='Date of Birth'
              />
            </div>
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <legend className='form-control-label'>
              Are you borrowing with a Partner?
              <span className='text-danger'>*</span>
            </legend>

            <div className='form-checkbox row'>
              <div className='col-lg-6'>
                <label>
                  <input type='radio' name='borrowType' value='Yes' />
                  <span> Yes i am</span>
                </label>
              </div>
              <div className='col-lg-6'>
                <label>
                  <input type='radio' name='borrowType' value='No' checked />
                  <span> No i am not</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <label className='form-control-label'>
              Date of Birth
              <span className='text-danger'>*</span>
            </label>
            <div className='input-group input-group-merge'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>₦</span>
              </div>
              <input
                type='text'
                name='title'
                className='form-control '
                placeholder='What is your Current Partner’s Net Monthly Income?'
              />
            </div>
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <label className='form-control-label'>
              How long do you want this Loan for?
              <span className='text-danger'>*</span>
            </label>
            <div className='range'>
              <input type='range' min='10' max='100' value='60' />
              <div className='d-flex justify-content-between'>
                <span>10%</span>
                <span>100%</span>
              </div>
              <div className='range-output'>
                <output
                  className='output'
                  name='output'
                  for='range'
                  style={{transform: "translate(389px, 25px)"}}
                >
                  60%
                </output>
              </div>
            </div>
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <label className='form-control-label'>
              Location
              <span className='text-danger'>*</span>
            </label>
            <div className='input-group input-group-merge'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>₦</span>
              </div>
              <input
                type='text'
                name='title'
                className='form-control '
                placeholder='Where is your preferred Location (Eg. Lagos, Abuja)'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='form-group row'>
        <div className='offset-lg-3 col-lg-6'>
          <button
            type='button'
            className='affordability-form-btn'
            onClick={() =>
              (window.location.href = "/affordability-test/result")
            }
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};
export default afordabilityFormStepOne;
