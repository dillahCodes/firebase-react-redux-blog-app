const formatNumber = (number) => {
  // Format angka dengan singkatan untuk ribuan, jutaan, miliar, dll.
  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B"; // Format miliaran (B)
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + "M"; // Format jutaan (M)
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1) + "k"; // Format ribuan (k)
  } else {
    return number.toString(); // Format angka di bawah 1000
  }
};

export default formatNumber;
