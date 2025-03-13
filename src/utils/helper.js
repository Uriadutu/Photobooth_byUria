export function parseAndFormatDateString(dateString) {
  const parsedDate = new Date(dateString);
  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = parsedDate.getDate().toString().padStart(2, "0");

  return `${day}-${month}-${year}`;
}

export function tanggalFormat(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Validasi format YYYY-MM-DD
  if (!regex.test(dateString)) {
    return "Format tanggal salah";
  }

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const parsedDate = new Date(dateString);

  if (isNaN(parsedDate.getTime())) {
    return "Tanggal tidak valid";
  }

  const year = parsedDate.getFullYear();
  const month = months[parsedDate.getMonth()];
  const day = parsedDate.getDate().toString().padStart(2, "0");

  return `${day} ${month} ${year}`;
}
