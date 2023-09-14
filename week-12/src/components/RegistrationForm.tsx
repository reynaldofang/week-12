// src/components/RegistrationForm.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);

  const initialValues = {
    fullName: "",
    email: "",
    dateOfBirth: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    dateOfBirth: Yup.date()
      .required("Date of Birth is required")
      .test("valid-age", "Age must be at least 18", (value) => {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
      }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle submission of the complete form data
      console.log("Complete Form Data:", values);
      // You can send the data to a server, navigate to another page, etc.
    },
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Personal Information</h2>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
              />
              {formik.errors.fullName && (
                <div className="error">{formik.errors.fullName}</div>
              )}
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>
            <div>
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                onChange={formik.handleChange}
                value={formik.values.dateOfBirth}
              />
              {formik.errors.dateOfBirth && (
                <div className="error">{formik.errors.dateOfBirth}</div>
              )}
            </div>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </form>
        </div>
      )}
      {/* Add more steps as needed */}
      {/* Example of a second step */}
      {step === 2 && (
        <div>
          <h2>Step 2: Skill Set</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Add fields for skill set */}
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
