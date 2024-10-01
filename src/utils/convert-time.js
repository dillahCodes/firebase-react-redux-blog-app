const formatEpochToIndonesianDate = (epochTime) => {
  if (!epochTime) return;

  const date = new Date(epochTime * 1000); // Convert epoch time to milliseconds

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
  }).format(date);

  return formattedDate;
};

export default formatEpochToIndonesianDate;
