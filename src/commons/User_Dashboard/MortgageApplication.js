import React, { useRef } from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./user_dashboard.scss";
import eye from "../../assets/show.png";
import close from "../../assets/close.png";
import "./animate.css";
import loader from "../../assets/loader.png";
import caretdwn from "../../assets/caret_down.png";
import equity from "../../assets/equity.png";
import Button from "react-bootstrap/Button";
import cavetleft from "../../assets/caretleft.png";
import cavetright from "../../assets/caretright.png";
import board from "../../assets/board.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UserdashboardSideBar from "./Sidebar";
import { API } from "../../config";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SideBarProfile from "./SidebarProfile";
import { Link } from "react-router-dom";
import SecondNavComponent from "./SecondNavComponent";
import { States } from "./states";
import { formatDate } from "./controller";
import NavComponent from "./NavComponent";

const MortgageApplication = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    deleteModal: false,
    file: "",
    propertySlide: {},
    isUploading: false,
    totalDoc: {},
    isloading: false,
    isLoading: false,
    Error: false,
    documentId: "",
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    phone: "",
    dob: "",
    state_of_origin: "",
    married_status: "",
    home_status: "",
    mode_of_contact: "",
    number_of_dependants: "",
    middlename: "",
    mother_middle_name: "",
    age: "",
    sex: "",
    nationality: "Nigerian",
    place_of_birth: "",
    profession: "",
    highest_education: "",
    means_of_identification: "",
    id_number: "",
    id_issue_date: "",
    id_expire_date: "",
    have_apply_for_mortgage: "",
    hide: "",
    dateError: "",
  });

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
      notifyFailed("Some fields cannot be changed after applying for mortgage");
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
          if (res.status === 200) {
            setState({
              ...state,
              ...res.data.data,
              user: currentUser?.user,
              // id_issue_date:formatDate(res?.data?.data?.id_issue_date),
              // id_expire_date:formatDate(res?.data?.data?.id_expire_date),
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
  const validateForm = () => {
    // console.log(id_issue_date);

    if (have_apply_for_mortgage == 1) {
      return SumitForm();
    }
    const expdate = new Date(id_expire_date).getTime()
    const issdate = new Date(id_issue_date).getTime()
    console.log(expdate)
    console.log(issdate)
    if (id_issue_date && id_expire_date) {
      const today = new Date();
      const thisyear =
        today.getFullYear() +
        "-" +
        parseInt(today.getMonth() + 1) +
        "-" +
        today.getDate();
      const user_age = thisyear - parseInt(id_issue_date.split("-")[0]);
      console.log(thisyear);
      if (issdate > today.getTime()) {
        notifyFailed("Issue date cannot be after todays date");
        return setState({
          ...state,
          formError: "Error",
        });
      }

      console.log(id_expire_date.split("-")[0] < thisyear.split("-")[0]);
      
      console.log(today.getTime())
      if (expdate < today.getTime()) {
        notifyFailed("ID expiring date cannot be before todays date");
        return setState({
          ...state,
          formError: "Error",
        });
      }
      if (id_issue_date.length !== 10 || parseInt(id_issue_date) > thisyear) {
        notifyFailed("Invalid Issue date");
        return setState({
          ...state,
          formError: "Error",
          dateError: "Error",
        });
      }
      if (id_expire_date.length !== 10 || parseInt(id_expire_date) > thisyear) {
        notifyFailed("Invalid expiry date");
        return setState({
          ...state,
          formError: "Error",
        });
      }
    }
    if (issdate > expdate) {
      return notifyFailed(
        "Date error ID Issue date cannot be after expiring date or current date"
      );
    }
    window.scrollTo(-0, -0);
    if (phone?.length < 10) {
      return setState({
        ...state,
        Error: "Invalid Phone no",
        formError: "Error",
      });
    }
    if (
      !address ||
      !email ||
      !phone ||
      !state_of_origin ||
      !firstname ||
      !lastname ||
      !mother_middle_name ||
      !nationality ||
      !age ||
      !sex ||
      !place_of_birth ||
      !state_of_origin ||
      !profession ||
      !highest_education ||
      !means_of_identification ||
      !id_number
    ) {
      return setState({
        ...state,
        formError: "Please fill",
      });
    }
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
      address,
      dob,
      firstname,
      lastname,
      email,
      phone,
      number_of_dependants,
      state_of_origin,
      home_status,
      means_of_identification,
      mode_of_contact,
      profession,
      middlename,
      nationality,
      age,
      sex,
      highest_education,
      place_of_birth,
      id_expire_date,
      id_issue_date,
      id_number,
    };
    axios
      .post(`${API}/user/profile`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successful");
        console.log(res);
        setState({
          ...state,
          isLoading: false,
        });
        setTimeout(() => {
          props.history.push("/mortage-request-step-2");
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
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
        dateError: "",
        dobError:""
      });
    } else {
      // notify("You cannot change this feild after applying for mortgage");
    }
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      dateError: "",
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
      address,
      dob,
      firstname,
      lastname,
      email,
      phone,
      number_of_dependants,
      state_of_origin,
      home_status,
      means_of_identification,
      mode_of_contact,
      profession,
      middlename,
      nationality,
      age,
      sex,
      highest_education,
      place_of_birth,
      id_expire_date,
      id_issue_date,
      id_number,
      have_apply_for_mortgage,
    };
    axios
      .post(`${API}/user/profile`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successful");
        console.log(res);
        setState({
          ...state,
          isLoading: false,
        });
        setTimeout(() => {
          props.history.push("/mortgage_application_preview");
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
        });
        notifyFailed("Failed to save");
        console.log(err.response);
      });
  };
  const test = ["New", "Old"];
  const {
    Error,
    state_of_origin,
    totalDoc,
    address,
    dateError,
    email,
    phone,
    dob,
    profession,
    home_status,
    firstname,
    lastname,
    mode_of_contact,
    deleteModal,
    formError,
    have_apply_for_mortgage,
    isloading,
    isLoading,
    means_of_identification,
    number_of_dependants,
    sex,
    nationality,
    mother_middle_name,
    age,
    highest_education,
    place_of_birth,
    middlename,
    id_expire_date,
    id_issue_date,
    id_number,
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
                Ordinary Mortgage | Personal Information
              </div>
              <div className="straightdivider"></div>
            </Col>
            <Col md={12} className="formwrapper1">
              <Form>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !firstname
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        First Name
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={firstname}
                        className={
                          formError && !firstname ? "fmc formerror" : "fmc"
                        }
                        name="firstname"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !lastname
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Last Name
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={lastname}
                        className={
                          formError && !lastname ? "fmc formerror" : "fmc"
                        }
                        name="lastname"
                        placeholder="   "
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !middlename
                            ? "userprofile"
                            : "userprofile"
                        }
                      >
                        Middle Name
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={middlename}
                        className={
                          formError && !middlename ? "fmc" : "fmc"
                        }
                        name="middlename"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !mother_middle_name
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Maiden Name
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={mother_middle_name}
                        className={
                          formError && !mother_middle_name
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="mother_middle_name"
                        placeholder="   "
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="">
                    <Form.Group>
                      <span
                        className={
                          formError && !address
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
                        value={address}
                        className={
                          formError && !address ? "fmc formerror" : "fmc"
                        }
                        name="address"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !email
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Email
                      </span>
                      <Form.Control
                        type="email"
                        onChange={onchange}
                        required
                        value={email}
                        className={
                          formError && !email ? "fmc formerror" : "fmc"
                        }
                        name="email"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !phone
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Phone Number
                      </span>
                      {phone?.length < 10 && (
                        <span
                          className={
                            phone?.length < 10
                              ? "userprofile former3"
                              : "userprofile"
                          }
                        >
                          {Error}
                        </span>
                      )}
                      <Form.Control
                        type="number"
                        onChange={onchange}
                        required
                        value={phone}
                        className={
                          formError && !phone ? "fmc formerror" : "fmc"
                        }
                        name="phone"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !age
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Age
                      </span>
                      <Form.Control
                        type="number"
                        onChange={onchange}
                        required
                        value={age}
                        className={formError && !age ? "fmc formerror" : "fmc"}
                        name="age"
                        disabled={true}
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !sex
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Sex
                      </span>
                      <Form.Control
                        as="select"
                        className={formError && !sex ? "fmc formerror" : "fmc"}
                        name="sex"
                        onChange={handleChange}
                      >
                        <option>{sex}</option>
                        <option value="Male" class="otherss">
                          Male
                        </option>
                        <option value="Female">Female</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !place_of_birth
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Place of Birth
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={place_of_birth}
                        className={
                          formError && !place_of_birth ? "fmc formerror" : "fmc"
                        }
                        name="place_of_birth"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !nationality
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Nationality
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={nationality}
                        className={
                          formError && !nationality ? "fmc formerror" : "fmc"
                        }
                        name="nationality"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !state_of_origin
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        State of Origin
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && !state_of_origin
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="state_of_origin"
                        onChange={handleChange}
                      >
                        <option>{state_of_origin}</option>
                        {States?.map((data, i) => (
                          <option value={data} class="otherss" key={i}>
                            {data}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !highest_education
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Highest Education
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && !highest_education
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="highest_education"
                        onChange={handleChange}
                      >
                        <option>{highest_education}</option>
                        <option value="Secondary School  " class="otherss">
                          Secondary School
                        </option>
                        <option value="Master Degree" class="otherss">
                        Master Degree
                        </option>
                        <option value="Doctoral Degree" class="otherss">
                        Doctoral Degree
                        </option>
                        <option value="Bachelor's Degree" class="otherss">
                        Bachelor's Degree
                        </option>
                        <option value="Higher National Certificate">Higher National Certificate</option>
                        <option value="Technical Institution">
                        Higher National Diploma
                        </option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !profession
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Profession
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={profession}
                        className={
                          formError && !profession ? "fmc formerror" : "fmc"
                        }
                        name="profession"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="fofofd">
                  <Col md={12} className="fofof">
                    <div className="meanas">Means of Identification</div>
                  </Col>
                  <Col md={3} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !means_of_identification
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Type of Identification
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && !means_of_identification
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="means_of_identification"
                        onChange={handleChange}
                      >
                        <option>{means_of_identification}</option>
                        <option value="ID" class="otherss">
                          ID
                        </option>
                        <option value="Drivers License" class="otherss">
                          Drivers License
                        </option>
                        <option value="International Passport" class="otherss">
                          International Passport
                        </option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={3} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !id_number
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        ID Number
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={id_number}
                        className={
                          formError && !id_number ? "fmc formerror" : "fmc"
                        }
                        name="id_number"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !id_issue_date
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        ID Issue Date
                      </span>
                      <Form.Control
                        type="date"
                        onChange={onchange}
                        required
                        value={id_issue_date}
                        className={
                          formError && !id_issue_date
                            ? "fmc formerror"
                            : dateError
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="id_issue_date"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !id_expire_date
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        ID Expiry Date
                      </span>
                      <Form.Control
                        type="date"
                        onChange={onchange}
                        required
                        value={id_expire_date}
                        className={
                          formError && !id_expire_date ? "fmc formerror" : "fmc"
                        }
                        name="id_expire_date"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {/* <Col md={6}>
                    <Link to="/user-property-request">
                      <Button className="continue1 nomargn polld">
                        Go Back to property Selection
                      </Button>
                    </Link>
                  </Col> */}
                  {!state.hide ? (
                    <Col md={12}>
                      <Button
                        className="continue1 nomargn"
                        onClick={validateForm}
                      >
                        {!isLoading ? "Continue" : "Processing"}
                      </Button>
                    </Col>
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
export default MortgageApplication;
