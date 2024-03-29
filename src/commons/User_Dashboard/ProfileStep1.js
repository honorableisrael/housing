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
import house from "../../assets/house.png";
import house2 from "../../assets/house2.png";
import pen from "../../assets/pen.png";
import cross from "../../assets/cross.png";
import uploadimg from "../../assets/uploadimg.png";
import CreditReport from "./creditreport";
import Mortgagecards from "./mortgagecards";
import { API } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { formatDate } from "./controller";
import SideBarProfile from "./SidebarProfile";
import HeaderStats from "./HeaderStats";
import SecondNavComponent from "./SecondNavComponent";
import { States } from "./states";
import UserdashboardSideBar from "./Sidebar";

const Profile_1 = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    deleteModal: false,
    has_profile: "",
    file: "",
    propertySlide: {},
    isUploading: false,
    totalDoc: {},
    isloading: false,
    isDeleting: false,
    isLoading: false,
    documentId: "",
    firstname: "",
    lastname: "",
    dob: "",
    dobError: "",
    address: "",
    email: "",
    phone: "",
    state_of_origin: "",
    marital_status: "",
    current_apartment_status: "",
    mode_of_contact: "",
    Error: "",
    hide: false,
    no_of_dependents: "",
    userInfo:""
  });
  let fileRef = useRef(null);
  React.useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/signin");
    console.log(currentUser);
    setState({
      ...state,
      user: currentUser.user,
      isloading: true,
    });
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = urlParams.get("preview");

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
          console.log(res2.data);
          if (res2?.data?.data?.has_profile == 1) {
            notify(
              "Please note you cannot change some fields after submitting the application"
            );
          }
          if (res.status === 200) {
            setState({
              ...state,
              dob: formatDate(res2.data.data.dob),
              ...res2.data.data,
              propertyList: res.data.data,
              userInfo:res2?.data?.data?.is_verified,
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
        })
        ;
        // notifyFailed("Sorry failed to fetch data");
      });
  }, []);
  const notify = (message) => toast(message, { containerId: "t" });
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const validateForm = () => {
    if(has_profile==1){
      return SumitForm();
    }
    window.scrollTo(-0, -0);
    if (phone.length < 11 || phone.length > 11) {
      return setState({
        ...state,
        Error: "Invalid Phone number",
        formError: "Error",
      });
    }
    //date of birth validation
    const today = new Date();
    const thisyear = today.getFullYear();
    const user_age = thisyear - parseInt(dob.split("-")[0]);
    console.log(parseInt(dob.split("-")[0]) - thisyear);
    if (dob.length !== 10 || parseInt(dob) > thisyear) {
      return setState({
        ...state,
        dobError: "Invalid date of birth",
        formError: "Error",
      });
    }
    if (user_age < 21) {
      console.log(user_age);
      notifyFailed("User must be older than 21")
      return setState({
        ...state,
        dobError: "User must be older than 21",
        formError: "Error",
      });
    }
    if (
      address === "" ||
      email == "" ||
      phone == "" ||
      dob == "" ||
      state_of_origin == "" ||
      current_apartment_status == "" ||
      firstname == "" ||
      lastname == "" ||
      mode_of_contact == "" ||
      no_of_dependents == "" ||
      !address ||
      !email ||
      !phone ||
      !dob ||
      !state_of_origin ||
      !current_apartment_status ||
      !firstname ||
      !lastname ||
      !mode_of_contact ||
      !no_of_dependents
    ) {
      notify("Please fill the required feilds");
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
      firstname,
      lastname,
      address,
      email,
      phone,
      dob,
      no_of_dependents,
      state_of_origin,
      current_apartment_status,
      mode_of_contact,
    };
    axios
      .post(`${API}/user/profile`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successfully Saved profile information");
        console.log(res);
        setState({
          ...state,
          isLoading: false,
        });
        setTimeout(() => {
          props.history.push("/user-employment-info");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          isLoading: false,
        });
        notifyFailed("Failed to save");
        console.log(err);
      });
  };
  const SaveUpdates = () => {
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
      address,
      email,
      phone,
      dob,
      no_of_dependents,
      state_of_origin,
      current_apartment_status,
      mode_of_contact,
    };
    axios
      .post(`${API}/user/profile`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successfully Saved profile information");
        console.log(res);
        setState({
          ...state,
          isLoading: false,
        });
        setTimeout(() => {
          props.history.push("/userdashboard");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          isLoading: false,
        });
        notifyFailed("Failed to save");
        console.log(err);
      });
  };

  const onchange = (e) => {
    if (has_profile == 1) {
      if (
        e.target.name == "phone" ||
        e.target.name == "address" ||
        e.target.name == "mode_of_contact"
      ) {
        return setState({
          ...state,
          [e.target.name]: e.target.value,
          dobError: "",
        });
      }
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
      dobError: "",
    });
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      dobError: "",
    });
  };
  const {
    isLoading,
    dobError,
    address,
    email,
    phone,
    dob,
    state_of_origin,
    current_apartment_status,
    firstname,
    has_profile,
    lastname,
    mode_of_contact,
    Error,
    userInfo,
    formError,
    isloading,
    marital_status,
    no_of_dependents,
  } = state;
  return(
    userInfo==1 ?
    (
      <div>
        <Container fluid>
          <Row className="sdnnavrow">
            {!state.hide ? (
              <SideBarProfile profile={true} />
            ) : (
              <UserdashboardSideBar />
            )}
            <Col md={9} className="udshboard">
              <SecondNavComponent hideSearch={true} />
              {isloading && (
                <div className="text-center">
                  <Spinner animation="grow" variant="info" />
                </div>
              )}
              <div className="proffl">Profile</div>
              <HeaderStats />
              <Col md={12} className="lldl">
                <div className="oll12">
                  Hi{" "}
                  <span className="name2p">
                    {" "}
                    {firstname} {lastname}
                  </span>
                </div>
                <div className="selg">Tell us about your self</div>
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
                    <Col md={12} className="dapadd">
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
                    <Col md={6} className="eachfield">
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
                    <Col md={6} className="eachfield2">
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
                        {(phone.length < 11 || phone.length > 11) && (
                          <span
                            className={
                              phone.length < 11 || phone.length > 11
                                ? "userprofile formerror13"
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
                  </Row>
                  <Row>
                    <Col md={6} className="eachfield">
                      <Form.Group>
                        <span
                          className={
                            formError && !dob
                              ? "userprofile formerror1"
                              : "userprofile"
                          }
                        >
                          Date of Birth
                        </span>
                        {dob.length !== 10 ||
                          (dobError && "userprofile formerror1" && (
                            <span
                              className={
                                dob.length !== 10
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
                          as={"input"}
                          value={dob}
                          className={formError && !dob ? "fmc formerror" : "fmc"}
                          name="dob"
                          placeholder={dob}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="eachfield2">
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
                  </Row>
                  <Row>
                    <Col md={6} className="eachfield">
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
                          <option value="Single" class="otherss">
                            Single
                          </option>
                          <option value="Married">Married</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="eachfield2">
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
                          value={current_apartment_status}
                          name="current_apartment_status"
                          onChange={handleChange}
                        >
                          <option value=""></option>
                          <option value="Owned">Owned</option>
                          <option value="Rented">Rented</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="eachfield">
                      <Form.Group>
                        <span
                          className={
                            formError && !mode_of_contact
                              ? "userprofile formerror1"
                              : "userprofile"
                          }
                        >
                          Preferred Mode of Contact
                        </span>
                        <Form.Control
                          as="select"
                          className={
                            formError && !mode_of_contact
                              ? "fmc formerror"
                              : "fmc"
                          }
                          name="mode_of_contact"
                          onChange={handleChange}
                        >
                          <option value="">{mode_of_contact}</option>
                          <option value="Call">Call</option>
                          <option value="Whatsapp">Whatsapp</option>
                          <option value="Email">Email</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="eachfield2">
                      <Form.Group>
                        <span
                          className={
                            formError && !no_of_dependents
                              ? "userprofile formerror1"
                              : "userprofile"
                          }
                        >
                          Number of Dependant
                        </span>
                        <Form.Control
                          type="number"
                          onChange={onchange}
                          required
                          value={no_of_dependents}
                          className={
                            formError && !no_of_dependents
                              ? "fmc formerror"
                              : "fmc"
                          }
                          name="no_of_dependents"
                          placeholder=""
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    {!state.hide ? (
                      <Col md={12} className="dapadd">
                        <Button
                          className="continue1 nomargn"
                          onClick={validateForm}
                        >
                          {!isLoading ? "Continue" : "Updating"}
                        </Button>
                      </Col>
                    ) : (
                      <Col md={12} className="dapadd">
                        <Button
                          className="continue1 nomargn"
                          onClick={SaveUpdates}
                        >
                          {!isLoading ? "Save" : "Updating"}
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
    )
    :"Loading"
  )
};
export default Profile_1;
