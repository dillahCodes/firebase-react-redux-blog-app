import { LuLink } from "react-icons/lu";
import { ButtonComponentWithTooltip } from "../../../ui/button-component";
import PropTypes from "prop-types";

const LinkMenu = ({ editor }) => {
  return (
    <ButtonComponentWithTooltip
      key="link"
      type="primary"
      tooltipText="Insert Link"
      icon={<LuLink />}
      onClick={() => {
        const isLinkActive = editor.isActive("link");

        if (!isLinkActive) {
          const messageAlert = prompt("Enter the link URL:");

          // Regular expression to validate URL
          const isValidUrl =
            messageAlert &&
            messageAlert.match(
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi
            );

          isValidUrl
            ? editor.chain().focus().setLink({ href: messageAlert }).run()
            : alert("Invalid URL. Please enter a valid URL.");
        } else {
          // If link is already active, toggle (remove) the link
          editor.chain().focus().unsetLink().run();
        }
      }}
      className={editor.isActive("link") ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
    />
  );
};

export default LinkMenu;

LinkMenu.propTypes = {
  editor: PropTypes.object.isRequired,
};
