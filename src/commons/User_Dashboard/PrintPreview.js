import React from "react";
import "./user_dashboard.scss";
import { API } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormatAmount } from "./controller";

const PreviewPage = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    deleteModal: false,
    file: "",
    propertySlide: {},
    current_apartment_status:"",
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
    loanable_amount:"",
    down_payment:"",
    total_annual_pay: "",
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
      ])
      .then(
        axios.spread((res, res2,res3) => {
          console.log(res);
          console.log(res3.data.data);
          if (res.status === 200) {
            setState({
              ...state,
              ...res.data.data,
              user: currentUser?.user,
              otherInfo:res3.data.data,
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
        notifyFailed("Sorry failed to fetch data");
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
    home_status,
    firstname,
    lastname,
    next_of_kin_name,
    next_of_kin_relationship,
    next_of_kin_phone,
    next_of_kin_address,
    spouse_employer,
    spouse_employment_status,
    spouse_work_experience,
    spouse_name,
    spouse_profession,
    marital_status,
    spouse_annual_income,
    current_apartment_status,
    deleteModal,
    formError,
    isloading,
    isLoading,
    means_of_identification,
    number_of_dependants,
    sex,
    nationality,
    mother_middle_name,
    age,
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
      <div className="printwrapp">
        <div className="pagetitlepr">
          Affordability Test - Finance Plus | Real Estate, Apartments, Mortgages
          & Home Values
        </div>
        <div className="textlf">
          <span onClick={() => window.print()}>Print Page</span>
        </div>
        <div className="personalinfo">
          <div className="personlatitle">PERSONAL INFORMATION</div>
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
          <div className="personlatitle">EMPLOYMENT INFORMATION</div>
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
          <div className="personlatitle">FINANCIAL INFORMATION</div>
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
          <div className="personlatitle">LOAN INFORMATION</div>
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
              <div className="printbody">₦{FormatAmount(otherInfo[0]?.property_value)}</div>
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

export default PreviewPage;
