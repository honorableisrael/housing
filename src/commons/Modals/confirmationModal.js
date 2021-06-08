import React from "react";
import * as Icons from "react-feather";
import QuestionIcon from "../../assets/questionImg.png";
import "./Modals.css";

const ConfirmationModal = (props) => {
  return (
    <div
      className='modal fade show'
      id='confirmationModal'
      tabindex='-1'
      role='dialog'
      aria-labelledby='confirmationModalTitle'
      aria-hidden='true'
      style={{display:props.display}}
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
              <span aria-hidden='true' onClick={()=>window.location.reload()}>
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
                  Your Equity Contribution is <strong>{props.equity_percent}%</strong>
                </h3>
                <h2>
                  ₦ {props.equity_contribution} <small></small>
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
export default ConfirmationModal;
