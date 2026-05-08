import React, { useEffect, useState } from "react";

export default function CheckInOut() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  const [manualCheckIn, setManualCheckIn] = useState("");
  const [manualCheckOut, setManualCheckOut] = useState("");

  const todayKey = new Date().toISOString().split("T")[0];

  // Load today's data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("officeData")) || {};

    if (data[todayKey]?.checkIn && !data[todayKey]?.checkOut) {
      setCheckedIn(true);
      setCheckInTime(data[todayKey].checkIn);
    }
  }, [todayKey]);

  // CHECK IN
  const handleCheckIn = () => {
    const data = JSON.parse(localStorage.getItem("officeData")) || {};

    if (data[todayKey]?.checkIn) {
      alert("Already checked in!");
      return;
    }

    const now = new Date();

    // Manual Time
    if (manualCheckIn) {
      const [hours, minutes] = manualCheckIn.split(":");

      now.setHours(hours);
      now.setMinutes(minutes);
      now.setSeconds(0);
    }

    data[todayKey] = {
      checkIn: now.toISOString(),
      wfh: false,
    };

    localStorage.setItem("officeData", JSON.stringify(data));

    setCheckedIn(true);
    setCheckInTime(now.toISOString());

    setManualCheckIn("");
  };

  // CHECK OUT
  const handleCheckOut = () => {
    const data = JSON.parse(localStorage.getItem("officeData")) || {};

    if (!data[todayKey]?.checkIn) {
      alert("Pehle check in karo");
      return;
    }

    if (data[todayKey]?.checkOut) {
      alert("Already checked out!");
      return;
    }

    const now = new Date();

    // Manual Time
    if (manualCheckOut) {
      const [hours, minutes] = manualCheckOut.split(":");

      now.setHours(hours);
      now.setMinutes(minutes);
      now.setSeconds(0);
    }

    const outTime = now.toISOString();

    const diffMs =
      new Date(outTime) - new Date(data[todayKey].checkIn);

    const hours = (diffMs / (1000 * 60 * 60)).toFixed(2);

    data[todayKey].checkOut = outTime;
    data[todayKey].totalHours = hours;

    localStorage.setItem("officeData", JSON.stringify(data));

    setCheckedIn(false);

    setManualCheckOut("");

    alert(`Checked out ✅ Total hours: ${hours}`);
  };

  // STATS
  const data = JSON.parse(localStorage.getItem("officeData")) || {};

  const daysCount = Object.keys(data).filter(
    (date) => data[date].checkIn
  ).length;

  const wfhCount = Object.keys(data).filter(
    (date) => data[date].wfh === true
  ).length;

  // CLEAR ALL
  const clearData = () => {
    if (window.confirm("Are you sure you want to clear all data?")) {
      localStorage.removeItem("officeData");
      window.location.reload();
    }
  };

  // MARK WFH
  const markWFH = () => {
    const data = JSON.parse(localStorage.getItem("officeData")) || {};

    if (!data[todayKey]) {
      data[todayKey] = {};
    }

    data[todayKey].wfh = true;

    localStorage.setItem("officeData", JSON.stringify(data));

    window.location.reload();
  };

  // CLEAR TODAY
  const clearToday = () => {
    const data = JSON.parse(localStorage.getItem("officeData")) || {};

    if (!data[todayKey]) {
      alert("No record for today");
      return;
    }

    const confirmDelete = window.confirm(
      "Clear today's record?"
    );

    if (!confirmDelete) return;

    delete data[todayKey];

    localStorage.setItem("officeData", JSON.stringify(data));

    window.location.reload();
  };

  return (
    <div>
      {/* MANUAL TIME INPUTS */}
      <div className="manual-time-section">
        <div className="time-input-group">
          <label>Manual Check-In</label>

          <input
            type="time"
            value={manualCheckIn}
            onChange={(e) => setManualCheckIn(e.target.value)}
          />
        </div>

        <div className="time-input-group">
          <label>Manual Check-Out</label>

          <input
            type="time"
            value={manualCheckOut}
            onChange={(e) => setManualCheckOut(e.target.value)}
          />
        </div>
      </div>

      {/* CHECK IN / OUT */}
      <div className="btn-group">
        <button
          onClick={handleCheckIn}
          disabled={checkedIn}
          className="btn btn-green"
        >
          Check In
        </button>

        <button
          onClick={handleCheckOut}
          disabled={!checkedIn}
          className="btn btn-red"
        >
          Check Out
        </button>
      </div>

      {/* CURRENT STATUS */}
      {checkedIn && (
        <p style={{ marginTop: 10 }}>
          Checked in at:{" "}
          {new Date(checkInTime).toLocaleTimeString()}
        </p>
      )}

      {/* STATS */}
      <div className="stats">
        <div className="stat-box">
          Working Days: {daysCount}
        </div>

        <div className="stat-box">
          WFH Days: {wfhCount}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div
        style={{
          marginTop: 10,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <button className="wfhBtn" onClick={markWFH}>
          WFH
        </button>

        <button
          className="clearTodayBtn"
          onClick={clearToday}
        >
          Clear Today
        </button>

        <button className="clearBtn" onClick={clearData}>
          Clear Month
        </button>
      </div>
    </div>
  );
}
