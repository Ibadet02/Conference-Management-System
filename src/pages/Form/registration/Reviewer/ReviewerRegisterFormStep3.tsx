import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { ReviewerRegisterFormStep3Props } from "../../../../types/Form/registration/Reviewer/props";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


const ReviewerRegisterFormStep3: React.FC<ReviewerRegisterFormStep3Props> = ({
  password,
  updateRegisterFields,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <StyledUserFormStep id="reviewerRegisterStep3" style={{padding: '1rem'}}>

<TextField
      id="authorRegisterPassword"
      name="password"
      type={showPassword ? "text" : "password"}
      value={password}
      label="Password"
      required={true}
      placeholder="jFuk&En2w9e@jre$18G"
      onChange={(e) => updateRegisterFields({ "password": e.target.value })}
      style={{width: '100%'}}
      
      />
      
      <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={() => {
                setShowPassword((prev) => !prev);
              }}
            />
          }
          label="Show Password"
        />
    </StyledUserFormStep>
  );
};

export default ReviewerRegisterFormStep3;
