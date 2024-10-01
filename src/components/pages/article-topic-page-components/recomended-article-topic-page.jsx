import { Flex, Layout, Typography } from "antd";
import ArticleCardTopic from "../../layouts/article-card-topic";
import useGetArticleByTopic from "../../../features/get-article/hooks/use-get-article-by-topic";
import { useNavigate, useParams } from "react-router-dom";
import LoaderCardTopic from "../../layouts/article-card-topic/loader-card-topic";
import useGetArticleByTopicWithInfiniteScroll from "../../../features/get-article/hooks/use-get-article-by-topic-with-infinite-scroll";
import ArticleCard from "../../layouts/article-card";
import classNames from "classnames";
import isArrayOddOrEven from "../../../utils/is-array-odd-or-even";
import withAuthBlur from "../../hoc/with-auth-blur";
import PropTypes from "prop-types";

const { Text } = Typography;
const RecomendedArticleTopicPage = () => {
  const navigate = useNavigate();
  const { topik } = useParams();
  const { articleData, isLoading } = useGetArticleByTopic({ topicName: topik, fetchLimit: 2 });
  const { articleData: articleData2, isLastArticle } = useGetArticleByTopicWithInfiniteScroll({
    topicName: topik,
    fetchLimit: 2,
  });
  const checkOddEven = isArrayOddOrEven(articleData2);

  return (
    <Layout className="border-t border-b p-3 py-7">
      <Text className="capitalize font-roboto-slab text-base sm:text-lg font-bold mb-7">Rekomendasi artikel</Text>
      <Flex gap="small" wrap>
        {isLoading
          ? Array.from({ length: 2 }).map((_, index) => <LoaderCardTopic key={index} />) // skeleton loader
          : articleData?.map((article) => (
              // map data
              <ArticleCardTopic
                key={article.doc_id}
                articleImage={article.mainImage}
                articleTitle={article.title}
                ownerUserName={article.author_name}
                ownerPhotoUrl={article.articleOwnerPhotoURL}
                articleDocId={article.doc_id}
                timeStamp={article.updatedAt.seconds}
                likeCount={article.article_like}
                commentCount={article.article_comment}
                articleDataLength={articleData?.length}
              />
            ))}
      </Flex>

      <Flex gap="middle" wrap className="mt-5">
        {articleData2?.map((article, index) => (
          <div
            key={index}
            className={classNames({
              "sm:flex-[1_45%] w-full": !(index === articleData2?.length - 1 && checkOddEven === "odd"),
              "sm:w-1/2 w-full pr-1": index === articleData2?.length - 1 && checkOddEven === "odd",
            })}
          >
            <ArticleCard
              isLastItem
              goToDetailArticle={() => navigate(`/detail-artikel/${article.doc_id}`)}
              articleLike={article.article_like}
              articleViewers={article.article_view}
              articleComment={article.article_comment}
              readingTime={article.content}
              title={article.title}
              mainImage={article.mainImage}
              dateEpoch={article.updatedAt.seconds}
              ownerName={article.author_name}
              ownerProfile={article.articleOwnerPhotoURL}
            />
          </div>
        ))}
        {!isLastArticle &&
          Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className={classNames({
                "sm:flex-[1_45%] w-full": !(index === articleData2?.length - 1 && checkOddEven === "odd"),
                "sm:w-1/2 w-full pr-1": index === articleData2?.length - 1 && checkOddEven === "odd",
              })}
            >
              <LoaderCardWithAuthBlur
                index={index}
                textButton="masuk untuk melihat lebih"
                checkOddEven={checkOddEven}
                articleData2={articleData2}
              />
            </div>
          ))}
      </Flex>
    </Layout>
  );
};

export default RecomendedArticleTopicPage;

const LoaderCard = ({ index, checkOddEven, articleData2, ...props }) => {
  return (
    <div
      {...props}
      className={classNames({
        "sm:flex-[1_45%] w-full": !(index === articleData2?.length - 1 && checkOddEven === "odd"),
        "sm:w-1/2 w-full pr-1": index === articleData2?.length - 1 && checkOddEven === "odd",
      })}
    >
      <ArticleCard isLoading />
    </div>
  );
};
const LoaderCardWithAuthBlur = withAuthBlur(LoaderCard);

LoaderCard.propTypes = {
  index: PropTypes.number,
  checkOddEven: PropTypes.string,
  articleData2: PropTypes.array,
};
