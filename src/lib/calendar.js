export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const weekNamesShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const isSameMonth = (a: Date, b: Date) => {
  if (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth()
  ) {
    return true;
  }

  return false;
};

export const isSameDay = (a: Date, b: Date) => {
  if (
    isSameMonth(a, b) &&
    a.getDate() === b.getDate()
  ) {
    return true;
  }

  return false;
};
