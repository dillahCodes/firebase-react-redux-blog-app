import { Layout } from "antd";
import { useParams } from "react-router-dom";
import PreviewArticleTitle from "../../layouts/review-preview-article-layout/preview-title";
import PreviewArticleProfile from "../../layouts/review-preview-article-layout/preview-profile";
import PreviewArticleMainImage from "../../layouts/review-preview-article-layout/preview-main-image";
import PreviewArticleContent from "../../layouts/review-preview-article-layout/preview-content";
import PreviewArticleTopic from "../../layouts/review-preview-article-layout/preview-topic";
import PreviewArticleOptionsButtons from "../../layouts/review-preview-article-layout/preview-options";
import MainLayout from "../../layouts/main-layout";
import useGetArticleByDocId from "../../../features/get-article/hooks/use-get-article-by-doc-id";
import LoadingScreen from "../../ui/loading-screen";
import { v4 as uuidv4 } from "uuid";
import useTrackArticleViews from "../../../features/track-article-views/hooks/use-track-article-views";
import useTrackArticleLikes from "../../../features/track-article-likes/hooks/use-track-article-likes";
import useUser from "../../../features/auth/hooks/use-user";

const DetailArticlePageComponents = () => {
  const { user } = useUser();
  const { id } = useParams();

  useTrackArticleViews({ article_doc_id: id });
  const { isArticleLiked, handleLikeArticle } = useTrackArticleLikes({ article_doc_id: id });
  const { articleData, isLoading } = useGetArticleByDocId({ articleDocId: id });

  const { title, articleOwnerPhotoURL, author_name, content, mainImage, topicNames, article_like, article_comment } = articleData;
  const epochTime = articleData?.updatedAt?.seconds;
  const topicNamesMap = topicNames?.map((topic) => ({
    topic_name: topic,
    topic_id: uuidv4(),
  }));

  if (isLoading) return <LoadingScreen />;

  return (
    <MainLayout>
      <Layout className="w-full max-w-screen-md mx-auto  p-3">
        <PreviewArticleTitle title={title} />
        <PreviewArticleProfile
          likeHandler={handleLikeArticle}
          isThisArticleLiked={isArticleLiked}
          likeCount={article_like}
          commentCount={article_comment}
          photoURL={articleOwnerPhotoURL}
          content={content}
          epochTime={epochTime}
          displayName={author_name}
          isUserLoggedIn={user ? true : false}
          isPreview={false}
        />
        <PreviewArticleMainImage mainImage={mainImage} />
        <PreviewArticleContent content={content} />
        <PreviewArticleTopic articletopic={topicNamesMap} />
        <PreviewArticleOptionsButtons
          isThisArticleLiked={isArticleLiked}
          likeCount={article_like}
          commentCount={article_comment}
          likeHandler={handleLikeArticle}
          isPreview={false}
          isUserLoggedIn={user ? true : false}
        />
      </Layout>
    </MainLayout>
  );
};

export default DetailArticlePageComponents;
