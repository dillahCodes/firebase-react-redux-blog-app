import classNames from "classnames";
import ArticleTitleCard from "./article-title-card";
import ReadingTimeArticleCard from "./reading-time-article-card";
import ImageArticleCard from "./image-article-card";
import PropTypes from "prop-types";
import { Flex } from "antd";
import InformationButtonsArticleCard from "./information-buttons-article-card";
import AvatarUserArticleCard from "./avatar-user-article-card";
import withAuthBlur from "../../hoc/with-auth-blur";

const ArticleCard = ({
  isLastItem,
  title,
  readingTime,
  mainImage,
  articleViewers,
  articleLike,
  articleComment,
  isLoading,
  ownerProfile,
  ownerName,
  dateEpoch,
  goToDetailArticle,
}) => {
  return (
    <div
      className={classNames(" py-5  border-2 border-t-0 border-x-0 border-[#b8e986] ", {
        "border-b-0": isLastItem,
      })}
    >
      <AvatarUserArticleCard avatarURL={ownerProfile} name={ownerName} dateEpoch={dateEpoch} isLoading={isLoading} />
      <div className="w-full flex justify-between gap-x-3 ">
        <div className="w-[70%]  flex flex-col justify-between">
          <Flex vertical className="h-full" onClick={goToDetailArticle}>
            <ArticleTitleCard articleTitle={title} isLoading={isLoading} />
            <ReadingTimeArticleCard content={readingTime} isLoading={isLoading} />
          </Flex>
          <InformationButtonsArticleCard
            like={articleLike}
            comment={articleComment}
            view={articleViewers}
            isLoading={isLoading}
          />
        </div>
        <ImageArticleCard mainImage={mainImage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ArticleCard;
export const ArticleCardWithAuthBlur = withAuthBlur(ArticleCard);

ArticleCard.propTypes = {
  isLoading: PropTypes.bool,
  isLastItem: PropTypes.bool,
  title: PropTypes.string,
  readingTime: PropTypes.string,
  mainImage: PropTypes.string,
  articleViewers: PropTypes.number,
  articleLike: PropTypes.number,
  articleComment: PropTypes.number,
  ownerProfile: PropTypes.string,
  ownerName: PropTypes.string,
  dateEpoch: PropTypes.number,
  goToDetailArticle: PropTypes.func,
};
