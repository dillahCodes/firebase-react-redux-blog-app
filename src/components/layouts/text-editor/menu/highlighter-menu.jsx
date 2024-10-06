import { LuHighlighter } from "react-icons/lu";
import ButtonComponent from "../../../ui/button-component";
import PropTypes from "prop-types";
import { Flex, Tooltip, Typography } from "antd";
import { memo, useState } from "react";

const highlightColors = [
  {
    nameColor: "Bright Yellow",
    color: "#FFEB3B", // Bright Yellow
  },
  {
    nameColor: "Bright Cyan",
    color: "#00E5FF", // Bright Cyan
  },
  {
    nameColor: "Hot Pink",
    color: "#FF69B4", // Hot Pink
  },
  {
    nameColor: "Bright Orange",
    color: "#FF8C00", // Bright Orange
  },
  {
    nameColor: "Bright Turquoise",
    color: "#40E0D0", // Bright Turquoise
  },
  {
    nameColor: "Vivid Purple",
    color: "#EE82EE", // Vivid Purple
  },
  {
    nameColor: "Bright Coral",
    color: "#FF7F50", // Bright Coral
  },
  {
    nameColor: "Bright Magenta",
    color: "#FF00FF", // Bright Magenta
  },
  {
    nameColor: "bright Red",
    color: "#EE4B2B", // bright Red
  },
];

const { Text } = Typography;
const ColorTemplate = ({ editor, setColor }) => {
  return (
    <Flex className="w-full" wrap align="center" gap={"small"}>
      {highlightColors.map((color, index) => (
        <div
          className="w-[30px] h-[30px] cursor-pointer flex-[30px]"
          key={index}
          style={{ backgroundColor: color.color }}
          onClick={() => {
            setColor(color.color);
            editor.chain().focus().setHighlight({ color: color.color }).run();
          }}
        />
      ))}
    </Flex>
  );
};

ColorTemplate.propTypes = {
  editor: PropTypes.object,
  setColor: PropTypes.func,
};

const HighlighterMenu = memo(({ editor }) => {
  const [color, setColor] = useState("#ff0000");

  return (
    <Tooltip
      trigger="click"
      title={
        <Flex vertical className="w-[120px] rounded-sm p-1  bg-[#58942e]">
          <ColorTemplate setColor={setColor} editor={editor} />

          <Flex
            className="my-2 cursor-pointer"
            gap="small"
            onClick={() => {
              editor.chain().focus().unsetHighlight().run();
              setColor("#f1f5f9");
            }}
          >
            <div className="w-[20px] h-[20px] bg-slate-100" />
            <Text className="text-white text-xs underline">No</Text>
            <Text className="text-white text-xs">Color</Text>
          </Flex>
        </Flex>
      }
    >
      <>
        <ButtonComponent
          key="highlighter"
          icon={
            <Flex vertical>
              <LuHighlighter />
              <div className={`w-full h-[3px] rounded-sm`} style={{ backgroundColor: color }} />
            </Flex>
          }
          type="primary"
        />
      </>
    </Tooltip>
  );
});

export default HighlighterMenu;

HighlighterMenu.displayName = "HighlighterMenu";

HighlighterMenu.propTypes = {
  editor: PropTypes.object,
};
