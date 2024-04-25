import React from "react";
import { StyledDashboardPageLayout } from "../../../../styles/pages/dashboard/DashboardPageLayout.styled";
import useGetCollection from "../../../../hooks/useGetCollection";
import useAuthentication from "../../../../hooks/useAuthentication";
import thirdConference from "../../../../assets/images/thirdConference.jpg";
import useGetProjects from "../../../../hooks/useGetProjects";

const Results = () => {
  const { collectionState, loading } = useGetCollection("finalReviews");
  const { projects } = useGetProjects();
  const authUser = useAuthentication();

  // const loading = true;
  // const collectionState={collection: []};

  return (
    <StyledDashboardPageLayout style={{ overflow: "hidden" }}>
      <div
        style={{ flex: 1, padding: "1rem", overflow: "auto", height: "100%" }}
      >
        <div
          className="first-name"
          style={{
            margin: "1rem",
            flex: 1,
            background: "rgba(255,255,255,1)",
            padding: "1rem",
            borderRadius: "1rem",
            boxShadow: "5px 5px 20px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              width: "100%",
              fontWeight: "bolder",
              textAlign: "center",
              color: "#2e2e2e",
              marginBottom: "15px",
            }}
          >
            REVIEWS
          </div>

          <div
            style={{
              flex: 1,
              padding: "10px",
              background: "#fff",
              borderRadius: "10px",
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
                        !loading ?
                      <table
                        style={{
                          color: "#5e5e5e",
                          border: "1px solid #ccc",
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th style={{ border: "1px solid #ccc" }}>
                              Project Title
                            </th>
                            <th style={{ border: "1px solid #ccc" }}>
                              Abstract
                            </th>
                            <th style={{ border: "1px solid #ccc" }}>
                              Corresponding Author Reviews
                            </th>
                            <th style={{ border: "1px solid #ccc" }}>Result</th>
                          </tr>
                        </thead>
                        <tbody>
            {collectionState?.collection.filter(
              (result) => result.correspondingAuthor === authUser?.uid
            )?.length > 0 ? (
              <>
                {collectionState?.collection
                  .filter(
                    (result) => result.correspondingAuthor === authUser?.uid
                  )
                  .map((res, index) => (

                          <tr>
                            <td
                              style={{ border: "1px solid #ccc" }}
                              title={res.abstract}
                            >
                              {
                                projects?.find((e) => e?.id === res?.projectId)
                                  ?.title
                              }
                            </td>
                            <td
                              style={{ border: "1px solid #ccc" }}
                              title={res.abstract}
                            >
                              {res?.abstract}
                            </td>

                            <td
                              style={{ border: "1px solid #ccc" }}
                              title={res.abstract}
                            >
                              {
                                res?.reviews?.length>0 ? 
                             
                              <>
                              {res?.reviews?.map((item, index) => (
                                <div
                                  style={{
                                    background:
                                      item?.assesmentData?.recommendation ===
                                      "Strong Accept"
                                        ? "#28a745"
                                        : item?.assesmentData
                                            ?.recommendation === "Accept"
                                        ? "#6f42c1"
                                        : item?.assesmentData
                                            ?.recommendation === "Weak Accept"
                                        ? "#fd7e14"
                                        : "#dc3545",
                                    padding: "5px",
                                    color: "#fff",
                                    margin: "2px",
                                  }}
                                >
                                  <b>Reviewer{index + 1}</b>:{" "}
                                  {item?.assesmentData?.recommendation}
                                </div>
                              ))}
                              </>
                              :
                              "No Reviews"
                                }
                            </td>
                            <td
                              style={{ border: "1px solid #ccc" }}
                              title={res.finalResult}
                            >
                              <div
                                style={{
                                  background:
                                    res?.finalResult === "Strong Accept"
                                      ? "#28a745"
                                      : res?.finalResult === "Accept"
                                      ? "#6f42c1"
                                      : res?.finalResult === "Weak Accept"
                                      ? "#fd7e14"
                                      : "#dc3545",
                                  padding: "5px",
                                  color: "#fff",
                                  margin: "2px",
                                }}
                              >
                                {res?.finalResult}
                              </div>
                            </td>
                          </tr>
                  ))}
              </>
            ) : (
              <>
                <div
                  className={loading ? "loadingAnimator" : ""}
                  style={{
                    height: "100px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#ccc",
                  }}
                >
                  {loading ? "Loading Data" : "No Results"}
                </div>
              </>
            )}
            
            </tbody>
                      </table>
                      :
                      <div
                      style={{
                        height: "100px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#ccc",
                      }}
                    >
                      Loading Data
                    </div>
                      }
                    </div>
          </div>
        </div>
      </div>
    </StyledDashboardPageLayout>
  );
};

export default Results;
