import { StyledRegistrationBox } from "../../../styles/pages/Form/registration/RegistrationBox.styled";
import { RegistrationBoxProps } from "../../../types/Form/registration/props";
import UserFormButton from "../UserFormButton";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate} from 'react-router-dom';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.mode === "light" ? "green" : "#308fe8",
  },
}));

const RegistrationBox: React.FC<RegistrationBoxProps> = ({
  currentStepIndex,
  step,
  steps,
  isFirstStep,
  isLastStep,
  goTo,
  back,
  loading,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate=useNavigate();

  useEffect(() => {
    setActiveStep(currentStepIndex);
  }, [currentStepIndex]);

  return (
    <StyledRegistrationBox>
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "2rem",
          marginBottom: "0px",
        }}
      >
        Registration Form
      </div>
      <div
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.8)",
          backDropFilter: "blur(10px)",
          width: "100%",
          borderRadius: "1.5rem",
          boxShadow: "5px 5px 30px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <BorderLinearProgress
            variant="determinate"
            value={currentStepIndex * 50}
            style={{ color: "yellow" }}
          />
        </Box>

        <div style={{ flex: 1, overflow: "auto", height: "100%", paddingBottom: '3rem' }}>
          <div
            id="steps"
            style={{
              flex: 1,
              margin: "10px auto",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "30px",
            }}
          >
            {new Array(steps.length).fill(0).map((_, index) => {
              return (
                <button
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    outline: "none",
                    border: "none",
                    background: index === activeStep ? "#4caf4f" : "#eee",
                    color: index === activeStep ? "#fff" : "#4caf4f",
                    width: "50px",
                    boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                  key={index}
                  type="button"
                  onClick={() => {
                    goTo(index);
                  }}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div></div>
          {/* <div id="currentStep">
          <span>
            {currentStepIndex + 1}/{steps.length}
          </span>
        </div> */}
          <div
            id="form"
            style={{
              width: "100%",
              padding: "1rem",
              background: "transparent",
            }}
          >
            {step}
            <div
              style={{
                flex: 1,
                bottom: 0,
                justifyContent: "center",
                gap: "10px",
                display: "flex",
              }}
            >
              {loading ? (
                <LoadingButton
                  color="secondary"
                  loading={true}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  <span>REGISTERING</span>
                </LoadingButton>
              ) : (
                <>
                  {!isFirstStep && (
                    <Button
                      variant="contained"
                      style={{ background: "#1e1e1e" }}
                      type="button"
                      onClick={back}
                    >
                      Back
                    </Button>
                  )}
                  {/* <UserFormButton isLastStep={isLastStep} buttonAction={"Next"} /> */}
                  {
                    <Button variant="contained" color="success" type={"submit"}>
                      {isLastStep ? "Finish" : "Next"}
                    </Button>
                  }
                </>
              )}
            </div>


            
        <div
          style={{
            padding: "20px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            color: "#2e2e2e",
            paddingBottom: '0px'
          }}
        >
          <div>Already have an account?</div>
          <div onClick={() => {
            navigate('/signin')
          }} style={{ fontWeight: "bold", color: "#2e7d32", cursor: 'pointer' }}>Sign In</div>
        </div>

          </div>
        </div>
      </div>
    </StyledRegistrationBox>
  );
};

export default RegistrationBox;
