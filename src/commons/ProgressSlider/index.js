import React from "react";
import { withRouter } from "react-router";
import "./ProgressSlider.css";

const Progress_slider = withRouter((props) => {
  const StepOneSlider = (
    <div className="progress-bar">
      <div className="step">
        <div className="check fas fa-chevron-down active"></div>
        <div className="bullet active">
          <span>1</span>
        </div>
        <p className="active">Affordability Test</p>
      </div>

      <div className="step">
        <div className="check fas fa-chevron-down pending"></div>
        <div className="bullet pending">
          <span>2</span>
        </div>
        <p className="pending">Down Payment</p>
      </div>
      <div className="step">
        <div className="check fas fa-check pending"></div>
        <div className="bullet pending">
          <span>3</span>
        </div>
        <p className="pending">Complete Profile</p>
      </div>
    </div>
  );

  const StepTwoSlider = (
    <div className="progress-bar">
      <div className="step">
        <div className="check fas fa-check completed"></div>
        {/* <div className='check fas fa-chevron-down completed'></div> */}
        <div className="bullet completed">
          <span>1</span>
        </div>
        <p className="completed">Affordability Test</p>
      </div>

      <div className="step">
        <div className="check fas fa-chevron-down active"></div>
        <div className="bullet active">
          <span>2</span>
        </div>
        <p className="active">Down Payment</p>
      </div>
      <div className="step">
        <div className="check fas fa-check pending"></div>
        <div className="bullet pending">
          <span>3</span>
        </div>
        <p className="pending">Complete Profile</p>
      </div>
    </div>
  );

  const StepThreeSlider = (
    <div className="progress-bar">
      <div className="step">
        <div className="check fas fa-check completed"></div>
        <div className="bullet completed">
          <span>1</span>
        </div>
        <p className="completed">Affordability Test</p>
      </div>

      <div className="step">
        <div className="check fas fa-check completed"></div>
        <div className="bullet completed">
          <span>2</span>
        </div>
        <p className="completed">Down Payment</p>
      </div>
      <div className="step">
        <div className="check fas fa-chevron-down active"></div>
        <div className="bullet active">
          <span>3</span>
        </div>
        <p className="active">Complete Profile</p>
      </div>
    </div>
  );

  // React.useEffect(() => {
  //   const [state, setState] = React.useState({
  //     condition: false,
  //   });
  //   const {condition} = state
  //   const query = new URLSearchParams(props.location.search);
  //   const paramstring = query.get("noselection");
  //   console.log(paramstring);
  //   if (paramstring == "true") {
  //     setState({
  //       ...state,
  //       condition: true,
  //     });
  //   }
  // }, []);
  const query = new URLSearchParams(props.location.search);
  const paramstring = query.get("noselection");
  console.log(paramstring);
  return (
    <div className="form-progress-wrapper">
      {paramstring == "" && props.stage === "stepOne" ? StepOneSlider : ""}
      {props.stage === "stepTwo" ? StepTwoSlider : ""}
      {props.stage === "stepThree" ? StepThreeSlider : ""}
    </div>
  );
});
export default Progress_slider;
