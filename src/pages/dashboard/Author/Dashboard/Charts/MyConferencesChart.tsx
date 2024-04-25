import React from "react";
import { Chart } from "react-google-charts";
import useUserAppliedProjects from "../../../../../hooks/useUserAppliedProjects"; // Adjust the path

const MyConferencesChart: React.FC = () => {
  const { userAppliedProjectsData, loading } = useUserAppliedProjects();

  const vibrantColors = [
    "#FF5733",
    "#FFC300",
    "#DAF7A6",
    "#FFC0CB",
    "#7FFFD4",
    "#FF6347",
  ]; // Vibrant bright colors for the bars

  // Process the data to get the coordinates for the bar chart
  const chartData = userAppliedProjectsData
    ? userAppliedProjectsData.map((project) => [
        project.userAppliedProject.title,
        project.userAppliedProject.appliedStudents.length,
      ])
    : [
        ["Conference A", 0],
        ["Conference B", 0],
        ["Conference C", 0],
        ["Conference D", 0],
        ["Conference E", 0],
      ];

  const options = {
    title: "",
    animation: {
      startup: true,
      easing: "linear",
      duration: 1500,
    },
    hAxis: {
      title: "Conferences",
    },
    vAxis: {
      title: "Number of Applied Students",
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
        minWidth: '300px'
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
            MY CONFERENCES
          </div>
          {userAppliedProjectsData?.length > 0 ? (
            <Chart
              chartType="ColumnChart"
              data={[["Conferences", "Number of Applied Students"], ...chartData]}
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

export default MyConferencesChart;
