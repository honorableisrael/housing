import React from "react";
import "./Forms.css";

const afordabilityFormStepTwo = () => {
  return (
    <form>
      <div className='form-wrapper down-payment'>
        <div className='form-group row'>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <label className='form-control-label'>
              Property Value
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
                placeholder=''
                readOnly
              />
            </div>
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <label className='form-control-label'>
              Loan Amount <span className='text-danger'>*</span>
            </label>
            <div className='input-group input-group-merge'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>₦</span>
              </div>
              <input
                type='text'
                name='title'
                className='form-control '
                placeholder=''
                readOnly
              />
            </div>
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <label className='form-control-label'>Equity Contribution</label>
            <div className='range'>
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
            </div>
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <label className='form-control-label'>
              Equity Contribution Amount
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
                placeholder=''
                readOnly
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
            data-toggle='modal'
            data-target='#confirmationModal'
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};
export default afordabilityFormStepTwo;
