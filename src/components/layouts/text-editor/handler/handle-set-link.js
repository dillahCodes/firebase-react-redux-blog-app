const handleSetLink = (editor) => {
  const isLinkActive = editor.isActive("link");

  if (!isLinkActive) {
    const messageAlert = prompt("Enter the link URL:");

    // Regular expression to validate URL
    const isValidUrl =
      messageAlert &&
      messageAlert.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi);

    isValidUrl ? editor.chain().focus().setLink({ href: messageAlert }).run() : alert("Invalid URL. Please enter a valid URL.");
  } else {
    // If link is already active, toggle (remove) the link
    editor.chain().focus().unsetLink().run();
  }
};

export default handleSetLink;
