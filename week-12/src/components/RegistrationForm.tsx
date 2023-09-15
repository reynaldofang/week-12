import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  dob: Yup.date()
    .required('Date of Birth is required')
    .max(new Date(), 'Date of Birth cannot be in the future'),
  streetAddress: Yup.string().required('Street Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string()
    .required('Zip Code is required')
    .matches(/^\d{5}$/, 'Invalid Zip Code format (should be 5 digits)'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const initialValues: {
    fullName: string;
    email: string;
    dob: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    username: string;
    password: string;
  } = {
    fullName: '',
    email: '',
    dob: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    username: '',
    password: '',
  };

  return (
    <div>
      <h2>Step {step} - {step === 1 ? 'Personal Information' : step === 2 ? 'Address Information' : 'Account Information'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            if (step < 3) {
              handleNextStep();
            } else {
              // hasil akan muncul di console log tersebut
              console.log('Form submitted data :', values);
              setSubmitting(false);
            }
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {step === 1 && (
              <>
                <div>
                  <label htmlFor="fullName">Full Name:</label>
                  <Field type="text" id="fullName" name="fullName" />
                  <ErrorMessage name="fullName" component="div" />
                </div>
                <div>
                  <label htmlFor="email">Email Address:</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div>
                  <label htmlFor="dob">Date of Birth:</label>
                  <Field type="date" id="dob" name="dob" />
                  <ErrorMessage name="dob" component="div" />
                </div>
                <div>
                  <button type="button" onClick={handleNextStep} disabled={isSubmitting}>
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <label htmlFor="streetAddress">Street Address:</label>
                  <Field type="text" id="streetAddress" name="streetAddress" />
                  <ErrorMessage name="streetAddress" component="div" />
                </div>
                <div>
                  <label htmlFor="city">City:</label>
                  <Field type="text" id="city" name="city" />
                  <ErrorMessage name="city" component="div" />
                </div>
                <div>
                  <label htmlFor="state">State:</label>
                  <Field type="text" id="state" name="state" />
                  <ErrorMessage name="state" component="div" />
                </div>
                <div>
                  <label htmlFor="zipCode">Zip Code:</label>
                  <Field type="text" id="zipCode" name="zipCode" />
                  <ErrorMessage name="zipCode" component="div" />
                </div>
                <div>
                  <button type="button" onClick={handlePrevStep} disabled={isSubmitting}>
                    Previous
                  </button>
                  <button type="button" onClick={handleNextStep} disabled={isSubmitting}>
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div>
                  <label htmlFor="username">Username:</label>
                  <Field type="text" id="username" name="username" />
                  <ErrorMessage name="username" component="div" />
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <div>
                  <button type="button" onClick={handlePrevStep} disabled={isSubmitting}>
                    Previous
                  </button>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
