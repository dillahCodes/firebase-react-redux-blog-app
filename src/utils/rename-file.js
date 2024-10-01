// rename file function
const renameFile = (originalFile, newName) => {
  const newFile = new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
  return newFile;
};

export default renameFile;
