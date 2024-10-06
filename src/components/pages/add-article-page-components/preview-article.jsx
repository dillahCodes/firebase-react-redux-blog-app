import { useSelector } from "react-redux";
import PreviewArticleContent from "../../layouts/review-preview-article-layout/preview-content";

import PreviewArticleTitle from "../../layouts/review-preview-article-layout/preview-title";
import PreviewArticleProfile from "../../layouts/review-preview-article-layout/preview-profile";
import useUser from "../../../features/auth/hooks/use-user";
import PreviewArticleMainImage from "../../layouts/review-preview-article-layout/preview-main-image";
import PreviewArticleOptionsButtons from "../../layouts/review-preview-article-layout/preview-options";
import PreviewArticleTopic from "../../layouts/review-preview-article-layout/preview-topic";
import useSetPostArticleContent from "../../../features/post/hooks/use-set-post-article-content";
import useSetPostMainImage from "../../../features/post/hooks/use-set-post-main-image";
import useSetPostTitle from "../../../features/post/hooks/use-set-post-title";

const PreviewArticle = () => {
  const { user } = useUser();
  const { article_content } = useSetPostArticleContent();
  const { main_image_content_url } = useSetPostMainImage();
  const { article_title } = useSetPostTitle();
  const photoURL = user?.photoURL;
  const displayName = user?.displayName;
  const articletopic = useSelector((state) => state.postData.article_tags);

  return (
    <>
      <PreviewArticleTitle title={article_title} />
      <PreviewArticleProfile photoURL={photoURL} displayName={displayName} />
      <PreviewArticleMainImage mainImage={main_image_content_url} />
      <PreviewArticleContent content={article_content} />
      <PreviewArticleTopic articletopic={articletopic} />
      <PreviewArticleOptionsButtons />
    </>
  );
};

export default PreviewArticle;
