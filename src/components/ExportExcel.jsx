import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExportExcel({ data }) {
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Office Hours");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, `office-hours-${Date.now()}.xlsx`);
  };

  return (
    <div className="filters">
        <button
            onClick={exportToExcel}
            style={{
                background: "#2563eb",
                color: "white",
                padding: "8px 14px",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
            }}
        >
            ⬇ Export Excel
        </button>
    </div>

  );
}
