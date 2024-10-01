import { useHomePageContext } from "./context/home-page-context";
import ArticleTopicSlider from "../../layouts/slider/article-topics-slider";
import { useEffect, useState } from "react";
import useGetTopics from "../../../features/get-topics/hooks/use-get-topics";
import { Layout, Spin } from "antd";

const HomePageSliderCategories = () => {
  const { dispatch } = useHomePageContext();
  const { isLoading, topics } = useGetTopics({ fetchLimit: 10 });
  const [articleTopics, setArticleTopics] = useState(["untukmu"]);

  useEffect(() => {
    if (topics.length > 0) {
      const validTopics = topics.map((topic) => topic.topic_name);
      setArticleTopics((prev) => [...new Set([...prev, ...validTopics])]);
    }
  }, [topics]);

  const handleSelectTopic = (index, topic) => dispatch({ type: "SET_SLIDER_CATEGORY_SELECTED", payload: topic });

  if (isLoading)
    return (
      <Layout className="mt-14">
        <Spin />
      </Layout>
    );

  return <ArticleTopicSlider topics={articleTopics} onSelect={handleSelectTopic} />;
};

export default HomePageSliderCategories;
