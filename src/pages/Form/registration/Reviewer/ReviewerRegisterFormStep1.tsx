import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { ReviewerRegisterFormStep1Props } from "../../../../types/Form/registration/Reviewer/props";
import TextField from '@mui/material/TextField';

const ReviewerRegisterFormStep1: React.FC<ReviewerRegisterFormStep1Props> = ({
  firstName,
  lastName,
  email,
  phone,
  updateRegisterFields,
}) => {
  return (
    <StyledUserFormStep id="reviewerRegisterStep1" style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', padding: '1rem'}}>
      <TextField 
        id="reviewerRegisterFirstName"
              name="firstName"
              type="text"
              value={firstName}
              label="First Name"
              required={true}
              placeholder="Jon"
        onChange={(e) => updateRegisterFields({ firstName: e.target.value })}
        style={{width: '100%'}}
        />

<TextField 
        id="reviewerRegisterLastName"
        name="lastName"
        type="text"
        value={lastName}
        label="Last Name"
        required={true}
        placeholder="Doe"
        onChange={(e) => updateRegisterFields({ lastName: e.target.value })}
        style={{width: '100%'}}
        />

<TextField 
        id="reviewerRegisterEmail"
        name="email"
        type="email"
        value={email}
        label="Email"
        required={true}
        placeholder="example@gmail.com"
        onChange={(e) => updateRegisterFields({ email: e.target.value })}
        style={{width: '100%'}}
        />

<TextField 
        id="reviewerRegisterPhone"
        name="phone"
        type="phone"
        value={phone}
        label="Phone"
        required={true}
        placeholder="+123456789"
        onChange={(e) => updateRegisterFields({ phone: e.target.value })}
        style={{width: '100%'}}
        />

    </StyledUserFormStep>
  );
};

export default ReviewerRegisterFormStep1;