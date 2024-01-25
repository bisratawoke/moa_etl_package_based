export function timeInfo(date: string) {
  return {
    year: new Date(date).getFullYear(),
    text_date: String(new Date(date).getFullYear()),
    month: monthToText(new Date(date).getMonth()),
    day: new Date(date).getDate(),
    quarter: getQuarter(new Date(date).getMonth()),
  };
}

export function getQuarter(month: number) {
  if (month < 1 || month > 12 || isNaN(month)) {
    return "Invalid month. Please enter a number between 1 and 12.";
  }

  const quarters = {
    1: "First",
    2: "First",
    3: "First",
    4: "Second",
    5: "Second",
    6: "Second",
    7: "Third",
    8: "Third",
    9: "Third",
    10: "Fourth",
    11: "Fourth",
    12: "Fourth",
  };

  return quarters[month];
}

export function monthToText(month: number) {
  if (month < 1 || month > 12 || isNaN(month)) {
    return "Invalid month. Please enter a number between 1 and 12.";
  }

  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  return months[month];
}
