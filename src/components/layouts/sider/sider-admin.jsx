import { ConfigProvider } from "antd";
import useHeader from "../../../hooks/use-header";
import classNames from "classnames";
import SiderAdminMenu from "./sider-admin-menu";

const SiderAdmin = () => {
  const { isHeaderShown } = useHeader();

  return (
    <ConfigProvider wave={false}>
      <aside
        style={{
          boxShadow: "5px 5px 0px -3px rgba(0,0,0,1)",
        }}
        className={classNames(
          "border-2 min-w-[300px]  sticky top-0 border-black border-t-0 p-3 rounded-br-md transition-all duration-300 ",
          {
            "top-16": isHeaderShown,
          }
        )}
      >
        <SiderAdminMenu />
      </aside>
    </ConfigProvider>
  );
};

export default SiderAdmin;
