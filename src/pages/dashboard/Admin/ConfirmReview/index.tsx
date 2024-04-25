import { useState } from "react";
import useGetSubmittedPapers from "../../../../hooks/useGetPapersSubmissions";
import { StyledPapers } from "../../../../styles/pages/dashboard/Admin/Papers/index.styled";
import useGetUsers from "../../../../hooks/useGetUsers";
import useCreatePapersToBeReviewed from "../../../../hooks/useCreatePapersToBeReviewed";
import { StyledConfirmReview } from "../../../../styles/pages/dashboard/Admin/ConfirmReview/index.styled";
import useGetToBeReviewed from "../../../../hooks/useGetToBeReviewed";
import useDownloadPDF from "../../../../hooks/useDownloadPdf";
import useGetReviews from "../../../../hooks/useGetReviews";
import { StyledConferencePopupContainer } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopupContainer.styled";
import Backdrop from "../../../../components/dashboard/mutual/Backdrop";
import AssesmentView from "./AssesmentView";
import useCreateFinalReviews from "../../../../hooks/useCreateFinalReviews";
import conferenceImage from "../../../../assets/images/conferenceMeeting.jpg";
import Button from "@mui/material/Button";


import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useGetFinalReviews from "../../../../hooks/useGetFinalReviews";

const Papers = () => {
  const [isAssesmentViewOpen, setIsAssesmentViewOpen] =
    useState<boolean>(false);
  const [selectedPaper, setSelectedPaper] = useState<any | null>(null);
  const [finalAssessments, setFinalAssessments] = useState<{
    [key: string]: string;
  }>({});
  const {createFinalReviews, iDLoading} = useCreateFinalReviews();
  const { submittedPapers } = useGetSubmittedPapers();
  const { toBeReviewed, loading } = useGetToBeReviewed();
  const { reviews } = useGetReviews();
  const { downloadLastPdf, downloadUrl, error, downloadLoading } = useDownloadPDF();
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const createPapersToBeReviewed = useCreatePapersToBeReviewed();
  const handleFinalAssessmentChange = (
    paperId: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFinalAssessments((prevState) => ({
      ...prevState,
      [paperId]: event.target.value,
    }));
  };
  const handleDownload = (correspondingAuthorId: string, projectId: string, paperId: string) => {
    downloadLastPdf(correspondingAuthorId, projectId, paperId);
  };
  const handleCloseAssesmentView = () => {
    setIsAssesmentViewOpen(false);
  };
  const handleOpenAssesmentView = (paper: any) => {
    setSelectedPaper(paper);
    setIsAssesmentViewOpen(true);
  };
  const maxTableContentLength = 9;
  const handleOverflowedText = (givenText: string) => {
    if (givenText.length > maxTableContentLength) {
      return `${givenText.substring(0, maxTableContentLength)}...`;
    } else {
      return givenText;
    }
  };

  const uniqueRows = toBeReviewed?.filter((row, index, self) =>
  index === self.findIndex((r) => (
    r.paperId === row.paperId
  ))
);

    const {finalReviews, finalReviewsLoading} = useGetFinalReviews();



  return (
    <StyledConfirmReview>
            <div
        style={{
          overflow: "auto",
          width: "100%",
          height: "100%",
          padding: "1rem",
        }}
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
                  uniqueRows?.length > 0 ?
          <table style={{ color: "#5e5e5e", border: "1px solid #ccc" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc" }}>Project ID</th>
                <th style={{ border: "1px solid #ccc" }}>Corresponding Author</th>
                <th style={{ border: "1px solid #ccc" }}>Co-authors</th>
                <th style={{ border: "1px solid #ccc" }}>Assigned Reviewers</th>
                <th style={{ border: "1px solid #ccc" }}>abstract</th>
                <th style={{ border: "1px solid #ccc" }}>File</th>
                <th style={{ border: "1px solid #ccc" }}>Download File</th>
                <th style={{ border: "1px solid #ccc" }}>Final Assesment</th>
                <th style={{ border: "1px solid #ccc" }}>Send</th>
              </tr>
            </thead>
            <tbody>
              {uniqueRows?.map((row: any, dataIndex) => {
                const paperReviewerIds = reviews
                  .filter((rev) => rev.paperId === row.paperId)
                  .map((rev: any) => rev.reviewerId);
                const paperReviews = reviews.filter(
                  (rev) => rev.paperId === row.paperId
                );
                return (
                  <tr key={dataIndex}>
                    <td style={{ border: "1px solid #ccc" }} title={row.projectId}>
                      {handleOverflowedText(row.projectId)}
                    </td>
                    <td style={{ border: "1px solid #ccc" }} title={row.correspondingAuthor}>
                      {handleOverflowedText(row.correspondingAuthor)}
                    </td>
                    <td style={{ border: "1px solid #ccc" }} className="co-authors" title={row.authors}>
                      {row.authors.map((author: any) => {
                        return (
                          <p key={author}>{handleOverflowedText(author)}</p>
                        );
                      })}
                    </td>
                    <td style={{ border: "1px solid #ccc" }} className="co-authors" title={row.assignedReviewers}>
                      {row.assignedReviewers.map((reviewer: any) => {
                        return (
                          <p key={reviewer}>
                            <Button
                              variant="outlined"
                              style={{width: '100%', borderRadius: '0px'}}
                              disabled={
                                reviewer !==
                                paperReviewerIds.find(
                                  (reviewerId) => reviewerId === reviewer
                                )
                              }
                              onClick={() =>
                                handleOpenAssesmentView(
                                  paperReviews.find(
                                    (review) => review.reviewerId === reviewer
                                  )
                                )
                              }
                            >
                              {handleOverflowedText(reviewer)}
                            </Button>
                          </p>
                        );
                      })}
                    </td>
                    <td style={{ border: "1px solid #ccc" }} title={row.abstract}>
                      {handleOverflowedText(row.abstract)}
                    </td>
                    <td style={{ border: "1px solid #ccc" }}>{row.fileId}</td>
                    {/* <td>
                    <div>
                      <label>Assign reviewer(s):</label>
                      <select
                        name="assignedReviewers"
                        value={
                          assignedReviewers[dataIndex]?.[
                            assignedReviewers[dataIndex]?.length - 1
                          ] || ""
                        } // Set value to the last selected author ID or an empty string if no author is selected
                        onChange={(e) =>
                          handleAssignedReviewerChange(e, dataIndex)
                        }
                      >
                        <option value="">Select...</option>
                        {users.map((user: any) => (
                          <option key={user.id} value={user.id}>
                            {`${user.firstName} ${user.lastName}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="selectedUserNames">
                      {assignedReviewerNames[dataIndex]?.map(
                        (reviewerName, index) => (
                          <div key={index}>
                            {reviewerName}{" "}
                            <button
                              type="button"
                              onClick={() =>
                                removeAssignedReviewer(index, dataIndex)
                              }
                            >
                              x
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </td> */}
                    <td style={{ border: "1px solid #ccc" }}>
                      <Button
                      variant="contained"
                        disabled={downloadLoading===row.paperId}
                              style={{width: '100%', borderRadius: '0px'}}
                        onClick={() =>
                          handleDownload(row.correspondingAuthor, row.projectId, row.paperId)
                        }
                      >
                        {
                          (downloadLoading===row.paperId) ?
                          "Downloading"
                          : 
                          "Download"
                        }
                      </Button>
                      {/* <a href={downloadUrl!} target="_blank">
                        d
                      </a> */}
                    </td>
                    <td style={{ border: "1px solid #ccc" }}>
                      {
                        finalReviews?.some((e) => row?.paperId === e?.paperId) ?
                        <>
                        {
                          finalReviews?.find((e) => row?.paperId === e?.paperId)?.finalResult
                        }
                        </>
                        :
                        <>
                    <Box sx={{ width: "100%" }}>
                                <FormControl fullWidth>
                                  <InputLabel id="authors">
                                    Final Assessment
                                  </InputLabel>
                                  <Select
                              style={{width: '100%', borderRadius: '0px'}}
                                    labelId="assignedReviewers"
                                    id="demo-simple-select"
                                    label="Final Assessment"
                                    name="assignedReviewers"
                                    value={finalAssessments[row.paperId] || ""}
                        onChange={(e) =>
                          handleFinalAssessmentChange(row.paperId, e)
                        }
                                  >
                                                            <MenuItem value="">Select...</MenuItem>
                        <MenuItem value="Reject">Reject</MenuItem>
                        <MenuItem value="Weak Accept">Weak Accept</MenuItem>
                        <MenuItem value="Accept">Accept</MenuItem>
                        <MenuItem value="Strong Accept">Strong Accept</MenuItem>
                                    
                                  </Select>
                                </FormControl>
                              </Box>
                              </>
                      }
                    </td>
                    <td style={{ border: "1px solid #ccc" }}>
                        <Button
                        
                              style={{width: '100%', borderRadius: '0px'}}
                        disabled={iDLoading===row?.projectId || finalReviewsLoading || finalReviews?.some((e) => row?.paperId === e?.paperId)}
                        variant="contained"
                        color="success"
                          onClick={() => {
                            const finalReviewData = {
                              ...row,
                              reviews: paperReviews,
                              finalResult: finalAssessments[row.paperId],
                            };
                            createFinalReviews(finalReviewData, "finalReviews");
                          }}
                        >
                          {
                            (finalReviews?.some((e) => row?.paperId === e?.paperId))
                            ?
                            "Sent"
                            :
                            "Send"
                          }
                        </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
                            :
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
                            }
      </div>
      </div>
          {isAssesmentViewOpen && (
            <>
              <StyledConferencePopupContainer>
                <Backdrop onClick={handleCloseAssesmentView} />
                <AssesmentView
                  paperAssesment={selectedPaper}
                  onClose={handleCloseAssesmentView}
                />
              </StyledConferencePopupContainer>
            </>
          )}
        </>
      </div>
    </StyledConfirmReview>
  );
};

export default Papers;
