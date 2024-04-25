import React from "react";
import { AuthorRegisterFormStep2Props } from "../../../../types/Form/registration/Author/props";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { initialRegisterFormData } from "../../../../data/pages/Form/registration/InitialRegisterFormData";
import {
  InitialRegisterFormDataType,
  RegisterDropdownNamesType,
  StringDropdownInputType,
} from "../../../../types/Form/registration/types";
import DropdownInputWithLabel from "../../../../components/Form/DropdownInputWithLabel";


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const AuthorRegisterFormStep2: React.FC<AuthorRegisterFormStep2Props> = ({
  affiliation,
  academicInterest,
  program,
  supervisor,
  updateRegisterFields,
}) => {
  const handleDropdownChange = (
    fieldName: RegisterDropdownNamesType,
    selectedValue: string
  ) => {
    const updatedField = {
      ...(initialRegisterFormData.author[
        fieldName as keyof InitialRegisterFormDataType["author"]
      ] as StringDropdownInputType),
      selectedOption: selectedValue,
    };
    updateRegisterFields({
      [fieldName]: updatedField,
    });
  };
  return (
    <StyledUserFormStep id="authorRegisterStep2" style={{display: "flex", flexDirection: 'column', gap: '10px', padding: '1rem'}}>

<Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Affiliation</InputLabel>
        <Select
          value={affiliation.selectedOption}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Affiliation"
          name="affiliation"
          onChange={(e) => handleDropdownChange("affiliation", e.target.value)}
        >
          {affiliation.options?.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Academic Interest</InputLabel>
        <Select
          value={academicInterest.selectedOption}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Academic Interest"
          name="academicInterest"
          onChange={(e) => handleDropdownChange("academicInterest", e.target.value)}
        >
          {academicInterest.options?.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Program</InputLabel>
        <Select
          value={program.selectedOption}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Program"
          name="program"
          onChange={(e) => handleDropdownChange("program", e.target.value)}
        >
          {program.options?.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
        <Select
          value={supervisor.selectedOption}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Supervisor"
          name="supervisor"
          onChange={(e) => handleDropdownChange("supervisor", e.target.value)}
        >
          {supervisor.options?.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>

    </StyledUserFormStep>
  );
};

export default AuthorRegisterFormStep2;
