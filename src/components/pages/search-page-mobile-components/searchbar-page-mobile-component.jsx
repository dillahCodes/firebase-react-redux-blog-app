import { useEffect, useState } from "react";
import SearchBarInput from "../../layouts/searchbar/searchbar-input";
import { useSearchPageMobile } from "./context/search-page-mobile-context";
import { debounce } from "lodash";

const SearchbarPageMobileComponent = () => {
  const { dispatch } = useSearchPageMobile();
  const [localSearchBarValue, setLocalSearchBarValue] = useState("");

  const debounceFn = debounce((value) => dispatch({ type: "SET_SEARCH_INPUT_VALUE", payload: value }), 300);

  useEffect(() => {
    debounceFn(localSearchBarValue.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearchBarValue]);

  return (
    <SearchBarInput
      sizeInput="middle"
      searchBarInputValue={localSearchBarValue}
      handleChange={(e) => setLocalSearchBarValue(e.target.value)}
    />
  );
};

export default SearchbarPageMobileComponent;
