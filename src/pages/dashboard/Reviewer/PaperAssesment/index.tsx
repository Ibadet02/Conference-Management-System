import React, { useEffect, useState } from "react";
import usePaperAssessment from "../../../../hooks/usePaperAssesment"; // Import your custom hook
import { PaperAssesmentFormProps } from "../../../../types/dashboard/Reviewer/props";
import { PaperAssesmentDataType } from "../../../../types/dashboard/Reviewer/types";
import { initialPaperAssesmentData } from "../../../../data/pages/dashboard/Reviewer/InitialPaperAssesmentData";
import useCreateProject from "../../../../hooks/useCreateProject";
import useCreateDoc from "../../../../hooks/useCreateDoc";
import useAuthentication from "../../../../hooks/useAuthentication";
import { StyledPaperAssesmentForm } from "../../../../styles/pages/dashboard/Reviewer/SubmittedConferences/PaperAssesmentForm.styled";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

const PaperAssessmentForm: React.FC<PaperAssesmentFormProps> = ({
  selectedPaper,
  onClose,
}) => {
  console.log(selectedPaper);
  const authUser = useAuthentication();

  const { submitAssessment, error, submitted, loading } = usePaperAssessment();
  const [formData, setFormData] = useState<PaperAssesmentDataType>(
    initialPaperAssesmentData
  );

  const createReview = useCreateDoc();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createReview(
      {
        assesmentData: formData,
        correspondingAuthor: selectedPaper?.correspondingAuthor,
        projectId: selectedPaper?.projectId,
        reviewerId: authUser?.uid,
        assignedReviewers: selectedPaper?.assignedReviewers,
        paperId: selectedPaper?.paperId,
      },
      "reviewSubmissions"
    );
    try {
      await submitAssessment(
        formData,
        selectedPaper.correspondingAuthor,
        selectedPaper.projectId
      );

      // Reset the form after submission...
    } catch (err) {
      console.error("Error submitting assessment:", err);
      // Handle error scenarios...
    }
  };

  useEffect(() => {
    if(submitted){
      onClose();
    }
  }, [submitted])

  return (
    <StyledPaperAssesmentForm onSubmit={handleFormSubmit}>
      <div style={{position: 'relative', flex: 1, width: '100%', height: '100%', overflow: 'auto'}}>


        <div style={{flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', marginTop: '20px'}}>Access Paper Form</div>

      {/* INPUT FIELDS */}
      <div style={{padding: '1rem', display: 'flex', flexDirection: 'column', gap: '15px',}}>

{/* ____________________Topic_____________________________ */}

      <Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="topic">Topic</InputLabel>
            <Select
            value={formData.topic}
              labelId="topic"
              required
              id="demo-simple-select"
              label="Topic"
              name="topic"
              onChange={(e) =>
                setFormData({ ...formData, topic: parseInt(e.target.value) })
              }
            >
              {[...Array(11).keys()].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>

                <TextField
              required
                multiline
            value={formData.topicComment}
            rows={3}
            onChange={(e) =>
              setFormData({ ...formData, topicComment: e.target.value })
            }
            label={"Topic Comment"}
            style={{width: '100%'}}
                />

{/* ____________________Contribution_____________________________ */}

<Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="topic">Contribution</InputLabel>
            <Select
              required
            value={formData.contribution}
              labelId="contribution"
              id="demo-simple-select"
              label="Contribution"
              name="contribution"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contribution: parseInt(e.target.value),
                })
              }
            >
            {[...Array(11).keys()].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
              required
                multiline
                value={formData.contributionComment}
            rows={3}
            onChange={(e) =>
              setFormData({ ...formData, contributionComment: e.target.value })
            }
            label={"Contribution Comment"}
            style={{width: '100%'}}
                />

{/* ________________________Academic Quality______________________________ */}


<Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="topic">Academic Quality</InputLabel>
            <Select
              required
            value={formData.academicQuality}
              labelId="contribution"
              id="demo-simple-select"
              label="Academic Quality"
              name="contribution"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  academicQuality: parseInt(e.target.value),
                })
              }
            >
            {[...Array(11).keys()].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>


        <TextField
              required
                multiline
                value={formData.academicQualityComment}
            rows={3}
            onChange={(e) =>
              setFormData({
                ...formData,
                academicQualityComment: e.target.value,
              })
            }
            label={"Academic Quality Comment"}
            style={{width: '100%'}}
                />


{/* ________________________Verification of Results______________________________ */}


<Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="topic">Verification of Results</InputLabel>
            <Select
              required
            value={formData.verificationOfResults}
              labelId="Verification of Results"
              id="demo-simple-select"
              label="Verification of Results"
              name="Verification of Results"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  verificationOfResults: parseInt(e.target.value),
                })
              }
            >
             {[...Array(11).keys()].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>


        <TextField
              required
                multiline
                value={formData.verificationOfResultsComment}
            rows={3}
            onChange={(e) =>
              setFormData({
                ...formData,
                verificationOfResultsComment: e.target.value,
              })
            }
            label={"Verification of Results Comment"}
            style={{width: '100%'}}
                />


{/* ________________________Novelty______________________________ */}


<Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="topic">Novelty</InputLabel>
            <Select
              required
            value={formData.novelty}
              labelId="Novelty"
              id="demo-simple-select"
              label="Novelty"
              name="Novelty"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  novelty: parseInt(e.target.value),
                })
              }
            >
            {[...Array(11).keys()].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
              required
                multiline
                value={formData.noveltyComment}
            rows={3}
            onChange={(e) =>
              setFormData({
                ...formData,
                noveltyComment: e.target.value,
              })
            }
            label={"Novelty Comment"}
            style={{width: '100%'}}
                />



{/* ________________________Literature Review and Bibliography______________________________ */}



<Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="topic">Literature Review and Bibliography</InputLabel>
            <Select
              required
              labelId="Literature Review and Bibliography"
              id="demo-simple-select"
              label="Literature Review and Bibliography"
              name="Literature Review and Bibliography"
              value={formData.literatureReviewAndBibliography}
            onChange={(e) =>
              setFormData({
                ...formData,
                literatureReviewAndBibliography: parseInt(e.target.value),
              })
            }
            >
              
            {[...Array(11).keys()].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>

        
        <TextField
              required
                multiline
            rows={3}
            value={formData.literatureReviewAndBibliographyComment}
            onChange={(e) =>
              setFormData({
                ...formData,
                literatureReviewAndBibliographyComment: e.target.value,
              })
            }
            label={"Literature Review and Bibliography Comment"}
            style={{width: '100%'}}
                />


{/* ________________________Language______________________________ */}


<Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="topic">Language</InputLabel>
            <Select
              required
              labelId="Language"
              id="demo-simple-select"
              label="Language"
              name="Language"
              value={formData.language}
            onChange={(e) =>
              setFormData({
                ...formData,
                language: parseInt(e.target.value),
              })
            }
            >
              
            {[...Array(11).keys()].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>


        <TextField
              required
                multiline
            rows={3}
            value={formData.languageComment}
            onChange={(e) =>
              setFormData({
                ...formData,
                languageComment: e.target.value,
              })
            }
            label={"Language Comment"}
            style={{width: '100%'}}
                />


{/* ________________________Style and Format______________________________ */}



<Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="topic">Style and Format</InputLabel>
            <Select
              required
              labelId="Style and Format"
              id="demo-simple-select"
              label="Style and Format"
              name="Style and Format"
              value={formData.styleAndFormat}
            onChange={(e) =>
              setFormData({
                ...formData,
                styleAndFormat: parseInt(e.target.value),
              })
            }
            >
              
            {[...Array(11).keys()].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
              required
                multiline
            rows={3}
            value={formData.styleAndFormatComment}
            onChange={(e) =>
              setFormData({
                ...formData,
                styleAndFormatComment: e.target.value,
              })
            }
            label={"Style and Format Comment"}
            style={{width: '100%'}}
                />

{/* ________________________Summary______________________________ */}



<TextField
              required
                multiline
            rows={3}
            value={formData.summary}
            onChange={(e) =>
              setFormData({
                ...formData,
                summary: e.target.value,
              })
            }
            label={"Summary"}
            style={{width: '100%'}}
                />

{/* ________________________Comments for Organizing Committee______________________________ */}

<TextField
              required
                multiline
            rows={3}
            value={formData.commentsForOrganizingCommittee}
            onChange={(e) =>
              setFormData({
                ...formData,
                commentsForOrganizingCommittee: e.target.value,
              })
            }
            label={"Comments for Organizing Committee"}
            style={{width: '100%'}}
                />

{/* ________________________Recommendation______________________________ */}

<Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="topic">Recommendation</InputLabel>
            <Select
              required
              labelId="Recommendation"
              id="demo-simple-select"
              label="Recommendation"
              name="Recommendation"
              value={formData.recommendation}
            onChange={(e) =>
              setFormData({ ...formData, recommendation: e.target.value })
            }
            >
              {["Reject", "Weak Accept", "Accept", "Strong Accept"].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            )}
            </Select>
          </FormControl>
        </Box>


        
        {/* {error && <p>Error: {error}</p>} */}
      </div>

      <div style={{padding: '1rem', width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
      <Button color="error" variant="contained" type="button" onClick={onClose}>
        close
      </Button>


      {loading ? (
          <LoadingButton
            color="secondary"
            loading={true}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            <span>Submitting</span>
          </LoadingButton>
        ) : (
<Button  color="success" variant="contained" type="submit">Submit Assessment</Button>
        )}

      
      </div>
      </div>
    </StyledPaperAssesmentForm>
  );
};

export default PaperAssessmentForm;
