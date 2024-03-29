import React, { useRef } from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./user_dashboard.scss";
import close from "../../assets/close.png";
import "./animate.css";
import Button from "react-bootstrap/Button";
import "react-multi-carousel/lib/styles.css";

import { API } from "../../config";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SideBarProfile from "./SidebarProfile";
import NavComponent from "./NavComponent";
import HeaderStats from "./HeaderStats";
import { Link } from "react-router-dom";
import SecondNavComponent from "./SecondNavComponent";
import { States } from "./states";

const Profile_3 = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    deleteModal: false,
    have_equity: "",
    propertySlide: {},
    isLoading: false,
    nhf_number: "",
    isloading: false,
    isDeleting: false,
    firstname: "",
    lastname: "",
    monthly_net_pay: "",
    total_annual_pay: "",
    employment_id: "",
    employment_state: "",
    number_of_dependants: "",
    monthly_expenses: "",
    monthly_repayment: "",
    loan_repayments: "",
    budget: "",
    payment_option: "",
    has_profile: "",
    down_payment: "",
    have_loans: "",
    hide: false,
  });
  let fileRef = useRef(null);
  React.useEffect(() => {
    window.scrollTo(-0, -0);
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/auth/login");
    console.log(currentUser);
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = urlParams.get("preview");
    setState({
      ...state,
      user: currentUser.user,
      isloading: true,
      hide: urlkey == "userprofile" ? true : false,
    });
    if (urlkey == "userprofile" ? true : false) {
      notify("Some fields cannot be changed after submitting the application");
    }
    axios
      .all([
        axios.get(`${API}/user/user-files`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/get-profile`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res, res2) => {
          console.log(res2.data.data);
          if (res2.data.data.has_profile == 1) {
            notify(
              " You cannot change this field after submitting application"
            );
          }
          if (res.status === 200) {
            setState({
              ...state,
              ...res2.data.data,
              propertyList: res.data.data,
              have_loans:res2?.data?.data?.have_existing_loan==1?"Yes":"No",
              loan_repayments:res2?.data?.data?.monthly_repayment,
              user: currentUser.user,
              isloading: false,
              hide: urlkey == "userprofile" ? true : false,
            });
          }
          if (res.status == 400) {
            props.history.push("/auth/login");
          }
        })
      )
      .catch((err) => {
        console.log(err.response);
        setState({
          ...state,
          isloading: false,
          hide: urlkey == "userprofile" ? true : false,
        });
        // notifyFailed("Sorry failed to fetch data");
      });
  }, []);
  const notify = (message) => toast(message, { containerId: "w" });
  const notifyFailed = (message, i) => toast(message, { containerId: "f" });
  const FormatAmount = (amount) => {
    if (amount) {
      return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };
  const onInputChange = (e) => {
    if (has_profile == 0) {
      const letterNumber = /^[A-Za-z]+$/;
      if (e.target.value) {
        return setState({
          ...state,
          [e.target.name]: e.target.value.replace(/[^0-9]+/g, ""), //only accept numbers
        });
      }
      if (e.target.value < 0) {
        return setState({
          ...state,
          [e.target.name]: 0,
        });
      }
      if (e.target.value === "") {
        return setState({
          ...state,
          [e.target.name]: 0,
        });
      }
    }
  };
  const sendWarning = () => {
    notify("Please fill the required feilds");
    return setState({
      ...state,
      formError: "Please fill",
    });
  };
  const validateForm = () => {
    window.scrollTo(-0, -0);
    if(has_profile==1){
      return SumitForm();
    }
    if (have_loans == "Yes" && !loan_repayments && has_profile == 0) {
      sendWarning();
      return;
    }
    if (!have_equity && has_profile == 0) {
      sendWarning();
      return;
    }
    // if (have_equity == 1  &&  !down_payment) {
    //   sendWarning();
    //   return
    // }
    if (
      !total_annual_pay ||
      !monthly_net_pay ||
      // have_equity == "" ||
      !monthly_expenses ||
      // !monthly_repayment ||
      (!payment_option && has_profile == 0)
    ) {
      sendWarning();
      return;
    }
    // if (have_equity == "1" && down_payment == "") {
    //   notify("Please fill the required feilds");
    //   return setState({
    //     ...state,
    //     formError: "Please fill",
    //   });
    // }
    // if (payment_option == "Installment Payment" && budget == "") {
    //   notify("Please fill the required feilds");
    //   return setState({
    //     ...state,
    //     formError: "Please fill",
    //   });
    // }
    SumitForm();
  };
  const SumitForm = () => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/signin");
    setState({
      ...state,
      isLoading: true,
    });
    const data = {
      monthly_net_pay,
      total_annual_pay,
      monthly_expenses,
      payment_option,
      monthly_repayment:loan_repayments,
      have_equity,
      have_existing_loan:have_loans=="Yes"?1:0,
      budget,
      down_payment,
    };
    axios
      .post(`${API}/user/affordability-test`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        window.scrollTo(-0, -0);
        notify("Successful Loanable Amount Updated ");
        console.log(res);
        setState({
          ...state,
          isLoading: false,
        });
        setTimeout(() => {
          props.history.push("/user-property-request");
        }, 4000);
      })
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
        });
        notifyFailed("Failed to save", "f");
        console.log(err.response);
      });
  };
  const submitForm = () => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/signin");
    setState({
      ...state,
      isLoading: true,
    });
    const data = {
      monthly_net_pay,
      total_annual_pay,
      monthly_expenses,
      payment_option,
      monthly_repayment:loan_repayments,
      have_equity,
      have_existing_loan:have_loans=="Yes"?1:0,
      budget,
      down_payment,
    };
    axios
      .post(`${API}/user/affordability-test`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        window.scrollTo(-0, -0);
        notify("Successful Loanable Amount Updated ");
        console.log(res);
        setState({
          ...state,
          isLoading: false,
        });
        setTimeout(() => {
          props.history.push("/user-property-request");
        }, 4000);
      })
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
        });
        notifyFailed("Failed to save", "f");
        console.log(err.response);
      });
  };
  const closeDeleteModal = () => {
    setState({
      ...state,
      deleteModal: false,
    });
  };
  const onchange = (e) => {
    if (has_profile == 0) {
      return setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
    if (has_profile == 1 && e.target.name == "payment_option") {
      return setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };
  const {
    has_profile,
    user,
    payment_option,
    total_annual_pay,
    monthly_expenses,
    budget,
    have_loans,
    monthly_net_pay,
    isLoading,
    deleteModal,
    firstname,
    lastname,
    formError,
    isloading,
    loan_repayments,
    have_equity,
    employment_state,
    number_of_dependants,
    down_payment,
  } = state;
  console.log(total_annual_pay);

  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <SideBarProfile affordability={true} />
          <Col md={9} className="udshboard">
            <SecondNavComponent hideSearch={true} />
            {isloading && (
              <div className="text-center">
                <Spinner animation="grow" variant="info" />
              </div>
            )}
            <div className="proffl">Affordability Test</div>
            <HeaderStats />
            <Col md={12} className="lldl">
              <div className="oll12">
                Hi{" "}
                <span className="name2p">
                  {" "}
                  {firstname} {lastname}
                </span>
              </div>
              <div className="selg">
                Check how much you can afford to borrow
              </div>
              <div className="straightdivider"></div>
            </Col>
            <Col md={12} className="formwrapper1">
              <Form>
                <Row className="hht4 have_d">
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !total_annual_pay
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        What is your total annual salary? (₦)
                      </span>
                      <Form.Control
                        type="text"yj
                        onChange={onInputChange}
                        value={FormatAmount(total_annual_pay)}
                        className={
                          formError && !total_annual_pay
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="total_annual_pay"
                        placeholder=""
                      />
                      <div className="spna12">
                        <span className="spna122">Annually</span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !monthly_net_pay
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        What is your monthly net salary? (₦)
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onInputChange}
                        required
                        value={FormatAmount(monthly_net_pay)}
                        className={
                          formError && !monthly_net_pay
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthly_net_pay"
                        placeholder=""
                      />
                      <div className="spna12">
                        <span className="spna122">Monthly</span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="poll878 hht4">
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !have_equity
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Do you have Down Payment
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && !have_equity ? "fmc formerror" : "fmc"
                        }
                        name="have_equity"
                        onChange={onchange}
                        disabled={has_profile == 1 ? true : false}
                      >
                        <option>
                          {have_equity === 1
                            ? "Yes"
                            : have_equity === 0
                            ? "No"
                            : ""}
                        </option>
                        <option value={""}></option>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    {have_equity == 1 && (
                      <Form.Group>
                        <span
                          className={
                            formError && !down_payment
                              ? "userprofile formerror1"
                              : "userprofile"
                          }
                        >
                          How much equity do you have? (₦)
                        </span>
                        <Form.Control
                          type="text"
                          onChange={onInputChange}
                          required
                          value={FormatAmount(down_payment)}
                          className={
                            formError && !down_payment ? "fmc formerror" : "fmc"
                          }
                          name="down_payment"
                          placeholder=""
                        />
                      </Form.Group>
                    )}
                  </Col>
                </Row>
                <Row className="poll878 hh44">
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !monthly_expenses
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Monthly Expenses
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onInputChange}
                        required
                        value={FormatAmount(monthly_expenses)}
                        className={
                          formError && !monthly_expenses
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthly_expenses"
                        placeholder=""
                      />
                      <div className="spna12">
                        <span className="spna122">Monthly</span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !have_loans
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Do you have existing loans?
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && !have_loans && !have_loans
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="have_loans"
                        onChange={onchange}
                      >
                        <option>{have_loans}</option>
                        <option value={"Yes"}>Yes</option>
                        <option value={"No"}>No</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {have_loans == "Yes" && (
                    <Col md={12}>
                      <Form.Group>
                        <span
                          className={
                            formError && !loan_repayments
                              ? "userprofile formerror1"
                              : "userprofile"
                          }
                        >
                          Existing loan Repayments
                        </span>
                        <Form.Control
                          type="text"
                          onChange={onInputChange}
                          required
                          value={FormatAmount(loan_repayments)}
                          className={
                            formError && !loan_repayments
                              ? "fmc formerror"
                              : "fmc"
                          }
                          name="loan_repayments"
                          placeholder=""
                        />
                        <div className="spna12">
                          <span className="spna122">Monthly</span>
                        </div>
                      </Form.Group>
                    </Col>
                  )}
                </Row>
                <Row className="poll878">
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !payment_option
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Payment Option
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && !payment_option ? "fmc formerror" : "fmc"
                        }
                        name="payment_option"
                        onChange={onchange}
                      >
                        <option>{payment_option}</option>
                        <option value={"NHF"} className="otherss">
                          NHF
                        </option>
                        <option value={"Mortgage"} className="otherss">
                          Mortgage
                        </option>
                        <option
                          value={"Installmental Payment"}
                          className="otherss"
                        >
                          Installmental Payment
                        </option>
                        <option value={"Outright Payment"} className="otherss">
                          Outright Payment
                        </option>
                        <option value={"Rent to own"} className="otherss">
                          Rent to own
                        </option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    {payment_option == "Installment Payment" && (
                      <Form.Group>
                        <span
                          className={
                            formError && !budget
                              ? "userprofile formerror1"
                              : "userprofile"
                          }
                        >
                          What is your annual budget? (₦)
                        </span>
                        <Form.Control
                          type="text"
                          onChange={onInputChange}
                          required
                          value={FormatAmount(budget)}
                          className={
                            formError && !budget ? "fmc formerror" : "fmc"
                          }
                          name="budget"
                          placeholder=""
                        />
                      </Form.Group>
                    )}
                    {payment_option == "Rent to own" && (
                      <Form.Group>
                        <span
                          className={
                            formError && !budget
                              ? "userprofile formerror1"
                              : "userprofile"
                          }
                        >
                          What is your monthly budget? (₦)
                        </span>
                        <Form.Control
                          type="text"
                          onChange={onInputChange}
                          required
                          value={FormatAmount(budget)}
                          className={
                            formError && !budget ? "fmc formerror" : "fmc"
                          }
                          name="budget"
                          placeholder=""
                        />
                      </Form.Group>
                    )}
                  </Col>
                </Row>
                <Row className="poll878 polz2">
                  {!state.hide ? (
                    <>
                      <Col md={6}>
                        <Link to="/user-profile">
                          <Button className="continue1 polld">Previous</Button>
                        </Link>
                      </Col>
                      <Col md={6}>
                        <Button className="continue1" onClick={validateForm}>
                          {!isLoading
                            ? " Check Affordable Properties"
                            : "Processing"}
                        </Button>
                      </Col>
                    </>
                  ) : (
                    <Col md={12}>
                      <Button
                        className="continue1 nomargn"
                        onClick={submitForm}
                      >
                        {!isLoading ? "Save" : "Processing"}
                      </Button>
                    </Col>
                  )}
                </Row>
              </Form>
            </Col>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer={false}
        containerId={"w"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
      {/* <ToastContainer
        enableMultiContainer
        containerId={"f"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      /> */}
      <Modal
        show={deleteModal}
        className="modcomplete fixmodal"
        centered={true}
        onHide={closeDeleteModal}
      >
        <div className="dllel">
          <Modal.Title className="modal_title">Delete Document</Modal.Title>
          <a className="close_view" onClick={closeDeleteModal}>
            <img className="closeview" src={close} alt="close" />
          </a>
        </div>
        <Modal.Body>
          <div className="areyousure">
            You are about to delete this document please confirm?
          </div>
          <div className="od12">
            <Button className="btn-danger" onClick={closeDeleteModal}>
              Back
            </Button>
            <Button className="btn-success succs">
              {!state.isDeleting ? "Delete" : "Processing"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Profile_3;
