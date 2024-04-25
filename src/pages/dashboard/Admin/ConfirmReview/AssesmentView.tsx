import { StyledAssesmentView } from "../../../../styles/pages/dashboard/Admin/ConfirmReview/AssesmentView.styled";
import { AssesmentViewProps } from "../../../../types/dashboard/Admin/props";
import Button from "@mui/material/Button";

const AssesmentView: React.FC<AssesmentViewProps> = ({
  onClose,
  paperAssesment,
}) => {
    const assesmentData = paperAssesment.assesmentData;
  return (
    <StyledAssesmentView>
      <div style={{width: '100%', height: '100%', padding: '1rem', overflow: 'auto'}}>
        
      <div
          style={{
            width: "100%",
            fontWeight: "bolder",
            textAlign: "center",
            color: "#2e2e2e",
            marginBottom: '15px'
          }}
        >
          REVIEW
        </div>
        <div style={{flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '15px'}}>
      <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', padding: '5px', borderRadius: '5px', padding: '10px 20px'}}>
        <h4>Topic: {assesmentData.topic}</h4>
        <h4>Topic Comment: {assesmentData.topicComment}</h4>
      </div>
      <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', padding: '5px', borderRadius: '5px', padding: '10px 20px'}}>
        <h4>Contribution: {assesmentData.contribution}</h4>
        <h4>Contribution Comment: {assesmentData.contributionComment}</h4>
      </div>
      <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', padding: '5px', borderRadius: '5px', padding: '10px 20px'}}>
        <h4>Academic Quality: {assesmentData.academicQuality}</h4>
        <h4>Academic Quality Comment: {assesmentData.academicQualityComment}</h4>
      </div>
      <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', padding: '5px', borderRadius: '5px', padding: '10px 20px'}}>
        <h4>Verification of Results: {assesmentData.verificationOfResults}</h4>
        <h4>Verification of Results Comment: {assesmentData.verificationOfResultsComment}</h4>
      </div>
      <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', padding: '5px', borderRadius: '5px', padding: '10px 20px'}}>
        <h4>Novelty: {assesmentData.novelty}</h4>
        <h4>Novelty Comment: {assesmentData.noveltyComment}</h4>
      </div>
      <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', padding: '5px', borderRadius: '5px', padding: '10px 20px'}}>
        <h4>Literature Review and Bibliography: {assesmentData.literatureReviewAndBibliography}</h4>
        <h4>Literature Review and Bibliography Comment: {assesmentData.literatureReviewAndBibliographyComment}</h4>
      </div>
      <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', padding: '5px', borderRadius: '5px', padding: '10px 20px'}}>
        <h4>Language: {assesmentData.language}</h4>
        <h4>Language Comment: {assesmentData.languageComment}</h4>
      </div>
      <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', padding: '5px', borderRadius: '5px', padding: '10px 20px'}}>
        <h4>Style and Format: {assesmentData.styleAndFormat}</h4>
        <h4>Style and Format Comment: {assesmentData.styleAndFormatComment}</h4>
      </div>
      <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', padding: '5px', borderRadius: '5px', padding: '10px 20px'}}>
        <h4>Summary: {assesmentData.summary}</h4>
      </div>
      <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', padding: '5px', borderRadius: '5px', padding: '10px 20px'}}>
        <h4>Comments for Organizing Committee: {assesmentData.commentsForOrganizingCommittee}</h4>
      </div>
      <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', padding: '5px', borderRadius: '5px', padding: '10px 20px'}}>
        <h4>Recommendation: {assesmentData.recommendation}</h4>
      </div>
      </div>
      
      <Button variant="contained" style={{width: '100%'}} onClick={onClose}>close</Button>

      </div>
      
    </StyledAssesmentView>
  );
};

export default AssesmentView;
