// helper function that formats time strings
export function formatDate(string, cleaner = false) {
  let format = new Date(string).toLocaleString();

  // mm/dd/year
  let date = format.split(", ")[0];
  if (cleaner) {
    date = new Date(date).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }
  // AM or PM
  let timeFormat = format.split(", ")[1].split(" ")[1];
  // xx:xx
  let time = format
    .split(", ")[1]
    .split(" ")[0]
    .split(":")
    .slice(0, -1)
    .join(":");
  return `${date}, ${time} ${timeFormat}`;
}

export function getDay(string) {
}

// changes aaaa-aaaa to Aaaa Aaaa
export function cleanName(string) {
  let str = string.split("-");
  str.forEach((string, i) => {
    str[i] = string.charAt(0).toUpperCase() + string.slice(1);
    if (string === "mcmahon" || string == "mccarty") {
      str[i] = str[i].slice(0, 2) + str[i].charAt(2).toUpperCase() + str[i].slice(3);
    }
  });
  return str.join(" ");
}

