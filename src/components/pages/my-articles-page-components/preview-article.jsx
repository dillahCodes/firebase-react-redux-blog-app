import { Layout } from "antd";
import PreviewArticleContent from "../../layouts/review-preview-article-layout/preview-content";
import PreviewArticleMainImage from "../../layouts/review-preview-article-layout/preview-main-image";
import PreviewArticleOptionsButtons from "../../layouts/review-preview-article-layout/preview-options";
import PreviewArticleProfile from "../../layouts/review-preview-article-layout/preview-profile";
import PreviewArticleTitle from "../../layouts/review-preview-article-layout/preview-title";
import PreviewArticleTopic from "../../layouts/review-preview-article-layout/preview-topic";
import { useMyArticlesPage } from "./context/my-articles-page-context";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-services";
import { v4 as uuidv4 } from "uuid";

const PreviewArticle = () => {
  const [params] = useSearchParams();
  const { state, dispatch } = useMyArticlesPage();
  const { previewArticleData } = state;

  const title = previewArticleData?.title;
  const content = previewArticleData?.content;
  const photoUrl = previewArticleData?.photoUrl;
  const displayName = previewArticleData?.author_name;
  const mainImage = previewArticleData?.mainImage;
  const articleTopic = previewArticleData?.topicNames.map((topic) => ({
    topic_name: topic,
    topic_id: uuidv4(),
  }));

  const handleGetPreviewArticle = useCallback(async () => {
    try {
      const articleId = params.get("articleId");
      const articleRef = doc(db, "articles", articleId);
      const articleSnapshot = (await getDoc(articleRef)).data();

      const userRoleRef = collection(db, "users-role");
      const queryUserRole = query(userRoleRef, where("user_id", "==", articleSnapshot.author_uid), limit(1));
      const querySnapshot = await getDocs(queryUserRole);
      const docRole = querySnapshot.docs[0].data();

      const parseData = JSON.parse(JSON.stringify(articleSnapshot));
      const parseDataRole = JSON.parse(JSON.stringify(docRole));
      const articleData = { ...parseData, ...parseDataRole };

      dispatch({ type: "SET_PREVIEW_ARTICLE_DATA", payload: articleData });
    } catch (error) {
      console.error("Error while get Preview article: ", error);
    }
  }, [params, dispatch]);

  useEffect(() => {
    handleGetPreviewArticle();
  }, [handleGetPreviewArticle]);

  return (
    <Layout>
      <PreviewArticleTitle title={title} />
      <PreviewArticleProfile photoURL={photoUrl} displayName={displayName} />
      <PreviewArticleMainImage mainImage={mainImage} />
      <PreviewArticleContent content={content} />
      <PreviewArticleTopic articletopic={articleTopic} />
      <PreviewArticleOptionsButtons />
    </Layout>
  );
};

export default PreviewArticle;
