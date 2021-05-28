import React from "react";
import * as Icons from "react-feather";
import QuestionIcon from "../../assets/questionImg.png";
import "./Modals.css";

const confirmationModal = () => {
  return (
    <div
      className='modal fade'
      id='confirmationModal'
      tabindex='-1'
      role='dialog'
      aria-labelledby='confirmationModalTitle'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
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
            <div className='confirmation-wrapper'>
              <figure>
                <img src={QuestionIcon} alt='Question Icon' />
              </figure>
              <p>Are you sure you want to continue?</p>

              <div className='equity-content-wrapper'>
                <h3>
                  Your Equity Contribution is <strong>60%</strong>
                </h3>
                <h2>
                  ₦ 18,000,000. <small>00</small>
                </h2>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='other-action-cta-btn'
              onClick={() =>
                (window.location.href = "/affordability-test/result")
              }
            >
              Check other properties
            </button>
            <button
              type='button'
              className='proceed-cta-btn'
              onClick={() =>
                (window.location.href = "/affordability-test/confirmation")
              }
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default confirmationModal;
