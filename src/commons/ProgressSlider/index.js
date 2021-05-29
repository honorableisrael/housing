import React from "react";
import "./ProgressSlider.css";

const Progress_slider = (props) => {
  const StepOneSlider = (
    <div className='progress-bar'>
      <div className='step'>
        <div className='check fas fa-chevron-down active'></div>
        <div className='bullet active'>
          <span>1</span>
        </div>
        <p className='active'>Affordability Test</p>
      </div>

      <div className='step'>
        <div className='check fas fa-chevron-down pending'></div>
        <div className='bullet pending'>
          <span>2</span>
        </div>
        <p className='pending'>Down Payment</p>
      </div>
      <div className='step'>
        <div className='check fas fa-check pending'></div>
        <div className='bullet pending'>
          <span>3</span>
        </div>
        <p className='pending'>Complete Profile</p>
      </div>
    </div>
  );

  const StepTwoSlider = (
    <div className='progress-bar'>
      <div className='step'>
        <div className='check fas fa-check completed'></div>
        {/* <div className='check fas fa-chevron-down completed'></div> */}
        <div className='bullet completed'>
          <span>1</span>
        </div>
        <p className='completed'>Affordability Test</p>
      </div>

      <div className='step'>
        <div className='check fas fa-chevron-down active'></div>
        <div className='bullet active'>
          <span>2</span>
        </div>
        <p className='active'>Down Payment</p>
      </div>
      <div className='step'>
        <div className='check fas fa-check pending'></div>
        <div className='bullet pending'>
          <span>3</span>
        </div>
        <p className='pending'>Complete Profile</p>
      </div>
    </div>
  );

  const StepThreeSlider = (
    <div className='progress-bar'>
      <div className='step'>
        <div className='check fas fa-check completed'></div>
        <div className='bullet completed'>
          <span>1</span>
        </div>
        <p className='completed'>Affordability Test</p>
      </div>

      <div className='step'>
        <div className='check fas fa-check completed'></div>
        <div className='bullet completed'>
          <span>2</span>
        </div>
        <p className='completed'>Down Payment</p>
      </div>
      <div className='step'>
        <div className='check fas fa-chevron-down active'></div>
        <div className='bullet active'>
          <span>3</span>
        </div>
        <p className='active'>Complete Profile</p>
      </div>
    </div>
  );
  return (
    <div className='form-progress-wrapper'>
      {props.stage === "stepOne" ? StepOneSlider : ""}
      {props.stage === "stepTwo" ? StepTwoSlider : ""}
      {props.stage === "stepThree" ? StepThreeSlider : ""}
    </div>
  );
};
export default Progress_slider;
