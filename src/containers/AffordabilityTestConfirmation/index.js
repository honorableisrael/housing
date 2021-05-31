import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import MainHeader from "../../commons/HeaderV1";
import GeneralFooter from "../../commons/GeneralFooter";
import ProgressSlider from "../../commons/ProgressSlider";
import AfordabilityFormStepThree from "../../commons/Forms/AfordabilityFormStepThree";
import "./AffordabilityTestConfirmation.css";
import { FormatAmount } from "../../commons/User_Dashboard/controller";

const AffordabilityTestConfirmation = () => {
  const [state, setState] = useState({
    property_details: {},
  });
  useEffect(() => {
    window.scrollTo(-0, -0);
    const property_details_ = localStorage.getItem("property_details");
    const property_details = JSON.parse(property_details_);
    console.log(property_details);
    setState({
      ...state,
      property_details,
    });
  }, []);
  const { property_details } = state;
  return (
    <main className="theme-bg">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Basic Information | Affordability Result - Housing Solution Fund |
          Real Estate, NHF, Mortgages &amp; Home Loans
        </title>
        <link rel="canonical" href="" />
      </Helmet>
      <MainHeader />
      {/* <section className='affordability-result-page'>
        <div className='container'>
          <div className='affordability-result-top-content'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='affordability-result-card'>
                  <div className='maximum-loan-amount-card w30'>
                    <h4>Your Maximum Loanable Amount</h4>
                    <h2>
                      $ 68,000,000.<small>00</small>
                    </h2>
                  </div>

                  <div className='monthly-repayment-card w30'>
                    <h4>Estimated Monthly Repayment</h4>
                    <h2>
                      $ 68,000,000.<small>00</small>
                    </h2>
                  </div>

                  <div className='maximum-tenure-card w30'>
                    <h4>Maximum Tenure</h4>
                    <h2>20 Years</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="property-info-selected">
        <div className="container">
          <div className="property-info-selected-wrapper">
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Property Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Location</th>
                        <th scope="col">Developer</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{property_details?.property_name}</td>
                        <td>{property_details?.property_type}</td>
                        <td>{property_details?.property_full_address}</td>
                        <td>Brains &amp; Hammers</td>
                        <td>
                          ₦{FormatAmount(property_details?.property_price)}
                          <a className="table-view-btn">View</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>First</th>
                      <th scope='col'>Last</th>
                      <th scope='col'>Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope='row'>1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="affordability-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="affordability-form-top-content">
                <h2>You are almost there</h2>
                <p>
                  These steps are necessary to complete your mortgage
                  application
                </p>
              </div>

              <div className="affordability-form-wrapper">
                <ProgressSlider stage="stepThree" />
                <AfordabilityFormStepThree />
              </div>
            </div>
          </div>
        </div>
      </section>
      <GeneralFooter />
    </main>
  );
};
export default AffordabilityTestConfirmation;
