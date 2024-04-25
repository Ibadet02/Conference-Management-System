import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { AuthorRegisterFormStep3Props } from "../../../../types/Form/registration/Author/props";
import TextField from '@mui/material/TextField';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";


const AuthorRegisterFormStep3: React.FC<AuthorRegisterFormStep3Props> = ({
  password,
  updateRegisterFields,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <StyledUserFormStep id="authorRegisterStep3" style={{padding: '1rem'}}>

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

export default AuthorRegisterFormStep3;
