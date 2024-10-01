import { Flex, Layout, Skeleton, Typography } from "antd";
import ButtonComponent, { ButtonComponentWithAuthModal } from "../../ui/button-component";
import useUser from "../../../features/auth/hooks/use-user";
import { useNavigate, useParams } from "react-router-dom";
import useGetTopicByName from "../../../features/get-topics/hooks/use-get-topic-byname";
import { useEffect } from "react";
import useTrackTopicArticleFollower from "../../../features/track-topic-follower/hooks/use-track-topic-article-follower";

const { Text } = Typography;
const TitleTopicPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { topik } = useParams();
  const { topicData, isLoading, isError } = useGetTopicByName({ topicName: topik });
  const { isUserHasFollowed, handleFolowOrUnfollow } = useTrackTopicArticleFollower({ topic_article_doc_id: topicData?.doc_id });

  //   navigate to previous page if error
  useEffect(() => {
    isError && navigate(-1);
  }, [isError, navigate]);

  if (isLoading) return <LoadingComponent />;

  return (
    <Layout className=" max-w-lg mx-auto  my-5 mb-12 ">
      <Flex vertical gap="small">
        {/* title topic */}
        <Text className="text-xl sm:text-2xl text-center font-bold font-special-elite line-clamp-2">{topicData?.topic_name}</Text>

        {/* count info */}
        <Flex gap="small" className="mx-auto font-roboto-slab capitalize">
          <Text>topik</Text>
          <Text>·</Text>
          <Text>{topicData?.topic_follower} pengikut</Text>
          <Text>·</Text>
          <Text>{topicData?.topic_count} Artikel</Text>
        </Flex>

        {/* follow button */}
        {user ? (
          <ButtonComponent
            className="w-fit px-7 mx-auto font-roboto-slab capitalize"
            type="primary"
            onClick={handleFolowOrUnfollow}
          >
            {isUserHasFollowed ? "batal mengikuti" : "ikuti"}
          </ButtonComponent>
        ) : (
          <ButtonComponentWithAuthModal className="w-fit px-7 mx-auto font-roboto-slab capitalize" type="primary">
            ikuti
          </ButtonComponentWithAuthModal>
        )}
      </Flex>
    </Layout>
  );
};

export default TitleTopicPage;

const LoadingComponent = () => {
  return (
    <Flex vertical className="max-w-lg mx-auto my-5" gap="small">
      <Skeleton.Input className="h-7 max-w-[300px] w-full mx-auto" active />

      <Flex gap="small" className="mx-auto">
        <Skeleton.Button className="h-3" active />
        <Skeleton.Button className="h-3" active />
      </Flex>

      <Skeleton.Button className="h-7 mx-auto" active />
    </Flex>
  );
};
