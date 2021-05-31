import React from "react";
import * as Icons from "react-feather";
import ProgressSlider from "../../commons/ProgressSlider";
import AfordabilityFormStepOne from "../../commons/Forms/AforadabilityFormStepOne";
import "./Modals.css";

const AffordablityTestModal = () => {
  return (
    <div
      className='modal fade'
      id='AffordabilityTestModal'
      tabindex='-1'
      role='dialog'
      aria-labelledby='AffordabilityTestModalTitle'
      aria-hidden='true'
    >
      <div
        className='modal-dialog modal-affordability-test modal-dialog-centered'
        role='document'
      >
        <div className='modal-content modal-affordability-test'>
          <div className='modal-header'>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>
                <Icons.X size='25' />
              </span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='affordability-test-wrapper'>
              <div class='affordability-form-top-content'>
                <h2>How much can i Afford</h2>
                <p>
                  Calculate the home loan you qualify for, and how much you can
                  expect to pay monthly on your home loan repayments.
                </p>
              </div>
              <ProgressSlider stage='stepOne' />
              <AfordabilityFormStepOne />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AffordablityTestModal;
