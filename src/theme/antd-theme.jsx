import { HappyProvider } from "@ant-design/happy-work-theme";
import { ConfigProvider } from "antd";
import PropTypes from "prop-types";

export const myThemeConfigs = {
  token: {
    colorPrimary: "#b8e986",
    colorText: "#58942e",
    colorLinkHover: "#dcfab6",
    colorLink: "#58942e",
  },
  components: {
    // https://ant.design/components/button#design-token <== Documentation

    Button: {
      defaultColor: "#58942e",
      primaryColor: "#58942e",
      colorPrimaryHover: "#58942e",
    },
    Input: {},
    Layout: {
      headerBg: "#b8e986",
      headerHeight: 60,
      bodyBg: "#fafff0",
      siderBg: "#fafff0",
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Menu: {
      itemBg: "#fafff0",
      itemActiveBg: "#fafff0",
      itemSelectedBg: "#fafff0",
    },
    Table: {
      borderColor: "#fafff0",
      headerBg: "#58942e",
      headerColor: "#fafff0",
    },
  },

  // my custom theme
  buttonBorderList: {
    boxShadow: "3px 3px 0px 0px rgba(0, 0, 0, 1)",
  },

  siderBorderStyle: {
    boxShadow: "4px 4px 0px 0px rgba(0, 0, 0, 1)",
  },
};

const AntdTheme = ({ children }) => {
  return (
    <HappyProvider>
      <ConfigProvider theme={myThemeConfigs}>{children}</ConfigProvider>
    </HappyProvider>
  );
};

export default AntdTheme;

AntdTheme.propTypes = {
  children: PropTypes.node.isRequired,
};
