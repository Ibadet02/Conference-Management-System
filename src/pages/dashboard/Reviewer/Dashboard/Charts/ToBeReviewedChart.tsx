import React from "react";
import { Chart } from "react-google-charts";
import useGetToBeReviewed from "../../../../../hooks/useGetToBeReviewed";

const ToBeReviewedChart: React.FC = () => {
  const { toBeReviewed, loading } = useGetToBeReviewed();

  console.log("toBeReviewed", toBeReviewed);

  // Count the number of papers for each corresponding author or project ID
  const data = [["Category", "Number of Papers"]];
  const counts = {};

  toBeReviewed.forEach((paper) => {
    const key = paper.correspondingAuthor || paper.projectId;
    counts[key] = (counts[key] || 0) + 1;
  });

  Object.keys(counts).forEach((key) => {
    data.push([key, counts[key]]);
  });

  const vibrantColors = [
    "#FF5733",
    "#FFC300",
    "#DAF7A6",
    "#FFC0CB",
    "#7FFFD4",
    "#FF6347",
  ];

  const options = {
    title: "",
    animation: {
      startup: true,
      easing: "linear",
      duration: 1500,
    },
    hAxis: {
      title: "Authors/Projects",
    },
    vAxis: {
      title: "Number of Papers",
      minValue: 0,
    },
    colors: vibrantColors,
  };

  return (
    <div
      style={{
        flex: 1,
        background: "rgba(255,255,255,1)",
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "5px 5px 20px rgba(0,0,0,0.2)",
        minWidth: "300px",
      }}
    >
      <>
        <div
          style={{
            width: "100%",
            fontWeight: "bolder",
            textAlign: "center",
            color: "#2e2e2e",
          }}
        >
          TO BE REVIEWED
        </div>
        {toBeReviewed?.length > 0 ? (
          <Chart
            chartType="ColumnChart"
            data={data}
            options={options}
            width="100%"
            height="200px"
            legendToggle
          />
        ) : (
          <div
            className={loading ? "loadingAnimator" : ""}
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
      </>
    </div>
  );
};

export default ToBeReviewedChart;
