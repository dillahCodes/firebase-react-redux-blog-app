import { myThemeConfigs } from "../../../theme/antd-theme";
import useHeader from "../../../hooks/use-header";
import classNames from "classnames";
import { Flex, Spin, Typography } from "antd";
import emptyIlustration from "../../../assets/Empty-amico.svg";
import { useMemo, useRef } from "react";
import useSearchArticle from "../../../features/search/hooks/use-search-article";
import useSearchArticleTopics from "../../../features/search/hooks/use-search-article-topics";
import PropTypes from "prop-types";
import useUser from "../../../features/auth/hooks/use-user";
import withAuthBlur from "../../hoc/with-auth-blur";
import ResultMapperComponent from "../search-result";
import { IoLogInOutline } from "react-icons/io5";
import useSearchUser from "../../../features/search/hooks/use-search-user";

const { Text } = Typography;
const HeaderSearchResult = () => {
  const { user } = useUser();
  const elementRef = useRef(null);
  const { isSearchBarResultShown, searchBarValue } = useHeader({ searchBarResultRef: elementRef.current });

  // Fetching data hooks
  const { articleList, isLoading: isLoadingArticles } = useSearchArticle({ searchKeyword: searchBarValue });
  const { peopleList, isLoading: isLoadingPeople } = useSearchUser({ searchKeyword: searchBarValue });
  const { articleTopics, isLoading: isLoadingTopics } = useSearchArticleTopics({ searchKeyword: searchBarValue });

  // Memoized computed states
  const isComponentLoading = useMemo(
    () => (isLoadingArticles || isLoadingPeople || isLoadingTopics) && user,
    [isLoadingArticles, isLoadingPeople, isLoadingTopics, user]
  );

  const isComponentEmpty = useMemo(
    () => !articleList.length && !peopleList.length && !articleTopics.length && user,
    [articleList, peopleList, articleTopics, user]
  );

  const isValidDataFetched = useMemo(
    () => articleList.length > 0 || peopleList.length > 0 || articleTopics.length > 0,
    [articleList, peopleList, articleTopics]
  );

  // Render logic for logged-in users
  const renderLoggedInUserContent = () => {
    if (isComponentLoading) return <LoadingComponent />;
    if (isValidDataFetched)
      return <ResultMapperComponent articleList={articleList} peopleList={peopleList} articleTopics={articleTopics} />;
    if (isComponentEmpty) return <EmptyComponent />;
  };

  // Render logic for guests (not logged-in users)
  const renderGuestUserContent = () => {
    if (!user)
      return <EmptyComponentWithAuthBlur textButton="Masuk untuk mencari" iconButton={<IoLogInOutline className="text-lg" />} />;
  };

  return (
    <HeaderSearchResultWrapper elementRef={elementRef} isSearchBarResultShown={isSearchBarResultShown}>
      {renderGuestUserContent()}
      {renderLoggedInUserContent()}
    </HeaderSearchResultWrapper>
  );
};

export default HeaderSearchResult;

const HeaderSearchResultWrapper = ({ children, elementRef, isSearchBarResultShown }) => {
  return (
    <div
      ref={elementRef}
      id="search-result-container"
      className={classNames(
        "w-full max-w-screen-sm h-56 p-3 scrollbar-custom absolute left-1/2 overflow-y-auto -translate-x-1/2 bg-[#fafff0] rounded-md border-t border-l border-black",
        {
          hidden: !isSearchBarResultShown,
        }
      )}
      style={myThemeConfigs.siderBorderStyle}
    >
      {children}
    </div>
  );
};

HeaderSearchResultWrapper.propTypes = {
  children: PropTypes.node,
  elementRef: PropTypes.any,
  isSearchBarResultShown: PropTypes.bool,
};

const LoadingComponent = () => (
  <Flex className="w-full h-full" align="center" justify="center">
    <Spin />
  </Flex>
);

const EmptyComponent = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img src={emptyIlustration} alt="empty illustration" className="max-w-32" />
      <Text className="text-sm font-roboto-slab">Tidak Ditemukan</Text>
      <Text className="text-xs font-roboto-slab text-center">
        &copy; svg by{" "}
        <a className="font-bold underline" href="https://storyset.com/people">
          storyset
        </a>
      </Text>
    </div>
  );
};

const EmptyComponentWithAuthBlur = withAuthBlur(EmptyComponent);
