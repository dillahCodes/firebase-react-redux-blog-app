import { useMemo } from "react";
import useSearchArticle from "../../../features/search/hooks/use-search-article";
import useSearchArticleTopics from "../../../features/search/hooks/use-search-article-topics";
import useSearchUser from "../../../features/search/hooks/use-search-user";
import ResultMapperComponent from "../../layouts/search-result";
import { useSearchPageMobile } from "./context/search-page-mobile-context";
import { Layout, Spin, Typography } from "antd";
import emptyIlustration from "../../../assets/Empty-amico.svg";
import PropTypes from "prop-types";

const { Text } = Typography;
const SearchPageMobileResult = () => {
  const { state } = useSearchPageMobile();
  const searchBarValue = state?.searchInputValue || "";

  // Fetching data hooks
  const { articleList, isLoading: isLoadingArticles } = useSearchArticle({ searchKeyword: searchBarValue });
  const { peopleList, isLoading: isLoadingPeople } = useSearchUser({ searchKeyword: searchBarValue });
  const { articleTopics, isLoading: isLoadingTopics } = useSearchArticleTopics({ searchKeyword: searchBarValue });

  //   loading
  const isLoading = useMemo(
    () => isLoadingArticles || isLoadingPeople || isLoadingTopics,
    [isLoadingArticles, isLoadingPeople, isLoadingTopics]
  );

  const isValidDataFetched = useMemo(
    () => articleList.length > 0 || peopleList.length > 0 || articleTopics.length > 0,
    [articleList, peopleList, articleTopics]
  );

  return (
    <Layout className="h-full flex mt-5">
      {isValidDataFetched && (
        <ResultMapperComponent articleList={articleList} peopleList={peopleList} articleTopics={articleTopics} />
      )}

      {!isValidDataFetched && !isLoading && (
        <EmptyComponent
          textInfo={
            !searchBarValue || searchBarValue.trim().length <= 3 ? "Masukkan kata kunci untuk mencari🔍" : "Tidak ditemukan🙅"
          }
        />
      )}

      {isLoading && (
        <Layout className="flex justify-center items-center">
          <Spin />
        </Layout>
      )}
    </Layout>
  );
};

export default SearchPageMobileResult;

const EmptyComponent = ({ textInfo }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img src={emptyIlustration} alt="empty illustration" className="max-w-32" />
      <Text className="text-sm font-roboto-slab text-center line-clamp-1">{textInfo}</Text>
      <Text className="text-xs font-roboto-slab text-center">
        &copy; svg by{" "}
        <a className="font-bold underline" href="https://storyset.com/people">
          storyset
        </a>
      </Text>
    </div>
  );
};

EmptyComponent.propTypes = {
  textInfo: PropTypes.string,
};
