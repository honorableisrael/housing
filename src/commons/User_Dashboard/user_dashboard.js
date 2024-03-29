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
import eye2 from "../../assets/eye2.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import UserdashboardSideBar from "./Sidebar";
import NavComponent from "./NavComponent";
import SecondNavComponent from "./SecondNavComponent";
import { Link } from "react-router-dom";
import PreviewApplication from "./PreviewApplication";
import PreviewMortgage from "./PreviewMortgage";
import { formatTime } from "./controller";

const Userdashboard = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    documentPath: "",
    imageName: "",
    applicationStatus: {},
    deleteModal: false,
    file: "",
    id:"",
    propertySlide: {},
    isUploading: false,
    totalDoc: {},
    PropertyInfo: {},
    isloading: false,
    isDeleting: false,
    documentId: "",
    loggedinuser: "",
    WarningModal: false,
    EditApplicationModal: false,
    EditMortgageApplicationModal: false,
    is_completed: "",
    doc_value:""
  });
  let fileRef = useRef(null);
  React.useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/signin");
    setState({
      ...state,
      user: currentUser.user,
      isloading: true,
    });
    axios
      .all([
        axios.get(`${API}/user/user-files`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/user-mortgage-status`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/document-count`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/user-property-request`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/get-profile`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/get-user-mortgages`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res, res1, res2, res3, res4, res5) => {
          console.log(res)
          if (res4?.data?.data?.is_verified == 0) {
            window.location.assign("/account-verification");
          }
          if (res.status === 200) {
            setState({
              ...state,
              ...res4.data.data,
              ...res1?.data?.data[0],
              propertyList: res.data.data,
              user: currentUser.user,
              applicationStatus: res1?.data?.data?.data[0],
              PropertyInfo: res1?.data?.data[0]?.property_info,
              totalDoc: res2?.data?.data?.data,
              propertySlide: res3.data.data,
              isloading: false,
              loggedinuser: res4.data.data,
              // WarningModal:res4?.data?.data?.have_apply_for_mortgage==1?true:false
            });
          }
          if (res.status == 400) {
            props.history.push("/signin");
          }
        })
      )
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          isloading: false,
        });
        notifyFailed("Sorry failed to fetch data");
      });
  }, []);
  const findDocAndAssignDocName=(id)=>{
    propertyList.forEach(data=>{
      if(data.id==id){
        setState({
          ...state,
          doc_value:data.doc_value,
          id
        })
      }
    })
  }
  const handleImageChange = (e) => {
    setState({
      ...state,
      file: e.target.files[0],
      imageName: e.target.files,
      id:id
    });
    postNewDocument(e.target.files[0]);
  };
  const notify = (message) => toast(message, { containerId: "t" });
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const postNewDocument = ( doc) => {
    setState({
      ...state,
      isUploading: true,
    });
    const { documentPath } = state;
    const userToken = localStorage.getItem("jwtToken");
    const data = new FormData();
    data.append("id", state.id);
    data.append(doc_value, doc);
    console.log(id)
    console.log(doc)
    axios
      .post(`${API}/user/user-upload-file`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Document Uploaded Successfully");
        console.log(res);
        setState({
          ...state,
          isUploading: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isUploading: false,
        });
        notifyFailed("Document Upload Failed");
        console.log(err.response);
      });
  };
  const DeleteExistingDocument = () => {
    setState({
      ...state,
      isDeleting: true,
    });
    const { documentPath } = state;
    const userToken = localStorage.getItem("jwtToken");
    console.log(state.documentId);
    axios
      .get(`${API}/user/user-delete-file/${state.documentId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Document Deleted Successfully");
        console.log(res);
        setState({
          ...state,
          isUploading: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isUploading: false,
        });
        notifyFailed("Failed to delete document");
        console.log(err);
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
  const CloseEditApplicationModal = () => {
    setState({
      ...state,
      EditApplicationModal: false,
    });
  };
  const OpenEditApplicationModal = () => {
    setState({
      ...state,
      EditApplicationModal: true,
    });
  };
  const openDeleteModal = (id) => {
    console.log(id)
    setState({
      ...state,
      deleteModal: true,
      documentId: id,
    });
  };
  const closeWarningModal = () => {
    setState({
      ...state,
      WarningModal: false,
    });
  };
  const {
    user,
    propertyList,
    totalDoc,
    applicationStatus,
    isUploading,
    deleteModal,
    EditApplicationModal,
    WarningModal,
    propertySlide,
    isloading,
    PropertyInfo,
    id,
    doc_value,
    loggedinuser,
    is_completed,
  } = state;
  console.log(applicationStatus);
  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <UserdashboardSideBar dashboard={true} />
          <Col md={9} className="udshboard">
            <NavComponent />
            <div className="userdahbdname nolefft dnolefft">
              Good Morning{" "}
              <span>
                {user?.firstname} {user.lastname}
              </span>
            </div>
            {isloading && (
              <div className="text-center">
                <Spinner animation="grow" variant="info" />
              </div>
            )}
            <Row className="neerrr">
              <Col className="apstatus-sectiondd">
                <div className="apstatus-section">
                  <div className="applctnheader">
                    <p className="udashboadprimheader">Mortgage Application status</p>

                    {is_completed == 1 ? (
                      <div>
                        <Link to="/printpage" target="blank">
                          <img src={eye} className="udshbdeye" /> View
                        </Link>
                      </div>
                    ) : loggedinuser.have_request == 1 &&
                      loggedinuser.have_apply_for_mortgage == 1 ? (
                      <div onClick={OpenEditApplicationModal}>
                        <img src={eye} className="udshbdeye" /> View
                      </div>
                    ) : (
                      ""
                    )}
                    {loggedinuser.have_apply_for_mortgage == 0 &&
                    loggedinuser.has_profile == 1 ? (
                      <div onClick={OpenEditApplicationModal}>
                        <img src={eye} className="udshbdeye" /> View
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="appstatusheadings">
                    <div>Home Name</div>
                    <div>Loan Value</div>
                    <div>Down Payment</div>
                    <div>Status</div>
                  </div>
                  <div className="statusline-img"></div>
                  <div className="appstatus">
                    {
                      <div className="statsitem">
                        {applicationStatus?.property_name}
                      </div>
                    }

                    <div className="itemprice">
                      {applicationStatus?.loan_amount &&
                        "₦" + FormatAmount(applicationStatus?.loan_amount)}
                    </div>
                    <div className="itemprice">
                      {applicationStatus?.down_payment ?
                        "₦" + FormatAmount(applicationStatus?.down_payment):""}
                    </div>
                    {loggedinuser.have_apply_for_mortgage == 0 && (
                      <div>
                        <div className="statsreview-btn notstarted revv">
                          {loggedinuser.have_apply_for_mortgage == 0 &&
                            "Not Started"}
                        </div>
                      </div>
                    )}
                    {/* {false && (
                      <div className="statsreview-btn completed12">
                        Completed
                      </div>
                    )} */}
                    {applicationStatus?.status ? (
                      <div>
                        <div className="statsreview-btn notstarted revv">
                          {applicationStatus?.status?.status}
                        </div>
                      </div>
                    ) : (
                      <div></div> 
                    )}
                    {/* <div className="statsprints-btn">Print</div> */}
                  </div>
                </div>
              </Col>
            </Row>
            <div className="mobile_appstatus_section">
              <div className="mobileappstatsheader">
                <p className="udashboadprimheader">Mortgage Application status</p>
                <div className="statsreview-btn ">
                  {applicationStatus?.status?.status}
                </div>
                {loggedinuser.have_apply_for_mortgage == 0 && (
                      <div>
                        <div className="statsreview-btn">
                          {loggedinuser.have_apply_for_mortgage == 0 &&
                            "Not Started"}
                        </div>
                      </div>
                    )}
              </div>
              <div className="mobile_appstatusbody">
                <div className="mobilestatusitem">
                  <p className="mobileppstheadin"> Name</p>
                  <p className="mobileitemprice">
                    {" "}
                    {applicationStatus?.property_name}
                  </p>
                </div>
                <div className="mobilestatusitem adjdiv">
                  <p className="mobileppstheadin"> Loan Value</p>
                  <p className="mobileitemprice">
                    ₦
                    {applicationStatus &&
                      FormatAmount(applicationStatus?.loan_amount)}
                  </p>
                </div>
                <div className="mobilestatusitem adjdiv">
                  <p className="mobileppstheadin"> Down Payment</p>
                  <p className="mobileitemprice">
                    ₦
                    {applicationStatus &&
                      FormatAmount(applicationStatus?.down_payment)}
                  </p>
                </div>
              </div>
              <div className="viewdiv">
                {/* {loggedinuser.have_request == 1 ? (
                  <div className="mobviewbtn">
                    <img src={eye2} /> View
                  </div>
                ) : (
                  ""
                )}
                */}
                 {loggedinuser.have_request == 1 ? (
                    is_completed == 1 ? (
                      <div className="mobviewbtn">
                        <Link to="/printpage" target="blank">
                          <img src={eye2} className="udshbdeye" /> View
                        </Link>
                      </div>
                    ) : loggedinuser.have_request == 1 &&
                      loggedinuser.have_apply_for_mortgage == 1 ? (
                      <div onClick={OpenEditApplicationModal} className="mobviewbtn">
                        <img src={eye2} className="udshbdeye" /> View
                      </div>
                    ) : (
                      ""
                    )
                    
                ):""}
              </div>
            </div>
            <Row>
              <Col md={7} className="uyud1">
                <div className="udashbdaccdiv">
                  <Accordion defaultActiveKey={loggedinuser?.have_apply_for_mortgage==1?"5":"5"}>
                    <Card className="udashbdacrd">
                      <Accordion.Toggle
                        as={Card.Header}
                        className="udashbdacc"
                        eventKey="5"
                      >
                        <p className="udashboadprimheader">Documents Upload</p>
                        <div className="doctxt">
                          <div>
                            <img src={loader} className="dshloader" />
                            {totalDoc["Total Uploaded"]}{" "}
                            <span className="thinss"> out of</span>{" "}
                            {totalDoc?.total_doc} {"  "} Documents Uploaded
                          </div>
                          <img src={caretdwn} className="dshgreencar" />
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="5">
                        <Card.Body className="dashacccdbdy">
                          <div className="dashbdaccbdydescr">
                            <div className="tyofdoc">Type of Documents</div>
                            <div className="stats">status</div>
                          </div>
                          {propertyList?.map((data, i) => (
                            <div
                              className={
                                checkIfIsOdd(i)
                                  ? "dashbdaccbdyitems whitebackground"
                                  : "dashbdaccbdyitems"
                              }
                            >
                              <div className="dashbdacbdyitem1">
                                {data?.doc_name}
                              </div>
                              {data.is_uploaded == 1 ? (
                                <div className="dashbdacbdyitem2">
                                  <a href={data.filename} target={"blank"}>
                                    Uploaded{" "}
                                    {isUploading && (
                                      <span className="blank1w">
                                        {" "}
                                        <Spinner
                                          animation="grow"
                                          className="qloading"
                                          variant="success"
                                        />
                                      </span>
                                    )}
                                  </a>
                                </div>
                              ) : data.is_uploaded == 0 ? (
                                <div className="dashbdacbdyitem2 pendingbtn">
                                  Pending{" "}
                                </div>
                              ) : (
                                <div className="dashbdacbdyitem2 pendingbtn">
                                  Rejected{" "}
                                </div>
                              )}
                              <div className="dashbdacbdyitem3" onClick={()=>findDocAndAssignDocName(data.id)}>
                                <img
                                  src={pen}
                                  onClick={() => fileRef?.click()}
                                />
                              </div>
                              {data?.is_uploaded == 1 ? (
                                <div className="dashbdacbdyitem4" >
                                  <img
                                    src={cross}
                                    title="delete document"
                                    onClick={() => {
                                      openDeleteModal(data.id);
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="dashbdacbdyitem4" onClick={()=>findDocAndAssignDocName(data.id)}>
                                  <img
                                    src={uploadimg}
                                    onClick={() => 
                                      fileRef?.click()
                                    }
                                  />
                                </div>
                              )}
                              <input
                                type="file"
                                onChange={(e) => handleImageChange(e)}
                                style={{ display: "none" }}
                                ref={(fileInput) => (fileRef = fileInput)}
                              />
                            </div>
                          ))}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
                <Carousel
                  additionalTransfrom={0}
                  arrows
                  autoPlay={true}
                  autoPlaySpeed={7000}
                  centerMode={false}
                  containerClass="container-with-dots"
                  dotListClass=""
                  draggable
                  focusOnSelect={false}
                  infinite={true}
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  renderDotsOutside={false}
                  responsive={{
                    desktop: {
                      breakpoint: {
                        max: 3000,
                        min: 1024,
                      },
                      items: 1,
                      paritialVisibilityGutter: 40,
                    },
                    mobile: {
                      breakpoint: {
                        max: 710,
                        min: 0,
                      },
                      items: 1,
                      paritialVisibilityGutter: 30,
                    },
                    tablet: {
                      breakpoint: {
                        max: 1024,
                        min: 710,
                      },
                      items: 2,
                      paritialVisibilityGutter: 30,
                    },
                  }}
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                  className="center-changed"
                >
                  <span className="carousel-section">
                    <img src={house} className="housess" alt="houses" />
                  </span>
                  <span className="carousel-section">
                    <img src={house2} className="housess" alt="houses" />
                  </span>
                </Carousel>
                <div className="propstatsdvsection">
                  <div className="propstatsdv">
                    <div className="savingsheader"> Property Status</div>
                    {propertySlide?.property?.property_status ==
                      "Under Construction" && (
                      <div className="undsctrnbtn">
                        {propertySlide?.property?.property_status}
                      </div>
                    )}
                    {propertySlide?.property?.property_status ==
                      "Completed" && (
                      <div className="undsctrnbtn completed12">
                        {propertySlide?.property?.property_status}
                      </div>
                    )}
                  </div>
                  <div className="bung">
                    {propertySlide?.property?.property_name}
                  </div>
                  <div className="propprice">
                    <div className="prpnme">Price</div>
                    <div className="prpice">
                      {"₦"}
                      {FormatAmount(propertySlide?.property_value)}
                    </div>
                  </div>
                  <div className="propprice">
                    <div className="prpnme">Purchase Option</div>
                    <div className="prpnme2">
                      {propertySlide?.payment_option}
                    </div>
                  </div>
                  <div className="propprice">
                    <div className="prpnme">Application date</div>
                    <div className="prpnme3">
                      {formatTime(propertySlide?.created_at)}
                    </div>
                  </div>
                </div>
                <div className="mobilepropstatsdv">
                  <div className="propstatsdv rmpad">
                    <div className="savingsheader mobsavheader">
                      Property Status
                    </div>
                    {propertySlide?.property?.property_status ==
                      "Under Construction" && (
                      <div className="undsctrnbtn mobstatsrvbtn">
                        {propertySlide?.property?.property_status}
                      </div>
                    )}
                    {propertySlide?.property?.property_status ==
                      "Completed" && (
                      <div className="undsctrnbtn completed12">
                        {propertySlide?.property?.property_status}
                      </div>
                    )}
                  </div>
                  <div className="mobbung">
                    <p className="mobsubheading"> Name </p>
                    <p className="mobprop">
                      {" "}
                      {propertySlide?.property?.property_name}{" "}
                    </p>
                  </div>
                  <div className="mobbung">
                    <p className="mobsubheading">Price</p>
                    <p className="mobprop">
                      {" "}
                      {"₦"}
                      {FormatAmount(propertySlide?.property_value)}
                    </p>
                  </div>
                  <div className="mobbung">
                    <p className="mobsubheading">Purchase Option</p>
                    <p className="mobprop">{propertySlide?.payment_option}</p>
                  </div>
                  <div className="mobbung lastprop">
                    <p className="mobsubheading">Date of Purchase</p>
                    <p className="mobprop">
                      {formatTime(propertySlide?.created_at)}
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <div className="equitywrapper ">
                  <div>
                    <p className="udashboadprimheader">Affordability Status</p>
                    <p className="equitytext">Total Loanable Amount</p>
                    <p className="equityamt">
                      ₦{FormatAmount(loggedinuser?.loanable_amount)}
                    </p>
                  </div>
                  <div>
                    <img src={equity} className="equityimg" />
                  </div>
                </div>
                <div className="equityamtdivs2">
                  <div className="equityamtdivs">
                    <div className="eqleftdv">
                      <p className="equitytext">Monthly Repayment</p>
                      <p className="equityamt">
                        {loggedinuser?.monthly_repayment
                          ? "₦" + FormatAmount(loggedinuser?.monthly_repayment)
                          : "--/--"}
                      </p>
                    </div>
                    <div className="eqrghtdv">
                      <p className="equitytext">Monthly Income</p>
                      {loggedinuser?.monthly_gross_pay ? (
                        <p className="equityamt">
                          ₦{FormatAmount(loggedinuser?.monthly_gross_pay)}
                        </p>
                      ) : (
                        <p className="equityamt">--/--</p>
                      )}
                    </div>
                  </div>
                  <div className="ddod">
                    {loggedinuser.has_profile == 1 && is_completed == 0 ? (
                      <Link to="/mortage-request">
                        <span className="mortgage-btn">Apply</span>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <CreditReport />
              </Col>
            </Row>
            <Row>
              <Mortgagecards />
            </Row>
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
        className="modcomplete fixmodal moddelete"
        centered={true}
        onHide={closeDeleteModal}
      >
        <div className="dllel dllel2">
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
            <Button
              className="btn-success succs"
              onClick={DeleteExistingDocument}
            >
              {!state.isDeleting ? "Delete" : "Processing"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={WarningModal}
        className="modd2 fixmodal"
        centered={true}
        onHide={closeWarningModal}
      >
        <div className="dllel dllel2">
          <Modal.Title className="modal_title">
            Opps you have not uploaded the required document
          </Modal.Title>
          <a className="close_view" onClick={closeWarningModal}>
            <img className="closeview" src={close} alt="close" />
          </a>
        </div>
        <Modal.Body>
          <Accordion defaultActiveKey="">
            <Card className="udashbdacrd">
              <Accordion.Toggle
                as={Card.Header}
                className="udashbdacc"
                eventKey="5"
              >
                <p className="udashboadprimheader">Documents Upload</p>
                <div className="doctxt">
                  <div>
                    <img src={loader} className="dshloader" />
                    {totalDoc["Total Uploaded"]}{" "}
                    <span className="thinss"> out of</span>{" "}
                    {totalDoc?.total_doc} {"  "} Documents Uploaded
                  </div>
                  <img src={caretdwn} className="dshgreencar" />
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="5">
                <Card.Body className="dashacccdbdy">
                  <div className="dashbdaccbdydescr">
                    <div className="tyofdoc">Type of Documents</div>
                    <div className="stats">status</div>
                  </div>
                  {propertyList?.map((data, i) => (
                    <div
                      className={
                        checkIfIsOdd(i)
                          ? "dashbdaccbdyitems whitebackground"
                          : "dashbdaccbdyitems"
                      }
                    >
                      <div className="dashbdacbdyitem1">
                        {data?.doc_name}
                      </div>
                      {data.is_uploaded == 1 ? (
                        <div className="dashbdacbdyitem2">
                          <a href={data.filename} target={"blank"}>
                            Uploaded{" "}
                            {isUploading && (
                              <span className="blank1w">
                                {" "}
                                <Spinner
                                  animation="grow"
                                  className="qloading"
                                  variant="success"
                                />
                              </span>
                            )}
                          </a>
                        </div>
                      ) : data.is_uploaded == 0 ? (
                        <div className="dashbdacbdyitem2 pendingbtn">
                          Pending{" "}
                        </div>
                      ) : (
                        <div className="dashbdacbdyitem2 pendingbtn">
                          Rejected{" "}
                        </div>
                      )}
                      <div className="dashbdacbdyitem3">
                        <img src={pen} onClick={() => fileRef?.click()} />
                      </div>
                      {data?.is_uploaded == 1 ? (
                        <div className="dashbdacbdyitem4">
                          <img
                            src={cross}
                            title="delete document"
                            onClick={() => {
                              openDeleteModal(data.id);
                            }}
                          />
                        </div>
                      ) : (
                        <div className="dashbdacbdyitem4">
                          <img
                            src={uploadimg}
                            onClick={() => fileRef?.click()}
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleImageChange(e)}
                        style={{ display: "none" }}
                        ref={(fileInput) => (fileRef = fileInput)}
                      />
                    </div>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          {/* <div className="od122">
            <Button className="btn-success succsss" onClick={closeWarningModal}>
              Continue
            </Button>
          </div> */}
        </Modal.Body>
      </Modal>
      <Modal
        show={EditApplicationModal}
        className="modd2 fixmodal"
        centered={true}
        onHide={CloseEditApplicationModal}
      >
        <div className="dllel dllel2">
          <a className="close_view" onClick={CloseEditApplicationModal}>
            <img className="closeview" src={close} alt="close" />
          </a>
        </div>
        <Modal.Body>
          {loggedinuser.have_request == 1 &&
          loggedinuser.have_apply_for_mortgage == 1 ? (
            <PreviewMortgage />
          ) : (
            <PreviewApplication />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Userdashboard;
