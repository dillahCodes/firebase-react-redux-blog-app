import { Typography } from "antd";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import useDetectLocation from "../../../hooks/use-detect-location";
import SearchBarInput from "../searchbar/searchbar-input";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import { useDispatch } from "react-redux";
import { setSearchBarValue } from "../../../store/slices/header-slice";
import { useState } from "react";
import { debounce } from "lodash";

const { Title } = Typography;
const HeaderTitle = () => {
  const dispatch = useDispatch();
  const { isAdminLocation, isAddArticleLocation, isMyArticlesLocation } = useDetectLocation();

  const { screenWidth } = useDetectClientScreenWidth();
  const isSearchBarHidden = isAdminLocation || screenWidth <= 767 || isAddArticleLocation || isMyArticlesLocation;

  const navigate = useNavigate();
  const [searchBarValueInternal, setSearchBarValueInternal] = useState("");

  const debounceFn = debounce((value) => dispatch(setSearchBarValue(value)), 500);
  const handleChangeInputSearch = (e) => {
    setSearchBarValueInternal(e.target.value);
    debounceFn(e.target.value);
  };

  return (
    <section className="flex items-center gap-x-5 min-w-fit">
      {/* logo and title */}
      <Title
        onClick={() => navigate("/")}
        level={3}
        className={classNames("font-special-elite min-w-fit flex items-center gap-x-2", {
          "flex items-center": isAdminLocation,
        })}
      >
        <img src="/mathca-icon.png" alt="matcha icon" className="block" width={30} />
        <p className="items-end my-auto min-w-fit">matcha.Codes</p>
        {isAdminLocation && <p className="text-[#f9a825] font-roboto-slab  max-md:hidden text-base m-0 capitalize"> (admin)</p>}
      </Title>

      {/* search bar */}
      <div
        className={classNames({
          "hidden ": isSearchBarHidden,
        })}
      >
        {!isSearchBarHidden && (
          <SearchBarInput
            handleChange={handleChangeInputSearch}
            searchBarInputValue={searchBarValueInternal}
            sizeInput="middle"
          />
        )}
      </div>
    </section>
  );
};

export default HeaderTitle;
