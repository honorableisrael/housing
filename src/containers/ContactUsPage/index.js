import React from "react";
import * as Icons from "react-feather";
import {Helmet} from "react-helmet";

import MainHeader from "../../commons/HeaderV1";
import GeneralFooter from "../../commons/GeneralFooter";
import "./ContactUsPage.css";

import contact_us_page_img from "../../assets/ContactUsPageImg.png";

const Contact_us_page = () => {
  return (
    <main>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          Contact Us - Housing Solution Fund | Real Estate, NHF, Mortgages &amp;
          Home Loans
        </title>
        <link rel='canonical' href='' />
      </Helmet>
      <MainHeader />
      <section className='contact-us-page'>
        <div className='container'>
          <div className='contact-us-page-wrapper'>
            <div className='contact-us-page-top-content'>
              <h2>Contact Us</h2>
              <p>
                We are available 24/7 to take your enquiries and complaints.
              </p>
            </div>

            <div className='contact-us-page-form-wrapper'>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='contact-us-page-ltr'>
                    <form>
                      <div className='form-group row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Name'
                          />
                        </div>
                      </div>

                      <div className='form-group row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Email'
                          />
                        </div>
                      </div>

                      <div className='form-group row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                          <textarea
                            className='form-control'
                            name='message'
                            placeholder='Message'
                            required=''
                          ></textarea>
                        </div>
                      </div>

                      <div className='form-group row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                          <button className='contact-us-page-btn'>
                            Send a Message
                          </button>
                        </div>
                      </div>
                    </form>

                    <div className='contact-us-page-social'>
                      <h2>Or Reach us on our socials</h2>

                      <ul className='social-link'>
                        <li>
                          <a
                            className='facebook'
                            target='_blank'
                            rel='noopener noreferrer'
                            href=''
                          >
                            <Icons.Facebook size='22px' />
                          </a>
                        </li>
                        <li>
                          <a
                            className='instagram'
                            target='_blank'
                            rel='noopener noreferrer'
                            href='/'
                          >
                            <Icons.Instagram size='22px' />
                          </a>
                        </li>
                        <li>
                          <a
                            className='twitter'
                            target='_blank'
                            rel='noopener noreferrer'
                            href='/'
                          >
                            <Icons.Twitter size='22px' />
                          </a>
                        </li>

                        <li>
                          <a
                            className='youtube'
                            target='_blank'
                            rel='noopener noreferrer'
                            href='/'
                          >
                            <Icons.Youtube size='22px' />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='contact-us-page-rtl'>
                    <figure>
                      <img
                        className='img-fluid'
                        src={contact_us_page_img}
                        alt=''
                      />
                    </figure>
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
export default Contact_us_page;
