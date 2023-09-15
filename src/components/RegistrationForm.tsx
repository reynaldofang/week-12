import React, { useState } from "react";
import { Button, Input, Form as AntForm, Typography, Space, Card } from "antd";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const { Title } = Typography;

const stepValidationSchemas = [
  Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    dob: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),
  }),
  Yup.object().shape({
    streetAddress: Yup.string().required("Street Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string()
      .required("Zip Code is required")
      .matches(/^\d{5}$/, "Invalid Zip Code format (should be 5 digits)"),
  }),
  Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  }),
];

type FormData = {
  fullName: string;
  email: string;
  dob: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  username: string;
  password: string;
};

const initialValues: FormData = {
  fullName: "",
  email: "",
  dob: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  username: "",
  password: "",
};

const RegistrationForm = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = (values: FormData) => {
    if (stepValidationSchemas[step - 1].isValidSync(values)) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="registration-form">
      <Card title={`Step ${step}`} style={{ width: 400, margin: "0 auto" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={stepValidationSchemas[step - 1]}
          onSubmit={(values) => {
            if (step < 3) {
              handleNextStep(values);
            } else {
              console.log("Form submitted with data:", values);
            }
          }}
        >
          {() => (
            <Form>
              {step === 1 && (
                <Space direction="vertical" size="large">
                  <Title level={3}>Personal Information</Title>
                  <AntForm.Item label="Full Name" name="fullName">
                    <Field as={Input} name="fullName" />
                    <ErrorMessage name="fullName" />
                  </AntForm.Item>
                  <AntForm.Item label="Email Address" name="email">
                    <Field as={Input} name="email" />
                    <ErrorMessage name="email" />
                  </AntForm.Item>
                  <AntForm.Item label="Date of Birth" name="dob">
                    <Field as={Input} type="date" name="dob" />
                    <ErrorMessage name="dob" />
                  </AntForm.Item>
                </Space>
              )}
              {step === 2 && (
                <Space direction="vertical" size="large">
                  <Title level={3}>Address Information</Title>
                  <AntForm.Item label="Street Address" name="streetAddress">
                    <Field as={Input} name="streetAddress" />
                    <ErrorMessage name="streetAddress" />
                  </AntForm.Item>
                  <AntForm.Item label="City" name="city">
                    <Field as={Input} name="city" />
                    <ErrorMessage name="city" />
                  </AntForm.Item>
                  <AntForm.Item label="State" name="state">
                    <Field as={Input} name="state" />
                    <ErrorMessage name="state" />
                  </AntForm.Item>
                  <AntForm.Item label="Zip Code" name="zipCode">
                    <Field as={Input} name="zipCode" />
                    <ErrorMessage name="zipCode" />
                  </AntForm.Item>
                </Space>
              )}
              {step === 3 && (
                <Space direction="vertical" size="large">
                  <Title level={3}>Account Information</Title>
                  <AntForm.Item label="Username" name="username">
                    <Field as={Input} name="username" />
                    <ErrorMessage name="username" />
                  </AntForm.Item>
                  <AntForm.Item label="Password" name="password">
                    <Field as={Input.Password} name="password" />
                    <ErrorMessage name="password" />
                  </AntForm.Item>
                </Space>
              )}
              <div className="button-container" style={{ textAlign: "center" }}>
                {step > 1 && (
                  <Button
                    type="default"
                    className="prev-button"
                    onClick={handlePrevStep}
                    style={{ marginRight: "10px", width: "100px" }}
                  >
                    Previous
                  </Button>
                )}
                {step < 3 && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="next-button"
                    style={{ marginRight: "10px", width: "100px" }}
                  >
                    Next
                  </Button>
                )}
                {step === 3 && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submit-button"
                    style={{ marginRight: "10px", width: "100px" }}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default RegistrationForm;
