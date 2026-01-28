import "./styles/dashboard.css";
import CheckInOut from "./components/CheckInOut";
import TodaySummary from "./components/TodaySummary";
import MonthlySummary from "./components/MonthlySummary";
import HistoryTable from "./components/HistoryTable";

export default function App() {
  return (
    <div className="container">
      <div className="left-panel">
        <h2>Look up</h2>

        <div className="card">
          <CheckInOut />
        </div>

        <div className="card">
          <TodaySummary />
        </div>

        <div className="card">
          <MonthlySummary />
        </div>
      </div>

      <div className="right-panel">
        <HistoryTable />
      </div>
    </div>
  );
}
