import { useEffect, useState } from "react";
import useGetProjects from "../../../../hooks/useGetProjects";
import useAuthentication from "../../../../hooks/useAuthentication";
import useGetSubmittedPapers from "../../../../hooks/useGetPapersSubmissions";
import useDownloadPDF from "../../../../hooks/useDownloadPdf";
import PaperAssessmentForm from "../PaperAssesment"; // Import the PaperAssessmentForm component
import useGetToBeReviewed from "../../../../hooks/useGetToBeReviewed";
import { StyledSubmittedConferences } from "../../../../styles/pages/dashboard/Reviewer/SubmittedConferences";
import { StyledConferencePopupContainer } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopupContainer.styled";
import Backdrop from "../../../../components/dashboard/mutual/Backdrop";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import conferenceImage from "../../../../assets/images/conference.jpg";
import useGetReviewerData from "../../../../hooks/useGetReviewerData";

const SubmittedConferences = () => {
  // const { projects, loading } = useGetProjects();
  const [isPaperAssessmentFormOpen, setIsPaperAssessmentFormOpen] =
    useState(false);
  // const [selectedPaper, setSelectedPaper] = useState(null);
  const { submittedPapers } = useGetSubmittedPapers();
  const { toBeReviewed, loading } = useGetToBeReviewed();
  const authUser = useAuthentication();
  const { downloadLastPdf, downloadUrl, error, downloadProjectId, downloadLoading } =
    useDownloadPDF();
  const [selectedPaper, setSelectedPaper] = useState(null); // State to track selected paper
  const { userData } = useGetReviewerData();

  const handleDownload = (correspondingAuthorId: string, projectId: string, paperId: string) => {
    downloadLastPdf(correspondingAuthorId, projectId, paperId);
  };

  const downloadFile = async () => {
    if (downloadUrl) {
      try {
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = downloadUrl.substring(downloadUrl.lastIndexOf("/") + 1); // Set the file name for download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    }
  };

  // const handleAssessment = (paper: any) => {
  //   setSelectedPaper(paper); // Set the selected paper for assessment
  // };
  const handleClosePaperAssesmentFormPopup = () => {
    setIsPaperAssessmentFormOpen(false);
  };
  const handleAssesPaperClick = (paper: any) => {
    setSelectedPaper(paper);
    setIsPaperAssessmentFormOpen(true);
  };

  const uniqueRows = toBeReviewed?.filter(
    (row, index, self) =>
      index === self.findIndex((r) => r?.paperId === row?.paperId)
  );

  return (
    <StyledSubmittedConferences>
      <div
        style={{ flex: 1, padding: "1rem", overflow: "auto", height: "100%" }}
      >
          <>
            <div
              style={{
                margin: "1rem",
                flex: 1,
                background: "rgba(255,255,255,1)",
                padding: "1rem",
                borderRadius: "1rem",
                boxShadow: "5px 5px 20px rgba(0,0,0,0.3)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                }}
              >
                {
                  uniqueRows?.length <= 0 ? 
                  <div
        style={{
          height: "200px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#ccc",
        }}
      >
        {loading ? "Loading Data" : "No Data"}
      </div>
      :
      
      <table  style={{ color: "#5e5e5e", border: "1px solid #ccc" }}>
      <thead>
        <tr>
          {/* <th>Paper</th> */}
          <th style={{ border: "1px solid #ccc" }}>Corresponding Author</th>
          <th style={{ border: "1px solid #ccc" }}>Co-authors</th>
          <th style={{ border: "1px solid #ccc" }}>Project</th>
          <th style={{ border: "1px solid #ccc" }}>File</th>
          <th style={{ border: "1px solid #ccc" }}>Download File</th>
          <th style={{ border: "1px solid #ccc" }}>Asses Paper</th>
        </tr>
      </thead>
      <tbody>
        {uniqueRows
          .filter(({ assignedReviewers }) =>
            (assignedReviewers as string[]).includes(authUser?.uid!)
          )
          .map((paper, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc" }}>{paper.correspondingAuthor}</td>
              <td style={{ border: "1px solid #ccc" }}>
                {paper.authors.map((author: any) => {
                  return <p key={author}>{author}</p>;
                })}
              </td>
              <td style={{ border: "1px solid #ccc" }}>{paper.projectId}</td>
              <td style={{ border: "1px solid #ccc" }}>{paper.fileId}</td>
              <td style={{ border: "1px solid #ccc" }}>
                <Button
                  variant="contained"
                  style={{ width: "100%", borderRadius: "0px" }}
                  disabled={downloadLoading === paper.paperId}
                  onClick={() => {
                    handleDownload(
                      paper.correspondingAuthor,
                      paper.projectId,
                      paper.paperId
                    );
                  }}
                >
                  {(downloadLoading === paper.paperId) ? "Downloading" : "Download"}
                </Button>
              </td>
              <td style={{ border: "1px solid #ccc" }}>
                {
                  userData?.assessedPapers?.some(
                    (e) => e?.projectId === paper?.projectId
                  ) ?
                  <>
                  
                {
                  userData?.assessedPapers?.find(
                    (e) => e?.projectId === paper?.projectId
                  )?.recommendation
                }
                  </>
                  :
                <Button
                style={{ width: "100%", borderRadius: "0px" }}
                color="success"
                variant="contained"
                onClick={() => handleAssesPaperClick(paper)}
              >
                ACCESS PAPER
              </Button>
                }
              </td>
              {/* <td>
    <select
      name="assignedReviewers"
      value={
        assignedReviewers[index]?.[
          assignedReviewers[index]?.length - 1
        ] || ""
      }
      onChange={(e) => handleAssignReviewer(e, index)}
    >
      <option value="">Select Reviewer</option>
      {authUser?.uid && (
        <option value={authUser?.uid!}>{authUser?.uid}</option>
      )}
    </select>
  </td> */}
            </tr>
          ))}
      </tbody>
    </table>
                }
                {isPaperAssessmentFormOpen && (
                  <StyledConferencePopupContainer>
                    <Backdrop onClick={handleClosePaperAssesmentFormPopup} />
                    <PaperAssessmentForm
                      // correspondingAuthor={selectedPaper.correspondingAuthor}
                      // projectId={selectedPaper.projectId}
                      selectedPaper={selectedPaper}
                      onClose={handleClosePaperAssesmentFormPopup}
                    />
                  </StyledConferencePopupContainer>
                )}
              </div>
            </div>
          </>
      </div>
    </StyledSubmittedConferences>
  );
};

export default SubmittedConferences;
