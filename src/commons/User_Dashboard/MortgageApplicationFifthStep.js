import React, { useRef } from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./user_dashboard.scss";
import eye from "../../assets/show.png";
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
import UserdashboardSideBar from "./Sidebar";
import HeaderStats from "./HeaderStats";
import { Link } from "react-router-dom";
import { formatDate } from "./controller";

const MortgageApplicationFifthStep = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    dob: "",
    loanable_amount: false,
    file: "",
    propertySlide: {},
    isLoading: false,
    totalDoc: {},
    isloading: false,
    isDeleting: false,
    current_apartment_status: "",
    total_annual_pay: "",
    monthly_gross_pay: "",
    marital_status: "",
    property_description: "",
    property_title: "",
    property_address: "",
    expected_equity_contribution: "",
    have_loans: "",
    loan_repayments: "",
    monthly_net_pay: "",
    property_value: "",
    monthly_expenses: "",
    firstname: "",
    lastname: "",
    percent: "",
    have_apply_for_mortgage: "",
    hide: false,
  });
  let fileRef = useRef(null);
  React.useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/signin");
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
        axios.get(`${API}/user/get-profile`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/get-user-request`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/get-user-mortgages`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res, res1, res3) => {
          console.log(res3.data.data[0]);
          if (res.status === 200) {
            setState({
              ...state,
              ...res1.data.data,
              ...res.data.data,
              ...res3?.data?.data[0],
              property_title: res3?.data?.data[0]?.property_name,
              user: currentUser.user,
              isloading: false,
              hide: urlkey == "userprofile" ? true : false,
            });
          }
          if (res.status == 400) {
            props.history.push("/signin");
          }
        })
      )
      .catch((err) => {
        console.log(err.response);
        setState({
          ...state,
          isloading: false,
        });
        notifyFailed("Sorry failed to fetch data");
      });
  }, []);
  const notify = (message) => toast(message, { containerId: "t" });
  const notifyFailed = (message) => toast(message, { containerId: "f" });
 
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
      firstname,
      lastname,
      dob,
      property_value,
      down_payment,
      property_address,
      property_name: property_title,
      property_description,
    };
    const data1 = {
      type: "mortgage",
      loan_amount: loanable_amount,
      property_value,
      property_name: property_title,
      property_address,
      property_description,
      // is_completed: 1,
    };
    axios
      .all([
        axios.post(`${API}/user/profile`, data, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.post(`${API}/user/apply-mortgage`, data1, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res, res1) => {
          setState({
            ...state,
            isLoading: false,
          });
          console.log(res1);
          if (have_apply_for_mortgage == 1) {
            notify("Already applied for mortgage");
            return setTimeout(() => {
              props.history.push("/userdashboard");
            }, 2000);
          }
          console.log(res);
          setTimeout(() => {
            props.history.push("/mortgage_application_preview");
          }, 2000);
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
        });
        notifyFailed("Failed to save");
        console.log(err.response);
      });
  };

  const validateForm = () => {
    if (have_apply_for_mortgage == 1) {
      notify("Already applied for mortgage");
      return setTimeout(() => {
        props.history.push("/userdashboard");
      }, 2000);
    } 
    if (down_payment < calculator().equity_contribution_value) {
      notifyFailed("Your proposed equity is insufficient");
      return;
    }
    if (Math.round(calculator()?.expectedEquityContributionPercent) < 20) {
      notifyFailed("Your proposed equity cannot be less than 20%");
      return;
    }
    if (loanable_amount < (property_value - down_payment)) {
      notifyFailed("Your required loan amount cannot be higher than the loanable amount");
      return;
    }
    // if (!property_title || !property_address || !property_description) {
    //   notify("Please fill empty fields");
    //   return setState({
    //     ...state,
    //     formError: "Please fill",
    //   });
    // }
    SubmitForm();
  };

  const SubmitForm = () => {
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
      firstname,
      lastname,
      dob,
      property_value,
      down_payment,
      property_address,
      property_title,
      property_description,
    };
    const data1 = {
      type: "mortgage",
      loan_amount: property_value - down_payment,
      property_value,
      property_name: property_title,
      property_address,
      property_description,
      // is_completed: 1,
    };
    axios
      .all([
        axios.post(`${API}/user/profile`, data, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.post(`${API}/user/apply-mortgage`, data1, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res, res1) => {
          setState({
            ...state,
            isLoading: false,
          });
          console.log(res1);
          if (have_apply_for_mortgage == 1) {
            notify("Already applied for mortgage");
            return setTimeout(() => {
              props.history.push("/userdashboard");
            }, 2000);
          }
          console.log(res);
          setTimeout(() => {
            props.history.push("/mortgage_application_preview");
          }, 2000);
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
        });
        notifyFailed("Failed to save");
        console.log(err.response);
      });
  };
  const FormatAmount = (amount) => {
    if (amount) {
      return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  const onInputChange = (e) => {
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
  };
  const calculator = () => {
    let loanable_amount_ = parseInt(loanable_amount);
    let property_value_ = parseInt(property_value);
    console.log(loanable_amount);
    console.log(property_value_);
    let p = (loanable_amount_ / property_value_) * 100;
    console.log(p);
    if (p > 100) {
      const expectedEquityContributionPercent = 20;
      const equity_contribution_value =
        (expectedEquityContributionPercent / 100) * property_value_;
      console.log(equity_contribution_value);
      const newloanableamount = (80 / 100) * property_value;
      return {
        equity_contribution_value,
        expectedEquityContributionPercent,
        newloanableamount,
      };
    }
    if (p !== 100) {
      const expectedEquityContributionPercent = 100 - p;
      console.log(expectedEquityContributionPercent);
      const equity_contribution_value =
        (expectedEquityContributionPercent / 100) * property_value_;
      console.log(equity_contribution_value);
      return { equity_contribution_value, expectedEquityContributionPercent };
    }
    if (p == 100 || p > 100) {
      let p = 80;
      loanable_amount_ = (p / 100) * property_value_;
      console.log(loanable_amount_);
      const expectedEquityContributionPercent = 100 - p;
      console.log(expectedEquityContributionPercent);
      const equity_contribution_value =
        (expectedEquityContributionPercent / 100) * property_value_;
      console.log(equity_contribution_value);
      return { equity_contribution_value, expectedEquityContributionPercent };
    }
  };
  const onchange = (e) => {
    // if (have_apply_for_mortgage == 0) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    // }
    // else {
    // notify("You cannot change this feild after applying for mortgage");
    // }
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const {
    totalDoc,
    total_annual_pay,
    dob,
    lastname,
    percent,
    have_loans,
    monthly_net_pay,
    have_apply_for_mortgage,
    formError,
    isloading,
    expected_equity_contribution,
    firstname,
    property_value,
    property_description,
    property_title,
    property_address,
    down_payment,
    isLoading,
    loanable_amount,
  } = state;
  console.log(totalDoc);
  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <UserdashboardSideBar hideads={true} mortgage={true} />
          <Col md={9} className="udshboard">
            <NavComponent hideSearch={true} />
            {isloading && (
              <div className="text-center">
                <Spinner animation="grow" variant="info" />
              </div>
            )}
            <div className="proffl">Mortgage Application</div>
            <Col md={12} className="lldl">
              <div className="selg">Loan info and Declaration</div>
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
                        Property Value (₦)
                      </span>
                      <Form.Control
                        type="text"
                        // onChange={onInputChange}
                        value={FormatAmount(property_value)}
                        className={
                          formError && !property_value ? "fmc formerror" : "fmc"
                        }
                        name="property_value"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !loanable_amount
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Loanable amount? (₦)
                      </span>
                      <Form.Control
                        type="text"
                        // onChange={onInputChange}
                        required
                        value={FormatAmount(loanable_amount)}
                        className={
                          formError && !loanable_amount
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="loanable_amount"
                        placeholder=""
                      />
                      <div className="spna12">
                        <span className="spna122">Monthly</span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          expected_equity_contribution
                            ? "userprofile "
                            : "userprofile"
                        }
                      >
                       Minimum Expected Equity Contribution(₦)
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={FormatAmount(
                          calculator()?.equity_contribution_value?.toFixed(2)
                        )}
                        className={expected_equity_contribution ? "fmc" : "fmc"}
                        name="expected_equity_contribution"
                        placeholder=""
                      />
                      <div className="spna12">
                        <span className="spna122">
                          {calculator()?.expectedEquityContributionPercent
                            ? Math.round(
                                calculator()?.expectedEquityContributionPercent
                              )
                            : ""}
                          %
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          down_payment < calculator()?.equity_contribution_value
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Proposed Equity Contribution (₦)
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onInputChange}
                        required
                        // onBlur={()=>{
                        //   if(down_payment < calculator()){
                        //     notify("Your proposed equity contribution is insufficient")
                        //   }
                        // }}
                        value={FormatAmount(down_payment)}
                        className={
                          down_payment < calculator()?.equity_contribution_value
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="down_payment"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {
                  <Row>
                    <Col md={6} className="eachfield">
                      <Form.Group>
                        <span
                          className={
                            formError && !loanable_amount
                              ? "userprofile formerror1"
                              : "userprofile"
                          }
                        >
                          Required Loan amount (₦)
                        </span>
                        <Form.Control
                          type="text"
                          // onChange={onInputChange}
                          required
                          value={
                            property_value - down_payment > 0
                              ? FormatAmount(property_value - down_payment)
                              : 0
                          }
                          className={"fmc"}
                          name="loanable_amount"
                          placeholder=""
                        />
                        {/* <div className="spna12">
                          <span className="spna122">Monthly</span>
                        </div> */}
                      </Form.Group>
                    </Col>
                  </Row>
                }
                <Row className="margnbtm2">
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !property_address
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Property Address
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={property_address}
                        className={
                          formError && !property_address
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="property_address"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group className="margnbtm">
                      <span
                        className={
                          formError && !property_title
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Property title
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={property_title}
                        className={
                          formError && !property_title ? "fmc formerror" : "fmc"
                        }
                        name="property_title"
                        placeholder=""
                      />
                    </Form.Group>{" "}
                  </Col>
                </Row>
                <br />
                <Row className="movebbt">
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !property_description
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Property Description
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={property_description}
                        className={
                          formError && !property_description
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="property_description"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {!state.hide ? (
                    <>
                      <Col md={6}>
                        <Link to="/mortage-request-step-4">
                          <Button className="continue1 polld">Previous</Button>
                        </Link>
                      </Col>
                      <Col md={6}>
                        <Button className="continue1" onClick={validateForm}>
                          {!isLoading ? "Preview" : "Processing..."}
                        </Button>
                      </Col>
                    </>
                  ) : (
                    <Col md={12}>
                      <Button
                        className="continue1 nomargn"
                        onClick={submitForm}
                      >
                        {!isloading ? "Save" : "Processing"}
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
        enableMultiContainer
        containerId={"t"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"f"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </div>
  );
};
export default MortgageApplicationFifthStep;
