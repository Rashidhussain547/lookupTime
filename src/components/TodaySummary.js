import React, { useEffect, useState } from "react";

export default function TodaySummary() {
  const [todayData, setTodayData] = useState(null);
  const todayKey = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("officeData")) || {};
    setTodayData(data[todayKey]);
  }, [todayKey]);

  if (!todayData)
    return <p>Today: No record yet</p>;

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>📅 Today Summary</h3>
      <p>Check In: {todayData.checkIn ? new Date(todayData.checkIn).toLocaleTimeString() : "-"}</p>
      <p>Check Out: {todayData.checkOut ? new Date(todayData.checkOut).toLocaleTimeString() : "-"}</p>
      <p><b>Total Hours:</b> {todayData.totalHours || "-"}</p>
    </div>
  );
}
