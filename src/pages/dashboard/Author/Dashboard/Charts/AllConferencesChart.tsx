import React from "react";
import { Chart } from "react-google-charts";
import useGetProjects from "../../../../../hooks/useGetProjects";

const AllConferencesChart: React.FC = () => {
  const { projects, loading } = useGetProjects();

  // Prepare data for the chart
  const chartData = projects.map((project) => {
    return [project.title, project.appliedStudents.length];
  });

  const vibrantColors = ["#7047eb"];

  const options = {
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
        marginTop: "20px",
        overflow: 'hidden'
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
          ALL CONFERENCES
        </div>
        {projects?.length > 0 ? (
          <Chart
            chartType="LineChart"
            data={[["Conference", "Number of Applied Students"], ...chartData]}
            options={options}
            width="100%"
            height="400px"
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

export default AllConferencesChart;
