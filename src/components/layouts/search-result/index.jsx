import ArticleResultMapper from "./article-result-mapper";
import PeopleResultMapper from "./people-result-mapper";
import TopicResultMapper from "./topic-result-mapper";
import PropTypes from "prop-types";

const ResultMapperComponent = ({ articleList, peopleList, articleTopics }) => {
  return (
    <>
      <ArticleResultMapper articleList={articleList} />
      <PeopleResultMapper peopleList={peopleList} />
      <TopicResultMapper topicList={articleTopics} />
    </>
  );
};

export default ResultMapperComponent;

ResultMapperComponent.propTypes = {
  articleList: PropTypes.array,
  peopleList: PropTypes.array,
  articleTopics: PropTypes.array,
};
