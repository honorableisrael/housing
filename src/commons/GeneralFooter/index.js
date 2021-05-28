import React from "react";
import * as Icons from "react-feather";
import {Link} from "react-router-dom";
import logofooter from "../../assets/HSF-LOGO-01.png";
import ShelterAfrique from "../../assets/shelterAfrice.png";
import InfraCredit from "../../assets/infacredit.png";

import "./GeneralFooter.css";

const footer_page = () => {
  return (
    <footer className='genFooter'>
      <div className='container-fluid'>
        <div className='genFooterTopWrapper'>
          <div className='row'>
            <div className='offset-lg-3 col-lg-6'>
              <div className='footer-subscriber-form text-center'>
                <h2>Subscribe to our Newsletter</h2>
                <p>
                  Never miss an opportunity, put your emails address and get
                  started.
                </p>

                <form className='footer-subscriber-form-wrapper'>
                  <div className='footer-subscriber-form-content'>
                    <div>
                      <Icons.Mail size='30px' />
                    </div>
                    <div>
                      <input
                        type='email'
                        className='form-control'
                        placeholder='Enter your Email Address'
                      />
                    </div>
                    <div>
                      <button className='subscriber-btn'>Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='col-lg-5 col-md-12 col-sm-12'>
              <div className='genFooterBottomNav'>
                <figure>
                  <img src={logofooter} alt='Infra Credit' />
                </figure>
                <p>
                  Housing Solution Fund has gone above and beyond in helping is
                  with our first home. From advice and working around our
                  schedules to sending us assistance and minor renovations
                </p>
              </div>
            </div>

            <div className='col-lg-2 col-md-12 col-sm-12'>
              <div className='genFooterBottomNav'>
                <h4>Support</h4>
                <ul>
                  <li>
                    <a href=''>Help Videos</a>
                  </li>
                  <li>
                    <a href=''>Accessories</a>
                  </li>
                  <li>
                    <a href=''>View Bookings</a>
                  </li>
                  <li>
                    <a href=''>Features</a>
                  </li>
                  <li>
                    <a href=''>CSR</a>
                  </li>
                  <li>
                    <a href=''>Terms and Policy</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className='col-lg-2 col-md-12 col-sm-12'>
              <div className='genFooterBottomNav'>
                <h4>About</h4>
                <ul>
                  <li>
                    <a href=''>Payment &amp; Tax</a>
                  </li>
                  <li>
                    <a href=''>Terms of Service</a>
                  </li>
                  <li>
                    <a href=''>Contact</a>
                  </li>
                  <li>
                    <a href=''>Announcement</a>
                  </li>
                  <li>
                    <a href=''>CSR</a>
                  </li>
                  <li>
                    <a href=''>News</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className='col-lg-3 col-md-12 col-sm-12'>
              <div className='genFooterBottomNav'>
                <h4>Our Address</h4>
                <address>
                  <p>
                    Plot 15A Abayomi Durosinmi-Etti Street, Lekki Phase 1(Ocean
                    Side), Lagos.
                  </p>
                </address>

                <div className='genFooterSocials'>
                  <ul>
                    <li>
                      <a
                        className='socials'
                        target='_blank'
                        rel='noopener noreferrer'
                        href=''
                      >
                        <Icons.Facebook size='20px' />
                      </a>
                    </li>
                    <li>
                      <a
                        className='socials'
                        target='_blank'
                        rel='noopener noreferrer'
                        href='/'
                      >
                        <Icons.Instagram size='20px' />
                      </a>
                    </li>
                    <li>
                      <a
                        className='socials'
                        target='_blank'
                        rel='noopener noreferrer'
                        href='/'
                      >
                        <Icons.Twitter size='20px' />
                      </a>
                    </li>

                    <li>
                      <a
                        className='socials'
                        target='_blank'
                        rel='noopener noreferrer'
                        href='/'
                      >
                        <Icons.Youtube size='20px' />
                      </a>
                    </li>
                  </ul>
                </div>

                <h4>Our Partners</h4>
                <figure>
                  <img src={InfraCredit} alt='Infra Credit' />
                </figure>
                <figure>
                  <img src={ShelterAfrique} alt='Shelter Afrique' />
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div className='genFooterBottomWrapper'>
          <div className='copyrights'>
            <p>
              Copyright &copy; 2021 Housing Solution Fund. Alright Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default footer_page;
