import { Input } from "antd";
import { CiSearch } from "react-icons/ci";
import classNames from "classnames";
import { myThemeConfigs } from "../../../theme/antd-theme";
import PropTypes from "prop-types";

const SearchBarInput = ({ handleChange, searchBarInputValue, sizeInput = "small" }) => {
  return (
    <Input
      value={searchBarInputValue}
      prefix={<CiSearch />}
      type="text"
      size={sizeInput}
      placeholder="cari artikel"
      className={classNames(
        "bg-transparent placeholder:capitalize  placeholder:font-special-elite rounded-full outline-black  border-black"
      )}
      onChange={handleChange}
      style={myThemeConfigs.buttonBorderList}
    />
  );
};

export default SearchBarInput;

SearchBarInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchBarInputValue: PropTypes.string.isRequired,
  sizeInput: PropTypes.string,
};
