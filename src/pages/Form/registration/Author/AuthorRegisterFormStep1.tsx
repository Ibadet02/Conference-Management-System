import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { AuthorRegisterFormStep1Props } from "../../../../types/Form/registration/Author/props";
import TextField from '@mui/material/TextField';

const AuthorRegisterFormStep1: React.FC<AuthorRegisterFormStep1Props> = ({
  firstName,
  lastName,
  email,
  phone,
  updateRegisterFields,
}) => {
  return (
    // <StyledUserFormStep id="authorRegisterStep1">
      <div style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', padding: '1rem'}}>
      <TextField 
      id="authorRegisterFirstName"
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
        id="authorRegisterLastName"
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
        id="authorRegisterEmail"
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
        id="authorRegisterPhone"
        name="phone"
        type="tel"
        value={phone}
        label="Phone Number"
        required={false}
        placeholder="+123456789"
        onChange={(e) => updateRegisterFields({ phone: e.target.value })}
        style={{width: '100%'}}
        />
    </div>
    // </StyledUserFormStep>
  );
};

export default AuthorRegisterFormStep1;
