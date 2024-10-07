import { Flex, Select } from "antd";

import PropTypes from "prop-types";
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuImage,
  LuItalic,
  LuLink,
  LuRedo,
  LuStrikethrough,
  LuSubscript,
  LuSuperscript,
  LuUnderline,
  LuUndo,
  LuVideo,
} from "react-icons/lu";
import useUser from "../../../../features/auth/hooks/use-user";
import { myThemeConfigs } from "../../../../theme/antd-theme";
import withTooltip from "../../../hoc/with-tooltip";
import { ButtonComponentWithTooltip } from "../../../ui/button-component";
import handleSetLink from "../handler/handle-set-link";
import handleSetVideo from "../handler/handle-set-video";
import handleUploadImage from "../handler/handle-upload-image";
import HighlighterMenu from "./highlighter-menu";

const SelectWithTooltip = withTooltip(Select);
const TextEditorMenuComponent = ({ editor, articleId }) => {
  const { user } = useUser();
  const isUndoDisabled = !editor?.can().undo();
  const isRedoDisabled = !editor?.can().redo();

  // Font Family
  const fontFamilyOptions = [
    { label: "Special Elite", value: "special-elite", className: "font-special-elite" },
    { label: "Roboto Slab", value: "roboto-slab", className: "font-roboto-slab" },
    { label: "Clear Font Family", value: "", className: "" },
  ];
  const activeFontFamily = fontFamilyOptions.find((option) => editor.isActive("fontFamily", { fontFamily: option.value }));

  const fontSizeOptions = [
    { label: "Small", value: "small", className: "text-sm" },
    { label: "Medium", value: "medium", className: "text-base" },
    { label: "Large", value: "large", className: "text-lg" },
    { label: "Extra Large", value: "extra-large", className: "text-xl" },
    { label: "Clear Font Size", value: "", className: "text-sm" },
  ];
  const activeFontSize = fontSizeOptions.find((option) => editor.isActive("fontSize", { size: option.value }));

  return (
    <Flex
      id="text-editor-floating-menu"
      gap="small"
      wrap
      align="center"
      className="bg-[#dcfab6] p-2 border border-black rounded-md"
      style={myThemeConfigs.siderBorderStyle}
    >
      {/* Undo Button */}
      <ButtonComponentWithTooltip
        tooltipText="Undo"
        key="undo"
        icon={<LuUndo />}
        type={isUndoDisabled ? "default" : "primary"}
        disabled={isUndoDisabled}
        onClick={() => editor.chain().focus().undo().run()}
        className="text-sm"
      />
      {/* Redo Button */}
      <ButtonComponentWithTooltip
        key="redo"
        tooltipText={"Redo"}
        icon={<LuRedo />}
        type={isRedoDisabled ? "default" : "primary"}
        disabled={isRedoDisabled}
        onClick={() => editor.chain().focus().redo().run()}
        className="text-sm"
      />

      {/* Heading 1 - 5 Buttons */}
      <ButtonComponentWithTooltip
        tooltipText="Heading 1"
        key="heading1"
        icon={<LuHeading1 />}
        type="primary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />
      <ButtonComponentWithTooltip
        key="heading2"
        tooltipText="Heading 2"
        icon={<LuHeading2 />}
        type="primary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />
      <ButtonComponentWithTooltip
        key="heading3"
        tooltipText="Heading 3"
        icon={<LuHeading3 />}
        type="primary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />
      <ButtonComponentWithTooltip
        key="heading4"
        tooltipText="Heading 4"
        icon={<LuHeading4 />}
        type="primary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />
      <ButtonComponentWithTooltip
        key="heading5"
        tooltipText="Heading 5"
        icon={<LuHeading5 />}
        type="primary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />

      {/* Alignment Buttons */}
      <ButtonComponentWithTooltip
        key="align-left"
        tooltipText="Align Left"
        icon={<LuAlignLeft />}
        type="primary"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className="text-sm"
      />
      <ButtonComponentWithTooltip
        key="align-center"
        tooltipText="Align Center"
        icon={<LuAlignCenter />}
        type="primary"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className="text-sm"
      />
      <ButtonComponentWithTooltip
        key="align-right"
        icon={<LuAlignRight />}
        type="primary"
        tooltipText="Align Right"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className="text-sm"
      />
      <ButtonComponentWithTooltip
        key="align-justify"
        tooltipText="Align Justify"
        icon={<LuAlignJustify />}
        type="primary"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className="text-sm"
      />

      {/* video */}
      <ButtonComponentWithTooltip
        key="video"
        tooltipText="insert video"
        icon={<LuVideo />}
        type="primary"
        onClick={() => handleSetVideo(editor)}
      />

      {/* image menu */}
      <ButtonComponentWithTooltip
        key="image"
        icon={<LuImage />}
        type="primary"
        tooltipText="Insert Image"
        onClick={() => {
          handleUploadImage({ userId: user.uid, articleId }).then((res) => {
            if (res.success)
              editor.chain().focus().setImage({ src: res.imageUrl, alt: res.oldFileName, id: res.newImageID }).run();
          });
        }}
        className="text-sm"
      />

      {/* link menu */}
      <ButtonComponentWithTooltip
        key="link"
        type="primary"
        tooltipText="Insert Link"
        icon={<LuLink />}
        onClick={() => handleSetLink(editor)}
        className={editor.isActive("link") ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />

      {/* code menu */}
      <ButtonComponentWithTooltip
        key="code"
        type="primary"
        tooltipText="embed code"
        icon={<LuCode />}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        // onClick={() => handleSetLink(editor)}
        className={editor.isActive("codeBlock") ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />

      {/* highlight */}
      <HighlighterMenu editor={editor} />

      {/* italic */}
      <ButtonComponentWithTooltip
        key="italic"
        tooltipText="Italic"
        icon={<LuItalic />}
        type="primary"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />

      {/* strike */}
      <ButtonComponentWithTooltip
        key="strike"
        tooltipText="strike"
        icon={<LuStrikethrough />}
        type="primary"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />

      {/* underline */}
      <ButtonComponentWithTooltip
        key="underline"
        tooltipText="underline"
        icon={<LuUnderline />}
        type="primary"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />

      {/* Bold */}
      <ButtonComponentWithTooltip
        key="Bold"
        tooltipText="Bold"
        icon={<LuBold />}
        type="primary"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />

      {/* subscript */}
      <ButtonComponentWithTooltip
        key="subsscript"
        tooltipText="subsscript"
        icon={<LuSubscript />}
        type="primary"
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={editor.isActive("subscript") ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />

      {/* superscript */}
      <ButtonComponentWithTooltip
        key="superscript"
        tooltipText="superscript"
        icon={<LuSuperscript />}
        type="primary"
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={editor.isActive("superscript") ? "is-active bg-[#58942e] text-slate-100" : "text-sm"}
      />

      {/* font menu */}
      <SelectWithTooltip
        tooltipText={"Font Family"}
        placeholder="Font Family"
        className="font-roboto-slab capitalize rounded-md text-sm max-w-32 w-full"
        optionFilterProp="label"
        style={myThemeConfigs.siderBorderStyle}
        value={activeFontFamily ? activeFontFamily.value : "Font Family"}
        onChange={(value) => {
          if (!value) editor.chain().focus().unsetFontFamily().run();
          else editor.chain().focus().setFontFamily(value).run();
        }}
        options={fontFamilyOptions}
        popupClassName="font-roboto-slab w-fit"
      />

      {/* font size menu */}
      <SelectWithTooltip
        tooltipText={"Font Size"}
        placeholder="Font Size"
        className="font-roboto-slab capitalize rounded-md text-sm max-w-32 w-full"
        optionFilterProp="label"
        style={myThemeConfigs.siderBorderStyle}
        value={activeFontSize ? activeFontSize.value : "Font Size"}
        onChange={(value) => {
          if (!value) editor.chain().focus().unsetFontSize().run();
          else editor.chain().focus().setFontSize(value).run();
        }}
        options={fontSizeOptions}
        popupClassName="font-roboto-slab w-fit"
      />
    </Flex>
  );
};

export default TextEditorMenuComponent;
TextEditorMenuComponent.propTypes = {
  editor: PropTypes.object.isRequired,
  articleId: PropTypes.string.isRequired,
};
