import React, { useEffect, useState } from "react";
import "./Forms.css";
import { Link } from "react-router-dom";

const AfordabilityFormStepThree = () => {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    date_of_birth: "",
    phone_number: "",
    employment: "",
    address: "",
  });
  useEffect(() => {
    window.scrollTo(-0, -0);
    const property_details_ = localStorage.getItem("property_details");
    const property_details = JSON.parse(property_details_);
    console.log(property_details);
  }, []);
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const {
    first_name,
    last_name,
    email_address,
    date_of_birth,
    phone_number,
    employment,
    address,
  } = state;
  return (
    <form>
      <div className="form-wrapper">
        <div className="form-group row">
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <input
              type="text"
              name="first_name"
              value={first_name}
              onChange={onchange}
              className="form-control "
              placeholder="First Name"
            />
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <input
              type="text"
              name="last_name"
              value={last_name}
              onChange={onchange}
              className="form-control "
              placeholder="Last Name"
            />
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <input
              type="email"
              name="email_address"
              value={email_address}
              onChange={onchange}
              className="form-control "
              placeholder="Email Address"
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <input
              type="text"
              name="date_of_birth"
              value={date_of_birth}
              onChange={onchange}
              className="form-control "
              placeholder="Date of Birth"
            />
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <input
              type="text"
              name="phone_number"
              value={phone_number}
              onChange={onchange}
              className="form-control "
              placeholder="phone number"
            />
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <input
              type="text"
              name="employment"
              value={employment}
              onChange={onchange}
              className="form-control "
              placeholder="Employment"
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12">
            <textarea
              className="form-control"
              name="address"
              value={address}
              onChange={onchange}
              placeholder="Address"
              required=""
            ></textarea>
          </div>
        </div>
      </div>
      <div className="form-group row">
        <div className="offset-lg-3 col-lg-6">
          <Link to={"/signup"}>
            <button type="submit" className="affordability-form-btn">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};
export default AfordabilityFormStepThree;
