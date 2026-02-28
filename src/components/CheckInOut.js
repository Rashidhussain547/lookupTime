import React, { useEffect, useState } from "react";

export default function CheckInOut() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  const todayKey = new Date().toISOString().split("T")[0];

  // Load existing data on refresh
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("officeData")) || {};
    if (data[todayKey]?.checkIn && !data[todayKey]?.checkOut) {
      setCheckedIn(true);
      setCheckInTime(data[todayKey].checkIn);
    }
  }, [todayKey]);

  const handleCheckIn = () => {
    const data = JSON.parse(localStorage.getItem("officeData")) || {};

    if (data[todayKey]?.checkIn) {
      alert("Already checked in!");
      return;
    }

    const now = new Date().toISOString();

    data[todayKey] = {
      checkIn: now,
    };

    localStorage.setItem("officeData", JSON.stringify(data));

    setCheckedIn(true);
    setCheckInTime(now);
  };

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

    const outTime = new Date().toISOString();
    const diffMs =
      new Date(outTime) - new Date(data[todayKey].checkIn);
    const hours = (diffMs / (1000 * 60 * 60)).toFixed(2);

    data[todayKey].checkOut = outTime;
    data[todayKey].totalHours = hours;

    localStorage.setItem("officeData", JSON.stringify(data));

    setCheckedIn(false);
    alert(`Checked out ✅ Total hours: ${hours}`);
  };

  const data = JSON.parse(localStorage.getItem("officeData")) || {};
  const daysCount = Object.keys(data).filter(date => data[date].checkIn).length;

  const clearData = () => {
    if (window.confirm("Are you sure you want to clear all data?")) {
      localStorage.removeItem("officeData");
      window.location.reload();
    }
  };
  const markWFH = () => {
    const data = JSON.parse(localStorage.getItem("officeData")) || {};

    if (!data[todayKey]) {
      data[todayKey] = {};
    }

    data[todayKey].wfh = true;

    localStorage.setItem("officeData", JSON.stringify(data));
    window.location.reload();
  };

  const wfhCount = Object.keys(data).filter(date => data[date].wfh === true).length;

  return (
    <div style={{ marginBottom: 20 }}>
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

      {checkedIn && (
        <p style={{ marginTop: 10 }}>
          Checked in at: {new Date(checkInTime).toLocaleTimeString()}
        </p>
      )}
      <div className="leftPanel">
        <h3>Total Working Days: {daysCount}</h3>
        <h3>WFH Days: {wfhCount}</h3>
        <button className="wfhBtn" onClick={markWFH}>Mark WFH</button>
        <button className="clearBtn" onClick={clearData}>Clear Month Data</button>
      </div>
    </div>
  );
}

