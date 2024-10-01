import { useDispatch, useSelector } from "react-redux";
import {
  hideHeader,
  hideSearchBarResult,
  resetAllSearchBarState,
  showHeader,
  showSearchBarResult,
  toggleHeader,
  toggleSearchBarResult,
} from "../store/slices/header-slice";
import { useEffect, useMemo } from "react";
import useDetectLocation from "./use-detect-location";
import useDetectClientScreenWidth from "./use-detect-client-screen-width";

const useHeader = ({ searchBarResultRef = null } = {}) => {
  const dispatch = useDispatch();

  // detect location and screen width hooks
  const { isAdminLocation, isAddArticleLocation, isMyArticlesLocation } = useDetectLocation();
  const { screenWidth } = useDetectClientScreenWidth();

  // header redux state
  const isHeaderShown = useSelector((state) => state.header.isHeaderShown);
  const isSearchBarResultShown = useSelector((state) => state.header.isSearchBarResultShown);
  const searchBarValue = useSelector((state) => state.header.searchBarValue);

  const isSearhcBarResultHide = useMemo(() => {
    return isAdminLocation || screenWidth <= 767 || isAddArticleLocation || isMyArticlesLocation;
  }, [isAddArticleLocation, isAdminLocation, isMyArticlesLocation, screenWidth]);

  const isValidSearchBarValue = useMemo(() => {
    return searchBarValue.trim() !== "" && searchBarValue.trim().length > 3;
  }, [searchBarValue]);

  // show search bar result
  useEffect(() => {
    isValidSearchBarValue ? dispatch(showSearchBarResult()) : dispatch(hideSearchBarResult()); // show search bar result if search bar value is valid
    isValidSearchBarValue && isHeaderShown ? dispatch(showSearchBarResult()) : dispatch(hideSearchBarResult()); // show search bar result if header is shown

    isSearhcBarResultHide && dispatch(hideSearchBarResult()); // hide search bar result in valid conditions
    !isHeaderShown && dispatch(hideSearchBarResult()); // hide search bar result if header is not shown
  }, [dispatch, isValidSearchBarValue, isHeaderShown, isSearhcBarResultHide]);

  // handleClickOutside for search bar result
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isUserIsClickOutside = !searchBarResultRef.contains(e.target);
      isUserIsClickOutside && dispatch(resetAllSearchBarState());
    };

    if (!searchBarResultRef) return;

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [searchBarResultRef, dispatch]);

  return {
    // header state values
    isHeaderShown,
    isSearchBarResultShown,
    searchBarValue,

    // header search bar actions
    showSearchBarResult: () => dispatch(showSearchBarResult()),
    hideSearchBarResult: () => dispatch(hideSearchBarResult()),
    toggleSearchBarResult: () => dispatch(toggleSearchBarResult()),

    // header actions
    showHeader: () => dispatch(showHeader()),
    hideHeader: () => dispatch(hideHeader()),
    toggleHeader: () => dispatch(toggleHeader()),
  };
};

export default useHeader;
