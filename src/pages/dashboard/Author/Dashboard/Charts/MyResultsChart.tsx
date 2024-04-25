import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useGetCollection from "../../../../../hooks/useGetCollection";
import useAuthentication from "../../../../../hooks/useAuthentication";

const MyResultsChart: React.FC = () => {
  const { collectionState, loading } = useGetCollection("finalReviews");
  const authUser = useAuthentication();

  const [chartData, setChartData] = useState<any[]>([]);
  const [thisPlottingData, setThisPlottingData] = useState([]);

  useEffect(() => {
    const plottingData = collectionState?.collection?.filter(
      (result: any) => result.correspondingAuthor === authUser?.uid
    );
    setThisPlottingData(plottingData);
    const counts = {
      Reject: 0,
      "Weak Accept": 0,
      Accept: 0,
      "Strong Accept": 0,
    };

    plottingData?.forEach((data: any) => {
      counts[data.finalResult]++;
    });

    const dataForChart = Object.entries(counts).map(([result, count]) => [
      result,
      count,
    ]);

    setChartData([["Final Result", "Count"], ...dataForChart]);
  }, [collectionState]);

  const options = {
    title: "",
    pieHole: 0,
    animation: {
      startup: true,
      easing: "out",
      duration: 1000,
    },
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
          MY RESULTS
        </div>
        {thisPlottingData?.length > 0 ? (
          <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width="100%"
            height="200px"
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

export default MyResultsChart;
