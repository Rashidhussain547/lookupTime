import React, { useEffect, useState } from "react";

export default function MonthlySummary() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("officeData")) || {};
    const currentMonth = new Date().getMonth();
    let sum = 0;

    Object.keys(data).forEach((date) => {
      const d = new Date(date);
      if (d.getMonth() === currentMonth && data[date].totalHours) {
        sum += Number(data[date].totalHours);
      }
    });

    setTotal(sum.toFixed(2));
  }, []);

  return (
    <div>
      <h3>📊 Monthly Summary</h3>
      <h2>{total} hrs</h2>
    </div>
  );
}
