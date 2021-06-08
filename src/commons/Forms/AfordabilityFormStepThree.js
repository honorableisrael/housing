import React, { useEffect, useState } from "react";
import "./Forms.css";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { API } from "../../config";
import SweetAlert from "react-bootstrap-sweetalert";
import Modal from "react-modal";
import successfullysaved from "../../assets/successfullysaved.png";
import ConfirmationModal from "../Modals/confirmationModal";

const AfordabilityFormStepThree = withRouter((props) => {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    date_of_birth: "",
    phone_number: "",
    employment: "",
    address: "",
    modalIsOpen: "",
    isloading:false,
    errorMessage: "",
    show:false,
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
    isloading,
    errorMessage,
    date_of_birth,
    phone_number,
    employment,
    show,
    address,
    modalIsOpen,
  } = state;

  const validateForm = () => {
    if (
      first_name ||
      last_name ||
      email_address ||
      date_of_birth ||
      phone_number ||
      employment ||
      address
    ) {
      return setState({
        ...state,
        modalIsOpen: true,
      });
    }
  };

  const closeModal = () => {
    setState({
      ...state,
      modalIsOpen: false,
    });
  };
  const onConfirm = () => {
    props.history.push("/signup")
  };
  const onCancel = () => {
    setState({
      ...state,
      show: false,
    });
  };
  const submitForm = (e) => {
    e.preventDefault()
    setState({
      ...state,
      isloading:true
    })
    const data = {
      age: 25,
      tenure: 5,
      firstname: "Oba",
      lastname: "SDQ",
      middlename: "I",
      sex: "male",
      dob: "1990/03/04",
      phone: "0987654567",
      email: "user2@test.com",
      total_annual_pay: 3500000,
      monthly_net_pay: 350000,
      outstanding_loans: 10000,
      monthly_expenses: 50000,
      have_existing_obligation: 0,
      additional_income: 0,
      down_payment: 30000000,
      loan_amount: 12000000,
      max_loan_amount: 20000000,
      loan_tenure: 5,
      state_id: 0,
      city_id: 0,
      property_value: 50000000,
      property_type_id: 0,
      property_bedroom: 5,
      property_bathroom: 6,
      property_id: 10,
      found_property: 1,
      type:"mortgage"
    };
    Axios.post(`${API}/general/profile-request`, data)
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          show:true,
          isloading:false
        })
      })
      .catch((err) => {
        setState({
          ...state,
          show:false,
          isloading:false
        })
        console.log(err);
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
      <form onSubmit={submitForm}>
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
                type="date"
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
            <button
              type="submit"
              className="affordability-form-btn"
              onClick={submitForm}
            >
              {!isloading?"Continue":"loading..."}
            </button>
          </div>
        </div>
      </form>
      <SweetAlert
        title={"Successfully submitted"}
        onConfirm={onConfirm}
        onCancel={onCancel}
        show={show}
      >
        <div className="text-center">
           <img
              src={successfullysaved}
              className="successfullysaved"
              alt="successfullysaved"
            />
        </div>
        <p>Proceed to signup</p>
      </SweetAlert>
    </>
  );
});
export default AfordabilityFormStepThree;
