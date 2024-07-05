import React from "react";
// Sample data for the charts

const lineChartData = {
  labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
  datasets: [
    {
      label: "# of Votes",
      data: [10, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      fill: false,
    },
  ],
};

const barChartData = {
  labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
  datasets: [
    {
      label: "# of Votes",
      data: [10, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const areaChartData = {
  labels: ["2013", "2014", "2015", "2016", "2017"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      fill: true,
    },
  ],
};

const doughnutChartData = {
  datasets: [
    {
      data: [30, 40, 30],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
    },
  ],
  labels: ["Pink", "Blue", "Yellow"],
};

const pieChartData = {
  datasets: [
    {
      data: [30, 40, 30],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
    },
  ],
  labels: ["Pink", "Blue", "Yellow"],
};

const scatterChartData = {
  datasets: [
    {
      label: "First Dataset",
      data: [
        {
          x: -10,
          y: 0,
        },
        {
          x: 0,
          y: 3,
        },
        {
          x: -25,
          y: 5,
        },
        {
          x: 40,
          y: 5,
        },
      ],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
    },
    {
      label: "Second Dataset",
      data: [
        {
          x: 10,
          y: 5,
        },
        {
          x: 20,
          y: -30,
        },
        {
          x: -25,
          y: 15,
        },
        {
          x: -10,
          y: 5,
        },
      ],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

const Charts = () => {
  return (
    <div>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title"> Chart-js </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Charts</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Chart-js
                </li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Line chart</h4>
                  <canvas id="lineChart" style={{ height: "250px" }}></canvas>
                </div>
              </div>
            </div>
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Bar chart</h4>
                  <canvas id="barChart" style={{ height: "230px" }}></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Area chart</h4>
                  <canvas id="areaChart" style={{ height: "250px" }}></canvas>
                </div>
              </div>
            </div>
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Doughnut chart</h4>
                  <canvas
                    id="doughnutChart"
                    style={{ height: "250px" }}
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Pie chart</h4>
                  <canvas id="pieChart" style={{ height: "250px" }}></canvas>
                </div>
              </div>
            </div>
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Scatter chart</h4>
                  <canvas
                    id="scatterChart"
                    style={{ height: "250px" }}
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
