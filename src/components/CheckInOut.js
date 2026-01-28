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
          Checked in at:{" "}
          {new Date(checkInTime).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
