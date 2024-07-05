import React, { useState, useEffect } from "react";

const Total = () => {
  const [totalSum, setTotalSum] = useState(null);

  useEffect(() => {
    // Fetch the total sum from the API
    fetch("http://localhost:3000/total-sum")
      .then((response) => response.json())
      .then((data) => {
        setTotalSum(data.totalSum);
      })
      .catch((error) => {
        console.error("Error fetching total sum:", error);
      });
  }, []);

  return (
    <div style={{ textAlign: "right", marginLeft: "10px" }}>
      <b>
        <p>Total : {totalSum !== null ? totalSum : "Loading..."}</p>
      </b>
    </div>
  );
};

export default Total;
