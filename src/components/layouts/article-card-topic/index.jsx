import { Flex, Layout, Typography } from "antd";
import AvatarProfile from "../../ui/avatar-profile";
import formatEpochToIndonesianDate from "../../../utils/convert-time";
import { PiHandsClappingFill } from "react-icons/pi";
import { FaRegCommentDots } from "react-icons/fa";
import { RiMoreFill } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";
import withComingSoonMessage from "../../hoc/with-coming-soon-message";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const { Text, Title } = Typography;
const TextWithComingSoonMessage = withComingSoonMessage(Text);
const AvatarProfileWithComingSoonMessage = withComingSoonMessage(AvatarProfile);

const ArticleCardTopic = ({
  articleImage,
  ownerPhotoUrl,
  ownerUserName,
  likeCount,
  commentCount,
  timeStamp,
  articleTitle,
  articleDocId,
  articleDataLength,
}) => {
  const navigate = useNavigate();
  const tranlatedTimeStamp = formatEpochToIndonesianDate(timeStamp);

  const handleGotoArticle = () => navigate(`/detail-artikel/${articleDocId}`);

  return (
    <Layout
      className={classNames(" w-full sm:flex-[1_30%] md:flex-[1_25%] lg:flex-[1_16%]   overflow-hidden cursor-pointer", {
        "max-w-md w-full": articleDataLength === 1,
      })}
    >
      {/* image */}
      <div className="w-full h-[300px]" onClick={handleGotoArticle}>
        <img src={articleImage} alt={`image ${articleTitle}`} className="object-cover w-full h-full" />
      </div>

      {/* content */}
      <div className="p-2">
        {/* avatar and userName */}
        <Flex gap="small" align="center" className="my-3">
          <AvatarProfileWithComingSoonMessage photoURL={ownerPhotoUrl} size={30} userName={ownerUserName} />
          <TextWithComingSoonMessage className="text-xs font-roboto-slab hover:underline">
            {ownerUserName}
          </TextWithComingSoonMessage>
        </Flex>

        {/* title */}
        <Title level={4} className="font-roboto-slab line-clamp-2 mb-5" onClick={handleGotoArticle}>
          {articleTitle}
        </Title>

        {/* footer */}
        <Flex gap="small" align="center" justify="space-between">
          <Flex gap="small" onClick={handleGotoArticle}>
            <Text className="text-xs font-roboto-slab">{tranlatedTimeStamp}</Text>

            <Flex gap="small">
              <IconArticleCardTopic icon={<PiHandsClappingFill />} />
              <Text className="text-xs font-roboto-slab">{likeCount}</Text>
            </Flex>

            <Flex gap="small">
              <IconArticleCardTopic icon={<FaRegCommentDots />} />
              <Text className="text-xs font-roboto-slab">{commentCount}</Text>
            </Flex>
          </Flex>

          <Flex gap="small">
            <IconArticleCardTopicWithComingSoonMessage icon={<CiBookmark />} />
            <IconArticleCardTopicWithComingSoonMessage icon={<RiMoreFill />} />
          </Flex>
        </Flex>
      </div>
    </Layout>
  );
};

export default ArticleCardTopic;

ArticleCardTopic.propTypes = {
  articleImage: PropTypes.string.isRequired,
  ownerPhotoUrl: PropTypes.string.isRequired,
  ownerUserName: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  timeStamp: PropTypes.number.isRequired,
  articleTitle: PropTypes.string.isRequired,
  articleDocId: PropTypes.string.isRequired,
  articleDataLength: PropTypes.number,
};

const IconArticleCardTopic = ({ icon, ...props }) => {
  return (
    <Text className="text-sm  font-roboto-slab cursor-pointer" {...props}>
      {icon}
    </Text>
  );
};

IconArticleCardTopic.propTypes = {
  icon: PropTypes.node.isRequired,
};

const IconArticleCardTopicWithComingSoonMessage = withComingSoonMessage(IconArticleCardTopic);
