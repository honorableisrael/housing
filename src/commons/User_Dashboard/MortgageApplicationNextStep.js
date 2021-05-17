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

const Mortgage_Application_Third = (props) => {
  const [state, setState] = React.useState({
    user: {},
    have_apply_for_mortgage: "",
    propertyList: [],
    formError: "",
    applicationStatus: {},
    no_of_dependents: false,
    file: "",
    propertySlide: {},
    isUploading: false,
    totalDoc: {},
    isloading: false,
    isDeleting: false,
    current_apartment_status: "",
    marital_status: "",
    do_you_have_children: "",
    next_of_kin_name: "",
    next_of_kin_relationship: "",
    next_of_kin_dob: "",
    firstname: "",
    lastname: "",
    dobError:"",
    dob: "",
    next_of_kin_address: "",
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
      ])
      .then(
        axios.spread((res) => {
          console.log(res);
          if(res?.data?.data?.have_apply_for_mortgage==1){
            notify("You cannot change some feilds after applying for mortgage");
          }
          if (res.status === 200) {
            setState({
              ...state,
              ...res.data.data,
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
          hide: urlkey == "userprofile" ? true : false,
        });
        notifyFailed("Sorry failed to fetch data");
      });
  }, []);
  const notify = (message) => toast(message, { containerId: "t" });
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const validateForm = () => {
    if(have_apply_for_mortgage==1){
      return SubmitForm();
    }
    const today = new Date();
    const thisyear = today.getFullYear();
    const user_age = thisyear - parseInt(next_of_kin_dob.split("-")[0]);
    console.log(next_of_kin_dob.split("/"))
    console.log(parseInt(next_of_kin_dob.split("-")[0]) - thisyear);
    if (next_of_kin_dob.length !== 10 || parseInt(next_of_kin_dob) > thisyear) {
      return setState({
        ...state,
        dobError: "Invalid date of birth",
        formError: "Error",
      });
    }
    if (user_age < 17) {
      console.log(user_age);
      return setState({
        ...state,
        dobError: "Must be older than 18",
        formError: "Error",
      });
    }
    if (
      !current_apartment_status ||
      !marital_status ||
      !no_of_dependents ||
      !next_of_kin_name ||
      !next_of_kin_relationship ||
      !next_of_kin_dob ||
      !next_of_kin_address ||
      !no_of_dependents
    ) {
      notify("Please fill all required fields");
      return setState({
        ...state,
        formError: "Please fill",
      });
    }
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
      isloading: true,
    });
    const data = {
      current_apartment_status,
      marital_status,
      do_you_have_children,
      next_of_kin_name,
      next_of_kin_relationship,
      next_of_kin_dob,
      next_of_kin_address,
      no_of_dependents,
      firstname,
      lastname,
      dob,
    };
    axios
      .post(`${API}/user/profile`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successfully submitted ");
        console.log(res);
        setState({
          ...state,
          isloading: false,
        });
        setTimeout(() => {
          props.history.push("/mortage-request-step-4");
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        notifyFailed("Failed to save");
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
      isloading: true,
    });
    const data = {
      current_apartment_status,
      marital_status,
      do_you_have_children,
      next_of_kin_name,
      next_of_kin_relationship,
      next_of_kin_dob,
      next_of_kin_address,
      no_of_dependents,
      firstname,
      lastname,
      dob,
      have_apply_for_mortgage,
    };
    axios
      .post(`${API}/user/profile`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successfully submitted ");
        console.log(res);
        setState({
          ...state,
          isloading: false,
        });
        setTimeout(() => {
          props.history.push("/mortgage_application_preview");
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        notifyFailed("Failed to save");
        console.log(err.response);
      });
  };
  const checkIfIsOdd = (n) => {
    return Math.abs(n % 2) == 1;
  };
  const closeDeleteModal = () => {
    setState({
      ...state,
      deleteModal: false,
    });
  };
  const openDeleteModal = (id) => {
    setState({
      ...state,
      deleteModal: true,
      documentId: id,
    });
  };
  const onchange = (e) => {
    if (have_apply_for_mortgage == 0) {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        dobError:""
      });
    }
  };
  const handleChange = (e) => {
    setState({
      ...state,
      dobError:"",
      [e.target.name]: e.target.value,
    });
  };
  const {
    no_of_dependents,
    totalDoc,
    address,
    current_apartment_status,
    marital_status,
    do_you_have_children,
    next_of_kin_name,
    next_of_kin_relationship,
    next_of_kin_dob,
    next_of_kin_address,
    dob,
    dobError,
    formError,
    isloading,
    firstname,
    have_apply_for_mortgage,
    lastname,
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
              <div className="oll12">
                Hi{" "}
                <span className="name2p">
                  {" "}
                  {firstname} {lastname}
                </span>
              </div>
              <div className="selg">
                Please provide details of next of kin and dependents
              </div>
              <div className="straightdivider"></div>
            </Col>
            <Col md={12} className="formwrapper1">
              <Form>
                <Row>
                  <Col md={4} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !current_apartment_status
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Current Home Status
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && !current_apartment_status
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="current_apartment_status"
                        onChange={handleChange}
                      >
                        <option>{current_apartment_status}</option>
                        <option value="Owned" class="otherss">
                          Owned
                        </option>
                        <option value="Rent">Rent</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !marital_status
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Marital Status
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && !marital_status ? "fmc formerror" : "fmc"
                        }
                        name="marital_status"
                        onChange={handleChange}
                      >
                        <option>{marital_status}</option>
                        <option value="single" class="otherss">
                          Single
                        </option>
                        <option value="married">Married</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !no_of_dependents
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Number of Children/Dependants
                      </span>
                      <Form.Control
                        className={
                          formError && !no_of_dependents
                            ? "fmc formerror"
                            : "fmc"
                        }
                        value={no_of_dependents}
                        name="no_of_dependents"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !next_of_kin_name
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Next-of-Kin’s Full Name
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={next_of_kin_name}
                        className={
                          formError && !next_of_kin_name
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="next_of_kin_name"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !next_of_kin_relationship
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Relationship with Next-of-Kin
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={next_of_kin_relationship}
                        className={
                          formError && !next_of_kin_relationship
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="next_of_kin_relationship"
                        placeholder="   "
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="">
                    <Form.Group>
                      <span
                        className={
                          formError && !next_of_kin_dob
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Next-of-Kin’s Date Of Birth
                      </span>
                      {next_of_kin_dob?.length !== 10 ||
                        (dobError && "userprofile formerror1" && (
                          <span
                            className={
                              next_of_kin_dob?.length !== 10
                                ? "userprofile formerror13"
                                : "userprofile"
                            }
                          >
                            {dobError}
                          </span>
                        ))}
                      <Form.Control
                        type="date"
                        onChange={onchange}
                        required
                        value={next_of_kin_dob}
                        className={
                          formError && !next_of_kin_dob == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="next_of_kin_dob"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !next_of_kin_address == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Address
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={next_of_kin_address}
                        className={
                          formError && !next_of_kin_address
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="next_of_kin_address"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {!state.hide ? (
                    <>
                      <Col md={6}>
                        <Link to="/mortage-request-step-2">
                          <Button className="continue1 polld">Previous</Button>
                        </Link>
                      </Col>
                      <Col md={6}>
                        <Button className="continue1" onClick={validateForm}>
                          Continue
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
export default Mortgage_Application_Third;
