import classNames from "classnames";
import useDetectLocation from "../../../hooks/use-detect-location";
import useHeader from "../../../hooks/use-header";
import { myThemeConfigs } from "../../../theme/antd-theme";
import NavbarHeaderMenuList from "../navbar/navbar-header-menu-list";
import HeaderSearchResult from "./header-search-result";
import HeaderTitle from "./header-title";

const PageHeader = () => {
  const { isSearchBarResultShown } = useHeader();
  const { isAdminLocation } = useDetectLocation();

  return (
    <header
      className={classNames(
        "flex items-center relative min-w-[320px] px-4   min-h-16 max-h-16 box-border justify-between    transition-all duration-300  border-b-2  border-black"
      )}
      style={{ backgroundColor: myThemeConfigs.components.Layout.headerBg }}
    >
      <div
        className={classNames("w-full  relative ", {
          " max-w-screen-xl mx-auto": !isAdminLocation,
        })}
      >
        <div className={classNames("flex items-center justify-between w-full mx-auto py-3")}>
          <HeaderTitle />
          <NavbarHeaderMenuList />
        </div>

        {/* header search result */}
        {isSearchBarResultShown && <HeaderSearchResult />}
      </div>
    </header>
  );
};

export default PageHeader;
