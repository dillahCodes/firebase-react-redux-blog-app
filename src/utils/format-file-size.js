function formatFileSize(bytes) {
  const MB = 1024 * 1024;
  const GB = 1024 * MB;

  if (bytes >= GB) {
    return (bytes / GB).toFixed(2) + " GB";
  } else if (bytes >= MB) {
    return (bytes / MB).toFixed(2) + " MB";
  } else {
    return bytes + " bytes";
  }
}

export default formatFileSize;
