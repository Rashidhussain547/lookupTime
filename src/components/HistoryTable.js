import React, { useEffect, useState } from "react";
import { formatTime } from "../utils/time";
import ExportExcel from "./ExportExcel";

export default function HistoryTable() {
  const [data, setData] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("officeData")) || {};
    setData(storedData);
  }, []);

  const filteredDates = Object.keys(data).filter((date) => {
    if (!startDate && !endDate) return true;

    const d = new Date(date);
    if (startDate && d < new Date(startDate)) return false;
    if (endDate && d > new Date(endDate)) return false;
    return true;
  });

  // sort by date
  filteredDates.sort((a, b) => new Date(a) - new Date(b));

  // ✅ EXPORT DATA (same as table)
  const exportData = filteredDates.map((date) => {
    const r = data[date];
    return {
      Date: date,
      Day: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
      "Check In": r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : "",
      "Check Out": r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : "",
      "Total Hours": r.totalHours || "",
    };
  });

  return (
  <div>
    <h3>📋 History</h3>

    <div className="filters">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <ExportExcel data={exportData} />
    </div>

    <div className="history-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>In</th>
            <th>Out</th>
            <th>Hours</th>
          </tr>
        </thead>

        <tbody>
          {filteredDates.map((date) => {
            const record = data[date];
            const day = new Date(date).toLocaleDateString("en-US", {
              weekday: "short",
            });

            return (
              <tr key={date}>
                <td>{date}</td>
                <td>{day}</td>
                <td>{formatTime(record.checkIn)}</td>
                <td>{formatTime(record.checkOut)}</td>
                <td>{record.totalHours || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
}
