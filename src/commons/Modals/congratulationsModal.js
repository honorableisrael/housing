import React from "react";
import * as Icons from "react-feather";
import CongratsIcon from "../../assets/congratsIcon.png";
import "./Modals.css";

const CongratulationModal = () => {
  return (
    <div
      className='modal fade'
      id='congratulationModal'
      tabindex='-1'
      role='dialog'
      aria-labelledby='congratulationModalTitle'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content congratulation'>
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
            <div className='congratulation-wrapper'>
              <figure>
                <img src={CongratsIcon} alt='Congartulations Icon' />
              </figure>
              <h3>You have been Pre-Qualified to Apply for a Mortgage</h3>
              {/* <div className='equity-content-wrapper'>
                <h3>
                  Your Equity Contribution is <strong>60%</strong>
                </h3>
                <h2>
                  ₦ 18,000,000. <small>00</small>
                </h2>
              </div> */}
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='proceed-cta-btn congratulation-btn'
              onClick={() => (window.location.href = "/login")}
            >
              Start Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CongratulationModal;
