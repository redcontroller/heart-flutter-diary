export default function formatDate(timestamp) {
  const dt = new Date(timestamp);
  const year = dt.getFullYear();
  const month = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = daysOfWeek[dt.getDay()];
  const formattedDate = `${year}.${month}.${day} ${dayOfWeek}`;

  return formattedDate;
}
