import React, { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import { Button } from "antd";

const App: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div>
      {step === 1 && (
        <>
          <h2>Step 1: Personal Information</h2>
          <RegistrationForm />
          <Button type="primary" onClick={nextStep}>
            Next
          </Button>
        </>
      )}
      {/* Tambahkan langkah-langkah tambahan di sini */}
    </div>
  );
};

export default App;
