export default function dateFormatter(inputDate) {
  const date = new Date(inputDate);
  const formattedDate = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  return formattedDate
}
