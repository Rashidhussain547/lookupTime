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
    <div style={{ marginTop: 20, maxHeight: "400px", overflowY: "auto" }}>
      <h3>📋 History Table</h3>

      {/* filters + export */}
      <div style={{ marginBottom: 10, display: "flex", gap: 10 }}>
        <label>
          From:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label>
          To:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <ExportExcel data={exportData} />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #000" }}>
            <th style={{ padding: "4px 8px" }}>Date</th>
            <th>Day</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {filteredDates.map((date) => {
            const record = data[date];
            const day = new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
            });

            return (
              <tr key={date} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "4px 8px" }}>{date}</td>
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
  );
}
