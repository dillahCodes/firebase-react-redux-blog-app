const handleSetVideo = (editor) => {
  const urlInput = prompt("Enter the link URL:");
  urlInput && editor.chain().focus().setVideo({ url: urlInput }).run();
};

export default handleSetVideo;
