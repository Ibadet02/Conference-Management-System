import { useState } from "react";
import useGetSubmittedPapers from "../../../../hooks/useGetPapersSubmissions";
import { StyledPapers } from "../../../../styles/pages/dashboard/Admin/Papers/index.styled";
import useGetUsers from "../../../../hooks/useGetUsers";
import useCreatePapersToBeReviewed from "../../../../hooks/useCreatePapersToBeReviewed";
import conferenceImage from "../../../../assets/images/thirdConference.jpg";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useGetPapersToBeReviewed from "../../../../hooks/useGetPapersToBeReviewed";

const Papers = () => {
  const { loading, submittedPapers } = useGetSubmittedPapers();

  const [submitting, setSubmitting] = useState("");

  const [assignedReviewers, setAssignedReviewers] = useState<string[][]>([]);
  const [assignedReviewerNames, setAssignedReviewerNames] = useState<
    string[][]
  >([]);
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const createPapersToBeReviewed = useCreatePapersToBeReviewed();
  const handleAssignedReviewerChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    dataIndex: number
  ) => {
    const assignedReviewerId = e.target.value;
    const assignedReviewer = users.find(
      (user: any) => user.id === assignedReviewerId
    );

    if (assignedReviewer) {
      setAssignedReviewers((prevData) => {
        const updatedAssignedReviewers = [...prevData];
        const set = new Set(updatedAssignedReviewers[dataIndex]); // Convert to Set
        set.add(assignedReviewerId); // Add the new value
        updatedAssignedReviewers[dataIndex] = Array.from(set); // Convert back to array
        return updatedAssignedReviewers;
      });

      setAssignedReviewerNames((prevData) => {
        const updatedAssignedReviewerNames = [...prevData];
        const set = new Set(updatedAssignedReviewerNames[dataIndex]); // Convert to Set
        set.add(`${assignedReviewer.firstName} ${assignedReviewer.lastName}`); // Add the new value
        updatedAssignedReviewerNames[dataIndex] = Array.from(set); // Convert back to array
        return updatedAssignedReviewerNames;
      });
    }
  };

  const removeAssignedReviewer = (index: number, dataIndex: number) => {
    // Create copies of assignedReviewers and assignedReviewerNames arrays
    const updatedAssignedReviewers = [...assignedReviewers];
    const updatedAssignedReviewerNames = [...assignedReviewerNames];

    // Remove the selected element at the specified index from both arrays
    updatedAssignedReviewers[dataIndex].splice(index, 1);
    updatedAssignedReviewerNames[dataIndex].splice(index, 1);

    // Update the state with the updated arrays
    setAssignedReviewers(updatedAssignedReviewers);
    setAssignedReviewerNames(updatedAssignedReviewerNames);
  };

  const maxTableContentLength = 9;
  const handleOverflowedText = (givenText: string) => {
    if (givenText.length > maxTableContentLength) {
      return `${givenText.substring(0, maxTableContentLength)}...`;
    } else {
      return givenText;
    }
  };
  const handleSendForReview = async (
    paperData: any,
    assignedReviewersData: any
  ) => {
    setSubmitting(paperData?.projectId);
    try {
      const dataToSend = {
        ...paperData,
        assignedReviewers: assignedReviewersData,
      };
      await createPapersToBeReviewed(dataToSend, "toBeReviewed");
      console.log("Paper sent for review successfully!");
      setSubmitting("");
    } catch (error) {
      console.error("Error sending paper for review: ", error);
      setSubmitting("");
    }
  };

  const {toBeReviewed, toBeReviewedLoading} = useGetPapersToBeReviewed();

  const uniqueRows = submittedPapers?.filter(
    (row, index, self) =>
      index === self.findIndex((r) => r?.paperId === row?.paperId)
  );

  return (
    <StyledPapers>
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
              {uniqueRows?.length > 0 ? (
                <table style={{ color: "#5e5e5e", border: "1px solid #ccc" }}>
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ccc" }}>Conference ID</th>
                      <th style={{ border: "1px solid #ccc" }}>Corresponding Author</th>
                      <th style={{ border: "1px solid #ccc" }}>Co-authors</th>
                      <th style={{ border: "1px solid #ccc" }}>Abstract</th>
                      <th style={{ border: "1px solid #ccc" }}>File</th>
                      <th style={{ border: "1px solid #ccc" }}>Assign Reviewer</th>
                      <th style={{ border: "1px solid #ccc" }}>Send for review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniqueRows?.map((row: any, dataIndex) => {
                      const thisItemInDatabase=toBeReviewed?.find((e) => row?.paperId === e?.paperId);
                      return (
                        <tr  key={dataIndex}>
                          <td  style={{ border: "1px solid #ccc" }} title={row.projectId}>
                            {handleOverflowedText(row.projectId)}
                          </td>
                          <td style={{ border: "1px solid #ccc" }} title={row.correspondingAuthor}>
                            {handleOverflowedText(row.correspondingAuthor)}
                          </td>
                          <td style={{ border: "1px solid #ccc" }} className="co-authors" title={row.authors}>
                            {row.authors.map((author: any) => {
                              return (
                                <p key={author}>
                                  {handleOverflowedText(author)}
                                </p>
                              );
                            })}
                          </td>
                          <td style={{ border: "1px solid #ccc" }} title={row.abstract}>
                            {handleOverflowedText(row.abstract)}
                          </td>
                          <td style={{ border: "1px solid #ccc" }}>{row.fileId}</td>
                          <td style={{ border: "1px solid #ccc" }}>
                            
  {thisItemInDatabase?.assignedReviewers?.length > 0 ? (
    <>
    <div className="selectedUserNames">
      {users
        ?.filter((e) =>
          thisItemInDatabase?.assignedReviewers?.some((f) => f === e.id)
        )
        ?.map((reviewerName, index) => (
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              margin: "10px 5px",
              borderRadius: "5px",
              padding: "5px",
              alignItems: "center",
              gap: "5px",
            }}
            key={index}
          >
            {reviewerName?.firstName}{" "}{reviewerName?.lastName}
          </div>
        ))}
        </div>
    </>
  ) : (
    <>
    <div>
                              <Box sx={{ width: "100%" }}>
                                <FormControl fullWidth>
                                  <InputLabel id="authors">
                                    Assign reviewer(s)
                                  </InputLabel>
                                  <Select
                                    labelId="assignedReviewers"
                                    id="demo-simple-select"
                                    label="Assign reviewer(s)"
                                    name="assignedReviewers"
                                    disabled={toBeReviewedLoading}
                                    style={{
                                      borderRadius: "0px",
                                      width: "100%",
                                    }}
                                    value={
                                      assignedReviewers[dataIndex]?.[
                                        assignedReviewers[dataIndex]?.length - 1
                                      ] || ""
                                    } // Set value to the last selected author ID or an empty string if no author is selected
                                    onChange={(e) =>
                                      handleAssignedReviewerChange(e, dataIndex)
                                    }
                                  >
                                    <MenuItem value="">Select...</MenuItem>
                                    {users.map((user: any) => (
                                      <MenuItem key={user.id} value={user.id}>
                                        {`${user.firstName} ${user.lastName}`}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Box>
                            </div>
    <div className="selectedUserNames">
      {assignedReviewerNames[dataIndex]?.map((reviewerName, index) => (
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            margin: "10px 5px",
            background: "#ccc",
            borderRadius: "5px",
            padding: "5px",
            alignItems: "center",
            gap: "5px",
          }}
          key={index}
        >
          {reviewerName}{" "}
          <IconButton
            type="button"
            onClick={() => removeAssignedReviewer(index, dataIndex)}
            aria-label="delete"
            size="small"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      ))}
      </div>
    </>
  )}

                          </td>
                          <td style={{ border: "1px solid #ccc" }}>
                            <Button
                              variant="contained"
                              style={{ borderRadius: "0px", width: "100%" }}
                              disabled={submitting === row?.paperId || toBeReviewedLoading || 
                              toBeReviewed?.some((e) => row?.paperId === e?.paperId)}
                              onClick={() =>
                                handleSendForReview(
                                  row,
                                  assignedReviewers[dataIndex]
                                )
                              }
                            >
                              {
                                (toBeReviewed?.some((e) => row?.paperId === e?.paperId)) ?
                                "Sent for review"
                                :
                                "Send for review"
                              }
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
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
              )}
            </div>
          </div>
        </>
      </div>
    </StyledPapers>
  );
};

export default Papers;
