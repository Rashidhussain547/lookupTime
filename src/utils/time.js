// yyyy-mm-dd (for key)
export const getTodayKey = () => {
  return new Date().toISOString().split("T")[0];
};

// readable time (09:15:22 AM)
export const formatTime = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleTimeString();
};

// calculate hours between two ISO times
export const calculateHours = (start, end) => {
  if (!start || !end) return "0.00";
  const diff = new Date(end) - new Date(start);
  return (diff / (1000 * 60 * 60)).toFixed(2);
};

// current ISO time
export const nowISO = () => new Date().toISOString();

// current month number
export const currentMonth = () => new Date().getMonth();
