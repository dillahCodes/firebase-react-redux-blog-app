import MobileSearchLayout from "../../layouts/mobile-search-layout";
import { SearchPageMobileContextProvider } from "./context/search-page-mobile-context";
import SearchbarPageMobileComponent from "./searchbar-page-mobile-component";
import SearchPageMobileResult from "./searchbar-page-mobile-result";

const SearchPageMobileComponent = () => {
  return (
    <SearchPageMobileContextProvider>
      <MobileSearchLayout>
        <div className="w-full p-3">
          <SearchbarPageMobileComponent />
          <SearchPageMobileResult />
        </div>
      </MobileSearchLayout>
    </SearchPageMobileContextProvider>
  );
};

export default SearchPageMobileComponent;
