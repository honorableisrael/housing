import React from "react";
import {Helmet} from "react-helmet";
import MainHeader from "../../commons/HeaderV1";
import GeneralFooter from "../../commons/GeneralFooter";
import "./NewFAQS.css";

const Faqs_page = () => {
  return (
    <main>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          FAQS - Housing Solution Fund | Real Estate, NHF, Mortgages &amp; Home
          Loans
        </title>
        <link rel='canonical' href='' />
      </Helmet>
      <MainHeader />
      <section className='faqs-page'>
        <div className='container'>
          <div className='faqs-page-wrapper'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <div className='faqs-page-top-content'>
                  <h2>Frequently Asked Questions</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Volutpat non pharetra, phasellus ut cursus.
                  </p>
                </div>

                <div
                  className='panel-group'
                  id='accordion'
                  role='tablist'
                  aria-multiselectable='true'
                >
                  <div className='panel panel-default'>
                    <div className='panel-heading' role='tab' id='headingOne'>
                      <h4 className='panel-title'>
                        <a
                          //   className='collapsed'
                          data-toggle='collapse'
                          data-parent='#accordion'
                          href='#collapseOne'
                          aria-expanded='true'
                          aria-controls='collapseOne'
                        >
                          Question 1
                        </a>
                      </h4>
                    </div>
                    <div
                      id='collapseOne'
                      className='panel-collapse in collapse show'
                      role='tabpanel'
                      aria-labelledby='headingOne'
                    >
                      <div className='panel-body'>
                        <p>
                          Here’s some example text that may answer an FAQ or
                          give the user some helpful advice.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='panel panel-default'>
                    <div className='panel-heading' role='tab' id='headingTwo'>
                      <h4 className='panel-title'>
                        <a
                          className='collapsed'
                          data-toggle='collapse'
                          data-parent='#accordion'
                          href='#collapseTwo'
                          aria-expanded='false'
                          aria-controls='collapseTwo'
                        >
                          Question 2
                        </a>
                      </h4>
                    </div>
                    <div
                      id='collapseTwo'
                      className='panel-collapse collapse'
                      role='tabpanel'
                      aria-labelledby='headingTwo'
                    >
                      <div className='panel-body'>
                        <p>
                          Here’s some example text that may answer an FAQ or
                          give the user some helpful advice.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='panel panel-default'>
                    <div className='panel-heading' role='tab' id='headingThree'>
                      <h4 className='panel-title'>
                        <a
                          className='collapsed'
                          data-toggle='collapse'
                          data-parent='#accordion'
                          href='#collapseThree'
                          aria-expanded='false'
                          aria-controls='collapseThree'
                        >
                          Question 3
                        </a>
                      </h4>
                    </div>
                    <div
                      id='collapseThree'
                      className='panel-collapse collapse'
                      role='tabpanel'
                      aria-labelledby='headingThree'
                    >
                      <div className='panel-body'>
                        <p>
                          Here’s some example text that may answer an FAQ or
                          give the user some helpful advice.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='panel panel-default'>
                    <div className='panel-heading' role='tab' id='headingFour'>
                      <h4 className='panel-title'>
                        <a
                          className='collapsed'
                          data-toggle='collapse'
                          data-parent='#accordion'
                          href='#collapseFour'
                          aria-expanded='false'
                          aria-controls='collapseFour'
                        >
                          Question 4
                        </a>
                      </h4>
                    </div>
                    <div
                      id='collapseFour'
                      className='panel-collapse collapse'
                      role='tabpanel'
                      aria-labelledby='headingFour'
                    >
                      <div className='panel-body'>
                        <p>
                          Here’s some example text that may answer an FAQ or
                          give the user some helpful advice.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='panel panel-default'>
                    <div className='panel-heading' role='tab' id='headingFive'>
                      <h4 className='panel-title'>
                        <a
                          className='collapsed'
                          data-toggle='collapse'
                          data-parent='#accordion'
                          href='#collapseFive'
                          aria-expanded='false'
                          aria-controls='collapseFive'
                        >
                          Question 5
                        </a>
                      </h4>
                    </div>
                    <div
                      id='collapseFive'
                      className='panel-collapse collapse'
                      role='tabpanel'
                      aria-labelledby='headingFive'
                    >
                      <div className='panel-body'>
                        <p>
                          Here’s some example text that may answer an FAQ or
                          give the user some helpful advice.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='panel panel-default'>
                    <div className='panel-heading' role='tab' id='headingSix'>
                      <h4 className='panel-title'>
                        <a
                          className='collapsed'
                          data-toggle='collapse'
                          data-parent='#accordion'
                          href='#collapseSix'
                          aria-expanded='false'
                          aria-controls='collapseSix'
                        >
                          Question 6
                        </a>
                      </h4>
                    </div>
                    <div
                      id='collapseSix'
                      className='panel-collapse collapse'
                      role='tabpanel'
                      aria-labelledby='headingSix'
                    >
                      <div className='panel-body'>
                        <p>
                          Here’s some example text that may answer an FAQ or
                          give the user some helpful advice.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GeneralFooter />
    </main>
  );
};
export default Faqs_page;
