import { Flex, Input, Select, Typography } from "antd";
import { CiSearch } from "react-icons/ci";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import classNames from "classnames";
import { myThemeConfigs } from "../../../theme/antd-theme";
import { useCallback, useState } from "react";
import { useMyArticlesPage } from "./context/my-articles-page-context";
import { debounce } from "lodash";

const selectOptions = [
  {
    value: "All",
    label: "semua",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "Accepted",
    label: "diterima",
  },
  {
    value: "Rejected",
    label: "ditolak",
  },
  {
    value: "Latest",
    label: "terbaru",
  },
  {
    value: "Oldest",
    label: "terlama",
  },
];

const { Text } = Typography;
const ListMyArticleHeader = () => {
  const [inputValue, setInputValue] = useState("");
  const [filterValue, setFilterValue] = useState(selectOptions[0].value);
  const { dispatch } = useMyArticlesPage();
  const { screenWidth } = useDetectClientScreenWidth();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(
    debounce((value) => {
      if (value) {
        dispatch({ type: "RESET_FILTER_ALL_ARTICLE" });
        dispatch({ type: "SEARCH_ARTICLE", payload: value });
      } else {
        dispatch({ type: "RESET_FILTER_ALL_ARTICLE" });
      }
    }, 300),
    [dispatch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debounceFn(value);
  };

  const handleChange = (value) => {
    switch (value) {
      case "All":
        setFilterValue("All");
        dispatch({ type: "RESET_FILTER_ALL_ARTICLE" });
        break;
      case "pending":
        setFilterValue("Pending");
        dispatch({ type: "RESET_FILTER_ALL_ARTICLE" });
        dispatch({ type: "FILTER_PENDING_ARTICLE" });
        break;
      case "Accepted":
        setFilterValue("Accepted");
        dispatch({ type: "RESET_FILTER_ALL_ARTICLE" });
        dispatch({ type: "FILTER_ACCEPTED_ARTICLE" });
        break;
      case "Rejected":
        setFilterValue("Rejected");
        dispatch({ type: "RESET_FILTER_ALL_ARTICLE" });
        dispatch({ type: "FILTER_REJECTED_ARTICLE" });
        break;
      case "Latest":
        setFilterValue("Latest");
        dispatch({ type: "RESET_FILTER_ALL_ARTICLE" });
        dispatch({ type: "SORT_ARTICLES_BY_NEWEST" });
        break;
      case "Oldest":
        setFilterValue("Oldest");
        dispatch({ type: "RESET_FILTER_ALL_ARTICLE" });
        dispatch({ type: "SORT_ARTICLES_BY_OLDEST" });
        break;
    }
    setFilterValue(value);
  };

  return (
    <Flex gap={"middle"} align="center" justify={"space-between"} className="mb-5 w-full">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        prefix={<CiSearch />}
        type="text"
        placeholder="cari artikel"
        className={classNames(
          "bg-transparent  max-w-md   placeholder:capitalize placeholder:font-special-elite rounded-md outline-black  border-black"
        )}
        style={myThemeConfigs.buttonBorderList}
      />
      <Flex align="center" gap="middle">
        <Text
          className={classNames("font-roboto-slab", {
            "hidden ": screenWidth < 705,
          })}
        >
          Urutkan
        </Text>
        <Select
          onChange={handleChange}
          defaultValue={filterValue}
          options={selectOptions}
          style={myThemeConfigs.buttonBorderList}
          className="rounded-md capitalize w-[120px] font-roboto-slab"
          dropdownStyle={{ textTransform: "capitalize" }}
        />
      </Flex>
    </Flex>
  );
};

export default ListMyArticleHeader;
