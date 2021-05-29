import React from "react";
import {Helmet} from "react-helmet";
import MainHeader from "../../commons/HeaderV1";
import GeneralFooter from "../../commons/GeneralFooter";
import ProgressSlider from "../../commons/ProgressSlider";
import AfordabilityFormStepThree from "../../commons/Forms/AfordabilityFormStepThree";
import CongratulationModal from "../../commons/Modals/congratulationsModal";

import "./AffordabilityTestConfirmation.css";

const AffordabilityTestConfirmation = () => {
  return (
    <main className='theme-bg'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          Basic Information | Affordability Result - Housing Solution Fund |
          Real Estate, NHF, Mortgages &amp; Home Loans
        </title>
        <link rel='canonical' href='' />
      </Helmet>
      <MainHeader />

      <section className='property-info-selected'>
        <div className='container'>
          <div className='property-info-selected-wrapper'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='table-responsive'>
                  <table className='table align-items-center table-flush'>
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col'>Property Name</th>
                        <th scope='col'>Type</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Developer</th>
                        <th scope='col'>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Lekki pearl estateII</td>
                        <td>Bungalow</td>
                        <td>Lekki, Lagos</td>
                        <td>Brains &amp; Hammers</td>
                        <td>
                          $27,000,000.00
                          <a className='table-view-btn'>View</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='affordability-form'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='affordability-form-top-content'>
                <h2>You are almost there</h2>
                <p>
                  These steps are necessary to complete your mortgage
                  application
                </p>
              </div>

              <div className='affordability-form-wrapper'>
                <ProgressSlider stage='stepThree' />
                <AfordabilityFormStepThree />
              </div>
            </div>
          </div>
        </div>
      </section>
      <CongratulationModal />
      <GeneralFooter />
    </main>
  );
};
export default AffordabilityTestConfirmation;
