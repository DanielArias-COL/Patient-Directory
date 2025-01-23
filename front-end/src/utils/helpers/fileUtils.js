export const convertToISO = (date) => {
  if (!date) return "";

  const ddMmYyyyPattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (ddMmYyyyPattern.test(date)) {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    console.error(`Fecha no válida: ${date}`);
    return "";
  }

  return parsedDate.toISOString().split("T")[0];
};

export const convertFromISO = (isoDate) => {
  if (!isoDate) return "";

  const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (isoDatePattern.test(isoDate)) {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  }

  return isoDate;
};
