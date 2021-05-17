import React from "react";
import "./user_dashboard.scss";
import { API } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormatAmount } from "./controller";
import { Link } from "react-router-dom";

const PreviewMortgage = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    deleteModal: false,
    file: "",
    propertySlide: {},
    current_apartment_status: "",
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
    is_completed: "",
    employer_address: "",
    employer_email: "",
    employer_phone: "",
    employer_name: "",
    spouse_profession: "",
    spouse_annual_income: "",
    state_of_origin: "",
    marital_status: "",
    home_status: "",
    mode_of_contact: "",
    number_of_dependants: "",
    middlename: "",
    monthly_gross_pay: "",
    monthly_net_pay: "",
    monthly_expenses: "",
    loanable_amount: "",
    down_payment: "",
    total_annual_pay: "",
    mother_middle_name: "",
    loan_amount: "",
    age: "",
    sex: "",
    nationality: "",
    place_of_birth: "",
    profession: "",
    property_address: "",
    property_name: "",
    property_description: "",
    highest_education: "",
    property_value: "",
    means_of_identification: "",
    id_number: "",
    id_issue_date: "",
    id_expire_date: "",
    next_of_kin_name: "",
    next_of_kin_relationship: "",
    next_of_kin_phone: "",
    next_of_kin_address: "",
    spouse_employer: "",
    spouse_employment_status: "",
    spouse_work_experience: "",
    spouse_name: "",
    otherInfo: {},
  });

  React.useEffect(() => {
    window.scrollTo(-0, -0);
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
        axios.get(`${API}/user/get-user-mortgages`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/get-user-request`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res, res2, res3, res4) => {
          console.log(res4);
          console.log(res3);
          console.log(res2);
          if (res.status === 200) {
            setState({
              ...state,
              ...res.data.data,
              ...res3.data.data[0],
              ...res4.data.data,
              user: currentUser?.user,
              otherInfo: res3.data.data,
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
      type: "mortgage",
      loan_amount: loanable_amount,
      down_payment,
      property_value,
      property_name,
      property_address,
      property_description,
      is_completed: 1,
    };
    axios
      .post(`${API}/user/apply-mortgage`, data, {
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
          window.location.assign("/userdashboard");
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
  const notify = (message) => toast(message, { containerId: "i" });
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const {
    Error,
    state_of_origin,
    property_value,
    property_description,
    address,
    email,
    phone,
    dob,
    profession,
    home_status,
    loan_amount,
    marital_status,
    firstname,
    lastname,
    next_of_kin_name,
    next_of_kin_relationship,
    next_of_kin_phone,
    next_of_kin_address,
    spouse_employer,
    property_address,
    spouse_work_experience,
    spouse_name,
    spouse_profession,
    spouse_annual_income,
    current_apartment_status,
    property_name,
    formError,
    isloading,
    isLoading,
    means_of_identification,
    number_of_dependants,
    sex,
    nationality,
    mother_middle_name,
    age,
    is_completed,
    loanable_amount,
    employer_address,
    employer_email,
    employer_phone,
    employer_name,
    highest_education,
    place_of_birth,
    middlename,
    id_expire_date,
    down_payment,
    monthly_gross_pay,
    monthly_net_pay,
    monthly_expenses,
    total_annual_pay,
    otherInfo,
    id_issue_date,
    id_number,
  } = state;
  console.log(FormatAmount(monthly_expenses));
  return (
    <>
      <div className="printwrapp vvggb">
        <div className="pagetitlepr">
          Affordability Test - Finance Plus | Real Estate, Apartments, Mortgages
          & Home Values
        </div>
        {/* <div className="textlf">
          <span onClick={() => window.print()}>Print Page</span>
        </div> */}
        <div className="personalinfo personalinfoedit">
          <div className="personlatitle flexend1">
            <span>PERSONAL INFORMATION</span>
            <span>
              <Link to="/mortage-request?preview=userprofile">Edit</Link>
            </span>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">
                <span>Title </span>
              </div>
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
          <div className="personlatitle flexend1">
            <span>OTHER PERSONAL INFORMATION</span>
            <span>
              <Link to="/mortage-request-step-3?preview=userprofile">Edit</Link>
            </span>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">CURRENT HOME TYPE</div>
              <div className="printbody">{current_apartment_status}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">OTHERS</div>
              <div className="printbody">n/a</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">ANNUAL RENT</div>
              <div className="printbody">n/a</div>
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
            </div>{" "}
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
              <Link to="/mortage-request-step-2?preview=userprofile">Edit</Link>
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
          <div className="printtitle printood">OTHER EMPLOYMENTS:</div>
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
          </div>
          <div className="divvder"></div>
          <div className="personlatitle flexend1">
            <span>FINANCIAL INFORMATION</span>
            <span>
              <Link to="/mortage-request-step-4?preview=userprofile">Edit</Link>
            </span>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">TOTAL ANNUAL PAY</div>
              <div className="printbody">₦{FormatAmount(total_annual_pay)}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MONTHLY GROSS PAY</div>
              <div className="printbody">
                N{FormatAmount(monthly_gross_pay)}
              </div>
            </div>
            <div className="nnxg">
              <div className="printtitle"> MONTHLY NET PAY</div>
              <div className="printbody">₦{FormatAmount(monthly_net_pay)}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MONTHLY EXPENSES</div>
              <div className="printbody">₦{FormatAmount(monthly_expenses)}</div>
            </div>
          </div>
          <div className="printtitle printood">OTHER SOURCE(S) OF INCOME</div>
          <div className="frntrowtable">
            <div className="nnxg">
              <div className="printtitle">SOURCE</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SOURCE AMOUNT/YEAR (N)</div>
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
          </div>
          <div className="divvder"></div>
          <div className="personlatitle flexend1">
          <span> LOAN INFORMATION</span>
          <span>
              <Link to="/mortage-request-step-5?preview=userprofile">Edit</Link>
            </span>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">PROPOSED EQUITY CONTRIBUTION</div>
              <div className="printbody">₦{FormatAmount(down_payment)}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">LOAN AMOUNT</div>
              <div className="printbody">₦ {FormatAmount(loanable_amount)}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">PROPERTY VALUE</div>
              <div className="printbody">
                ₦{FormatAmount(otherInfo[0]?.property_value)}
              </div>
            </div>
            <div className="nnxg">
              <div className="printtitle">PROPERTY ADDRESS</div>
              <div className="printbody">{otherInfo[0]?.property_address}</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">PROPERTY TITLE</div>
              <div className="printbody">{otherInfo[0]?.property_name}</div>
            </div>
          </div>
          <div className="text-center">
            {is_completed == 1 ? (
              <Link
                to="/printpage"
                target="blank"
                onClick={() =>
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000)
                }
              >
                <span className="subbsmo">
                  {!isloading ? "Print Preview Page" : "Loading..."}
                </span>
              </Link>
            ) : (
              <span className="subbsmo" onClick={SubmitForm}>
                {!isloading ? "Submit" : "Loading..."}
              </span>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        enableMultiContainer
        containerId={"f"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"i"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </>
  );
};

export default PreviewMortgage;
