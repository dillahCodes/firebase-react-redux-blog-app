import { useEffect, useState } from "react";
import useGetTopics from "../../../features/get-topics/hooks/use-get-topics";
import ArticleTopicSlider from "../../layouts/slider/article-topics-slider";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Spin } from "antd";

const SliderTopicPage = () => {
  const navigate = useNavigate();
  const { topik } = useParams();
  const { isLoading, topics } = useGetTopics({ fetchLimit: 20 });
  const [validTopics, setValidTopics] = useState([topik]);

  useEffect(() => {
    if (topics.length > 0) {
      const validTopics = topics.map((topic) => topic.topic_name);
      setValidTopics((prev) => [...new Set([...prev, ...validTopics])]);
    }
  }, [topics]);

  const handleSelectTopic = (index, topic) => navigate(`/topik-artikel/${topic}`);

  if (isLoading)
    return (
      <Layout className="mt-3">
        <Spin />
      </Layout>
    );

  return (
    <div className="w-full sticky z-[2] top-0">
      <ArticleTopicSlider topics={validTopics} onSelect={handleSelectTopic} defaultSeelectedIndex={validTopics.indexOf(topik)} />
    </div>
  );
};

export default SliderTopicPage;
