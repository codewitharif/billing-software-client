import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import SideBar from "./Sidebar";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
const Reports = () => {
  const chartRefs = {
    barChartRef: useRef(null),
    lineChartRef: useRef(null),
    doughnutChartRef: useRef(null),
  };

  useEffect(() => {
    const ctx = chartRefs.barChartRef.current.getContext("2d");
    const barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Sales",
            data: [450, 600, 700, 800, 600, 750],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      barChart.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = chartRefs.lineChartRef.current.getContext("2d");
    const lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Revenue",
            data: [500, 550, 600, 700, 800, 900],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      lineChart.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = chartRefs.doughnutChartRef.current.getContext("2d");
    const doughnutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 40, 120, 80],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    return () => {
      doughnutChart.destroy();
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="container" style={{ marginTop: "50px" }}>
          <h3>Reports</h3>
          <hr />
          <div className="row">
            <div className="col-md-4">
              <canvas ref={chartRefs.barChartRef}></canvas>
            </div>
            <div className="col-md-4">
              <canvas ref={chartRefs.lineChartRef}></canvas>
            </div>
            <div className="col-md-4">
              <canvas ref={chartRefs.doughnutChartRef}></canvas>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Reports;
