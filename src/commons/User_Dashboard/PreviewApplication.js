import React from "react";
import "./user_dashboard.scss";
import { API } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


const PreviewApplication = (props) => {
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
    marital_status: "",
    home_status: "",
    mode_of_contact: "",
    number_of_dependants: "",
    current_apartment_status:"",
    middlename: "",
    mother_middle_name: "",
    age: "",
    sex: "",
    nationality: "",
    place_of_birth: "",
    profession: "",
    highest_education: "",
    means_of_identification: "",
    id_number: "",
    id_issue_date: "",
    id_expire_date: "",
    employer_address: "",
    employer_email: "",
    employer_phone: "",
    employer_name: "",
    spouse_profession:"",
    spouse_annual_income:"",
    next_of_kin_name:"",
    next_of_kin_relationship:"",
    next_of_kin_phone:"",
    next_of_kin_address:"",
    spouse_employer:"",
    spouse_employment_status:"",
    spouse_work_experience:"",
    spouse_name:"",
    otherInfo:{}
  });

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

    axios
      .all([
        axios.get(`${API}/user/get-profile`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/user-files`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res,res2) => {
          console.log(res);
          console.log(res2);
          if (res.status === 200) {
            setState({
              ...state,
              ...res.data.data,
              user: currentUser?.user,
              otherInfo:res2.data.data,
              // id_issue_date:formatDate(res?.data?.data?.id_issue_date),
              // id_expire_date:formatDate(res?.data?.data?.id_expire_date),
              isloading: false,
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
        // notifyFailed("Sorry failed to fetch data");
      });
  }, []);
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const {
    Error,
    state_of_origin,
    totalDoc,
    address,
    email,
    phone,
    dob,
    profession,
    marital_status,
    home_status,
    firstname,
    lastname,
    mode_of_contact,
    deleteModal,
    next_of_kin_name,
    next_of_kin_relationship,
    next_of_kin_phone,
    next_of_kin_address,
    formError,
    isloading,
    isLoading,
    current_apartment_status,
    employer_address,
    employer_email,
    employer_phone,
    employer_name,
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
    spouse_employer,
    spouse_employment_status,
    spouse_profession,
    spouse_annual_income,
    spouse_work_experience,
    spouse_name,
    otherInfo,
  } = state;
  console.log(otherInfo)
  return (
    <>
      <div className="printwrapp vvggb">
        {/* <div className="textlf">
          <span onClick={() => window.print()}>Print Page</span>
        </div> */}
        <div className="personalinfo personalinfoedit">
          <div className="personlatitle flexend1">
            <span>PERSONAL INFORMATION</span>
            <span>
              <Link to="/user-profile?preview=userprofile">Edit</Link>
            </span>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">Title</div>
              <div className="printbody">
                {sex == "Male" ? "Mr" : sex == "Female" ? "Mrs" : "n/a"}
              </div>
            </div>
            <div className="nnxg">
              <div className="printtitle">FIRST NAME</div>
              <div className="printbody">{firstname}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">LAST NAME</div>
              <div className="printbody">{lastname}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MIDDLE NAME</div>
              <div className="printbody">{middlename}</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">Email</div>
              <div className="printbody">{email}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Phone Number</div>
              <div className="printbody">{phone}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">DATE OF BIRTH</div>
              <div className="printbody">{dob}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Sex</div>
              <div className="printbody">{sex}</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">Address</div>
              <div className="printbody">{address}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">State of origin</div>
              <div className="printbody">{state_of_origin}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Highest education</div>
              <div className="printbody">{highest_education}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">DATE OF BIRTH</div>
              <div className="printbody">{dob}</div>
            </div>
          </div>
          <div className="divvder"></div>
          <div className="personlatitle">OTHER PERSONAL INFORMATION</div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">CURRENT HOME TYPE</div>
              current_apartment_status

              <div className="printbody">{current_apartment_status}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">OTHERS</div>
              <div className="printbody">n/a</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">ANNUAL RENT</div>
              <div className="printbody"></div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MARITAL STATUS</div>
              <div className="printbody">{marital_status}</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">SPOUSE’S NAME</div>
              <div className="printbody">{spouse_name}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SPOUSE’S PROFESSION</div>
              <div className="printbody">{spouse_profession}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SPOUSE’S EMPLOYER</div>
              <div className="printbody">{spouse_employer}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">YEARS EMPLOYED</div>
              <div className="printbody">{spouse_work_experience}</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">NEXT-OF-KIN’S NAME</div>
              <div className="printbody">{next_of_kin_name}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">NEXT-OF-KIN’S RELATIONSHIP</div>
              <div className="printbody">{next_of_kin_relationship}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">NEXT-OF-KIN’S PHONE</div>
              <div className="printbody">{next_of_kin_phone}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">NEXT-OF-KIN ADDRESS</div>
              <div className="printbody">{next_of_kin_address}</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">PROFESSION OF SPOUSE</div>
              <div className="printbody">{spouse_profession}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SPOUSE'S ANNUAL INCOME</div>
              <div className="printbody">{spouse_annual_income}</div>
            </div>
            <div className="nnxg"></div>
            <div className="nnxg"></div>
          </div>
          <div className="printtitle printood">CHILDREN/OTHER DEPENDENTS</div>
          <div className="frntrowtable">
            <div className="nnxg">
              <div className="printtitle">Name</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Age</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Relationship</div>
              <div className="printbody">N/A</div>
            </div>
          </div>
          <div className="divvder"></div>
          <div className="personlatitle flexend1">
            <span>EMPLOYMENT INFORMATION</span>
            <span>
              <Link to="/user-employment-info?preview=employment_info">
                Edit
              </Link>
            </span>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">COMPANY NAME</div>
              <div className="printbody">{employer_name}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">COMPANY EMAIL ADDRESS</div>
              <div className="printbody">{employer_email}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">EMPLOYER PHONE NO</div>
              <div className="printbody">{employer_phone}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">ADDRESS OF EMPLOYER</div>
              <div className="printbody">{employer_address}</div>
            </div>
          </div>
          {/* <div className="printtitle printood">OTHER EMPLOYMENTS:</div>
          <div className="frntrowtable">
            <div className="nnxg">
              <div className="printtitle">COMPANY NAME</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">COMPANY PHONE</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">COMPANY ADDRESS</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">YEARS</div>
              <div className="printbody">N/A</div>
            </div>
          </div> */}
        </div>
      </div>
      <ToastContainer
        enableMultiContainer
        containerId={"f"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </>
  );
};

export default PreviewApplication;
