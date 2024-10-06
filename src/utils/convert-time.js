const formatEpochToIndonesianDate = (epochTime) => {
  if (!epochTime) return;

  const date = new Date(epochTime * 1000);

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formattedDate;
};

export default formatEpochToIndonesianDate;
