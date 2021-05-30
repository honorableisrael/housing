import React, {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

// Auth Routes
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";

// Normal Routes
// import HomePage from "./containers/HomePage";

import {LOGIN_PAGE_URL, REGISTER_URL} from "./constants";
import Error404Page from "./containers/Error404Page";
import store from "./store";
import setLoading from "./store/actions/setLoading";
import NewHomepage from "./containers/NewHomepage";
import GetStartedPage from "./containers/GetStartedPage";
import NewApplicationPage from "./containers/NewApplicationPage";

// import ProfilePage from "./containers/ProfilePage";
// import ResetPassword from "./containers/ResetPassword";
// import NewAffordabilityForm from "./containers/NewAffordabilityForm";

import setAuthToken from "./utils/setAuthToken";
import {logoutUser, setCurrentUser} from "./store/actions/authActions";
import Userdashboard from "./commons/User_Dashboard/user_dashboard";

//importing private Route
import PrivateRoute from "./commons/PrivateRoute";
import NewMortgageForm from "./containers/NewMortgageForm";
import Profile_1 from "./commons/User_Dashboard/ProfileStep1";
import Profile_2 from "./commons/User_Dashboard/ProfileStep2";
import Profile_3 from "./commons/User_Dashboard/ProfileStep3";
import Profile_4 from "./commons/User_Dashboard/ProfileStep4";
import Profile_6 from "./commons/User_Dashboard/ProfileStep6";
import MortgageApplication from "./commons/User_Dashboard/MortgageApplication";
import Mortgage_Application_Third from "./commons/User_Dashboard/MortgageApplicationNextStep";
import MortgageApplication_SecondStep from "./commons/User_Dashboard/MortgageApplicationSecondStep";
import Mortgage_Application_FourthStep from "./commons/User_Dashboard/MortgageApplicationFourthStep";
import MortgageApplicationFifthStep from "./commons/User_Dashboard/MortgageApplicationFifthStep";
import NewSignUp from "./commons/AuthHandlers/NewSignUp";
import NewSIGNIN from "./commons/AuthHandlers/NewSIGNIN";
import PasswordRecovery from "./commons/AuthHandlers/ForgotPassword";
import Profile_6_disabled_pop from "./commons/User_Dashboard/ProfileStep6disabledform";
import AccountVerification from "./commons/AuthHandlers/AccountVerification";
import EquityFinance from "./commons/User_Dashboard/EquityFinance";
import PersonalLoans from "./commons/User_Dashboard/PersonalLoans";
import AccountSettings from "./commons/User_Dashboard/AccountSettings";
import PreviewPage from "./commons/User_Dashboard/PrintPreview";
import Landing_page from "./commons/Landing_page/landing";
import PreviewApplication from "./commons/User_Dashboard/PreviewApplication";
import PreviewMortgage from "./commons/User_Dashboard/PreviewMortgage";
import Property_Page from "./commons/Property_Page/Property_page";
import Property_Details from "./commons/Property_Page/Property_Details";

// Added Routes by Biodun
import Contact_us_page from "./containers/ContactUsPage";
import Faqs_page from "./containers/NewFAQS";
import Affordability_test_page from "./containers/AffordabilityTestPage";
import Affordability_result_page from "./containers/AffordabilityResultPage";
import Affordability_test_down_payment from "./containers/AffordabilityTestDownPayment";
import Affordability_test_confirmation from "./containers/AffordabilityTestConfirmation";
import {AuthPage, AuthPageLogin, AuthPageRegister} from "./containers/Auth";
// Added Routes by Biodun

//check for token
if (localStorage.token && localStorage.user) {
  //set auth token header auth
  setAuthToken(localStorage.token);
  //set current user and isAuthenticated
  // store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
  // store.dispatch(setCurrentUser(localStorage.user));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (localStorage.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //TODO: Clear current Profile

    // Redirect to login
    window.location.href = "/signin";
  }
}

class Routes extends Component {
  componentDidMount() {
    store.dispatch(setLoading(false));
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container-fluid p-0'>
          <Switch>
            <Route exact path='/' component={Landing_page} />
            {/* Added Routes by Biodun */}
            <Route
              exact
              path='/support/contact-us'
              component={Contact_us_page}
            />
            <Route
              exact
              path='/support/frequently-asked-questions'
              component={Faqs_page}
            />
            <Route
              exact
              path='/affordability-test'
              component={Affordability_test_page}
            />
            <Route
              exact
              path='/affordability-test/result'
              component={Affordability_result_page}
            />
            <Route
              exact
              path='/affordability-test/down-payment'
              component={Affordability_test_down_payment}
            />
            <Route
              exact
              path='/affordability-test/confirmation'
              component={Affordability_test_confirmation}
            />
            <Route exact path='/auth/login' component={AuthPageLogin} />

            <Route exact path='/auth/Register' component={AuthPageRegister} />
            {/* Added Routes by Biodun */}

            {/* AUTH Routes */}
            <Route exact path='/userdashboard' component={Userdashboard} />
            <Route exact path='/signup' component={NewSignUp} />
            <Route exact path='/signin' component={NewSIGNIN} />
            <Route
              exact
              path='/preview_profile'
              component={PreviewApplication}
            />
            <Route
              exact
              path='/password-recovery'
              component={PasswordRecovery}
            />
            <Route exact path='/user-profile' component={Profile_1} />
            <Route exact path='/user-employment-info' component={Profile_2} />
            <Route
              exact
              path='/user-affordability-test'
              component={Profile_3}
            />
            <Route exact path='/user-property-request' component={Profile_4} />
            <Route exact path='/user-request-form' component={Profile_6} />
            <Route
              exact
              path='/mortage-request'
              component={MortgageApplication}
            />
            <Route
              exact
              path='/mortage-request-step-3'
              component={Mortgage_Application_Third}
            />
            <Route
              exact
              path='/mortage-request-step-4'
              component={Mortgage_Application_FourthStep}
            />
            <Route
              exact
              path='/mortage-request-step-5'
              component={MortgageApplicationFifthStep}
            />
            <Route
              exact
              path='/mortage-request-step-2'
              component={MortgageApplication_SecondStep}
            />
            <Route
              exact
              path='/user-request-form-view'
              component={Profile_6_disabled_pop}
            />
            <Route
              exact
              path='/account-verification'
              component={AccountVerification}
            />
            <Route
              exact
              path='/mortgage_application_preview'
              component={PreviewMortgage}
            />
            <Route exact path='/equity-finance' component={EquityFinance} />
            <Route exact path='/personal-loans' component={PersonalLoans} />
            <Route exact path='/account-settings' component={AccountSettings} />
            <Route exact path='/printpage' component={PreviewPage} />
            <Route exact path='/' component={Landing_page} />
            <Route exact path='/properties' component={Property_Page} />
            <Route
              exact
              path='/auth/login'
              component={() => {
                return <Redirect to='/signin' />;
              }}
            />
            <Route exact path='/properties/:id' component={Property_Details} />
            {/* <Switch>
              <PrivateRoute
                exact
                path="/application"
                component={NewApplicationPage}
              />
            </Switch> */}
            <Route component={Error404Page} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
