import React from "react";
import "./Forms.css";

const afordabilityFormStepThree = () => {
  return (
    <form>
      <div className='form-wrapper'>
        <div className='form-group row'>
          <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
            <input
              type='text'
              name='title'
              className='form-control '
              placeholder='First Name'
            />
          </div>

          <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
            <input
              type='text'
              name='title'
              className='form-control '
              placeholder='Last Name'
            />
          </div>

          <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
            <input
              type='text'
              name='title'
              className='form-control '
              placeholder='Email Address'
            />
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
            <input
              type='text'
              name='title'
              className='form-control '
              placeholder='Date of Birth'
            />
          </div>

          <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
            <input
              type='text'
              name='title'
              className='form-control '
              placeholder='phone number'
            />
          </div>

          <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
            <input
              type='text'
              name='title'
              className='form-control '
              placeholder='Employment'
            />
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-lg-12 col-md-6 col-sm-12 col-xs-12'>
            <textarea
              className='form-control'
              name='address'
              placeholder='Address'
              required=''
            ></textarea>
          </div>
        </div>
      </div>
      <div className='form-group row'>
        <div className='offset-lg-3 col-lg-6'>
          <button type='submit' className='affordability-form-btn'>
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};
export default afordabilityFormStepThree;
