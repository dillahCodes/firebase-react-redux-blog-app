import { useSelector } from "react-redux";
import PreviewArticleContent from "../../layouts/review-preview-article-layout/preview-content";

import PreviewArticleTitle from "../../layouts/review-preview-article-layout/preview-title";
import PreviewArticleProfile from "../../layouts/review-preview-article-layout/preview-profile";
import useUser from "../../../features/auth/hooks/use-user";
import PreviewArticleMainImage from "../../layouts/review-preview-article-layout/preview-main-image";
import PreviewArticleOptionsButtons from "../../layouts/review-preview-article-layout/preview-options";
import PreviewArticleTopic from "../../layouts/review-preview-article-layout/preview-topic";

const PreviewArticle = () => {
  const { user } = useUser();
  const photoURL = user?.photoURL;
  const displayName = user?.displayName;
  const content = useSelector((state) => state.postData.article_content);
  const title = useSelector((state) => state.postData.article_title);
  const mainImage = useSelector((state) => state.postData.main_image_content_url);
  const articletopic = useSelector((state) => state.postData.article_tags);

  return (
    <>
      <PreviewArticleTitle title={title} />
      <PreviewArticleProfile photoURL={photoURL} displayName={displayName} />
      <PreviewArticleMainImage mainImage={mainImage} />
      <PreviewArticleContent content={content} />
      <PreviewArticleTopic articletopic={articletopic} />
      <PreviewArticleOptionsButtons />
    </>
  );
};

export default PreviewArticle;
