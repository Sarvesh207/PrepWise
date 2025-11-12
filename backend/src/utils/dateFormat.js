function parseDate(dateString) {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/");
  if (!day || !month || !year) return null;

  const date = new Date(`${year}-${month}-${day}`);
  return isNaN(date.getTime()) ? null : date; // Return null if invalid
}

module.exports = { parseDate };
