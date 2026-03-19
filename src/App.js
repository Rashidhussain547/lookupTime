import "./styles/dashboard.css";
import CheckInOut from "./components/CheckInOut";
import TodaySummary from "./components/TodaySummary";
import MonthlySummary from "./components/MonthlySummary";
import HistoryTable from "./components/HistoryTable";

export default function App() {
  return (
    <div className="container">

      <div className="header">
        <h2>Office Tracker</h2>
      </div>

      <div className="card">
        <CheckInOut />
      </div>

      <div className="card">
        <TodaySummary />
      </div>

      <div className="card">
        <MonthlySummary />
      </div>

      <div className="card">
        <HistoryTable />
      </div>

    </div>
  );
}
